/* Giỏ hàng: F3 thêm (INSERT / UPDATE), F4 đổi số lượng (UPDATE), F5 xóa (DELETE), F7 số lượng trên biểu tượng giỏ */

/* F3 – Thêm món: chưa có thì INSERT dòng mới, đã có thì UPDATE tăng số lượng */
async function addToCart(productId, qty = 1) {
  const sid = sessionId();
  const { data: existing, error: e1 } = await sb.from('cart_items')
    .select('id, quantity').eq('session_id', sid).eq('product_id', productId).maybeSingle();
  if (e1) throw e1;
  if (existing) {
    const { error } = await sb.from('cart_items')
      .update({ quantity: Math.min(99, existing.quantity + qty) }).eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await sb.from('cart_items')
      .insert({ session_id: sid, product_id: productId, quantity: qty });
    if (error) throw error;
  }
  await updateCartCount(true);
}

/* Nút "Thêm vào giỏ" ở mọi trang (thẻ món, trang chi tiết) */
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-add]');
  if (!btn) return;
  if (!sb) { toast('Không kết nối được máy chủ. Hãy tải lại trang.', 'error'); return; }
  const id = Number(btn.dataset.add);
  let qty = 1;
  if (btn.hasAttribute('data-use-qty')) {
    qty = Math.max(1, Math.min(99, parseInt($('#qty')?.value, 10) || 1));
  }
  const label = btn.textContent;
  btn.disabled = true; btn.textContent = 'Đang thêm…';
  try {
    await addToCart(id, qty);
    toast('Đã thêm ' + (btn.dataset.name || 'món') + ' vào giỏ');
  } catch (err) {
    console.error(err);
    toast('Chưa thêm được món. Kiểm tra mạng rồi thử lại.', 'error');
  } finally {
    btn.disabled = false; btn.textContent = label;
  }
});

/* ---------- Trang giỏ hàng (cart.html) ---------- */
const cartRoot = document.getElementById('cart-root');

async function loadCart() {
  if (!sb) { cartRoot.className = 'state error'; cartRoot.textContent = 'Không kết nối được máy chủ. Hãy tải lại trang.'; return; }
  const { data, error } = await sb.from('cart_items')
    .select('id, quantity, product:products(id, name, price, image_url)')
    .eq('session_id', sessionId()).order('created_at');
  if (error) {
    console.error(error);
    cartRoot.className = 'state error';
    cartRoot.textContent = 'Không tải được giỏ hàng. Kiểm tra mạng và tải lại trang.';
    return;
  }
  const rows = (data || []).filter((r) => r.product);
  if (!rows.length) {
    cartRoot.className = '';
    cartRoot.innerHTML = '<div class="empty"><h2>Giỏ hàng đang trống</h2><p class="muted">Chọn vài món ngon từ menu nhé.</p><a class="btn btn-primary" href="index.html#menu">Xem menu</a></div>';
    updateCartCount();
    return;
  }
  const count = rows.reduce((s, r) => s + r.quantity, 0);
  const total = rows.reduce((s, r) => s + r.quantity * r.product.price, 0);
  const items = rows.map((r) => `
    <article class="cart-item">
      <a href="product.html?id=${r.product.id}"><img src="${esc(r.product.image_url)}" alt="${esc(r.product.name)}" onerror="${IMG_FALLBACK}"></a>
      <div>
        <a class="ci-name" href="product.html?id=${r.product.id}">${esc(r.product.name)}</a>
        <span class="muted">${fmt(r.product.price)}</span>
      </div>
      <div class="stepper" role="group" aria-label="Số lượng ${esc(r.product.name)}">
        <button type="button" data-act="dec" data-id="${r.id}" data-qty="${r.quantity}" aria-label="Giảm số lượng" ${r.quantity <= 1 ? 'disabled' : ''}>−</button>
        <span class="qty-num" aria-live="polite">${r.quantity}</span>
        <button type="button" data-act="inc" data-id="${r.id}" data-qty="${r.quantity}" aria-label="Tăng số lượng" ${r.quantity >= 99 ? 'disabled' : ''}>+</button>
      </div>
      <strong class="ci-total">${fmt(r.quantity * r.product.price)}</strong>
      <button type="button" class="btn-link danger" data-act="del" data-id="${r.id}" data-name="${esc(r.product.name)}">Xóa</button>
    </article>`).join('');
  cartRoot.className = '';
  cartRoot.innerHTML = `
    <div class="cart-layout">
      <div>${items}</div>
      <aside class="summary" aria-label="Tóm tắt đơn">
        <h2>Tóm tắt</h2>
        <p class="row"><span>Số món</span><strong>${count}</strong></p>
        <p class="row total"><span>Tổng tiền</span><strong>${fmt(total)}</strong></p>
        <a class="btn btn-primary btn-block" href="booking.html">Đặt bàn</a>
        <a class="btn btn-outline btn-block" href="index.html#menu">Tiếp tục xem menu</a>
        <p class="small muted">Đây là bản demo nên chưa có thanh toán online. Bạn thanh toán tại quán.</p>
      </aside>
    </div>`;
  updateCartCount();
}

if (cartRoot) {
  /* F4 đổi số lượng (UPDATE) và F5 xóa món (DELETE) */
  cartRoot.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-act]');
    if (!b || b.disabled) return;
    b.disabled = true;
    const id = Number(b.dataset.id), sid = sessionId();
    try {
      if (b.dataset.act === 'del') {
        const { error } = await sb.from('cart_items').delete().eq('id', id).eq('session_id', sid);
        if (error) throw error;
        toast('Đã xóa ' + (b.dataset.name || 'món') + ' khỏi giỏ');
      } else {
        const cur = Number(b.dataset.qty);
        const next = b.dataset.act === 'inc' ? Math.min(99, cur + 1) : Math.max(1, cur - 1);
        const { error } = await sb.from('cart_items').update({ quantity: next }).eq('id', id).eq('session_id', sid);
        if (error) throw error;
      }
      await loadCart();
    } catch (err) {
      console.error(err);
      toast('Chưa cập nhật được giỏ hàng. Thử lại nhé.', 'error');
      b.disabled = false;
    }
  });
  loadCart();
}
