/* Menu và chi tiết món: F1 hiển thị menu (SELECT), F2 xem chi tiết món (SELECT) */

function productCard(p) {
  const url = 'product.html?id=' + p.id;
  return `
    <article class="card">
      <a class="card-img" href="${url}" aria-label="Xem ${esc(p.name)}">
        <img src="${esc(p.image_url)}" alt="${esc(p.name)}" loading="lazy" onerror="${IMG_FALLBACK}">
      </a>
      <div class="card-body">
        <span class="tag">${esc(CATEGORIES[p.category] || p.category)}</span>
        <h3><a href="${url}">${esc(p.name)}</a></h3>
        <p>${esc(p.description)}</p>
        <div class="card-foot">
          <span class="price">${fmt(p.price)}</span>
          <button type="button" class="btn btn-primary btn-sm" data-add="${p.id}" data-name="${esc(p.name)}">Thêm vào giỏ</button>
        </div>
      </div>
    </article>`;
}

function showError(el, msg) { el.className = 'state error'; el.textContent = msg; }

/* ---------- Trang chủ ---------- */
async function initHome() {
  const featured = $('#featured'), grid = $('#menu-grid'), filters = $('#filters');
  if (!featured || !grid) return;
  if (!sb) { showError(featured, 'Không kết nối được máy chủ.'); showError(grid, 'Không kết nối được máy chủ.'); return; }
  const { data, error } = await sb.from('products').select('*').order('id');
  if (error || !data) {
    console.error(error);
    showError(featured, 'Không tải được menu. Kiểm tra mạng và tải lại trang.');
    showError(grid, 'Không tải được menu. Kiểm tra mạng và tải lại trang.');
    return;
  }
  featured.className = 'grid grid-3';
  featured.innerHTML = data.filter((p) => p.is_featured).map(productCard).join('');

  const cats = ['all', ...Object.keys(CATEGORIES).filter((c) => data.some((p) => p.category === c))];
  let current = 'all';
  const draw = () => {
    const list = current === 'all' ? data : data.filter((p) => p.category === current);
    grid.className = 'grid grid-4';
    grid.innerHTML = list.length ? list.map(productCard).join('') : '<p class="state">Chưa có món nào trong nhóm này.</p>';
    filters.innerHTML = cats.map((c) =>
      `<button type="button" class="pill" data-cat="${c}" aria-pressed="${c === current}">${c === 'all' ? 'Tất cả' : CATEGORIES[c]}</button>`).join('');
  };
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    current = b.dataset.cat;
    draw();
    $(`[data-cat="${current}"]`, filters)?.focus();
  });
  draw();
}

/* ---------- Trang chi tiết ---------- */
async function initProduct() {
  const root = $('#product-root');
  if (!root) return;
  const id = Number(new URLSearchParams(location.search).get('id'));
  const notFound = () => {
    root.className = 'empty';
    root.innerHTML = '<h2>Không tìm thấy món này</h2><p class="muted">Món có thể đã ngừng phục vụ.</p><a class="btn btn-primary" href="index.html#menu">Xem menu</a>';
  };
  if (!id) return notFound();
  if (!sb) return showError(root, 'Không kết nối được máy chủ.');
  const { data: p, error } = await sb.from('products').select('*').eq('id', id).maybeSingle();
  if (error) { console.error(error); return showError(root, 'Không tải được món. Kiểm tra mạng và tải lại trang.'); }
  if (!p) return notFound();

  document.title = p.name + ' – Q-Coffee';
  $('#crumb-name').textContent = p.name;
  root.className = 'detail';
  root.innerHTML = `
    <div class="detail-img"><img src="${esc(p.image_url)}" alt="${esc(p.name)}" onerror="${IMG_FALLBACK}"></div>
    <div>
      <p class="eyebrow">${esc(CATEGORIES[p.category] || p.category)}</p>
      <h1>${esc(p.name)}</h1>
      <p class="price price-lg">${fmt(p.price)}</p>
      <p>${esc(p.description)}</p>
      <div class="qty-row">
        <label for="qty">Số lượng</label>
        <div class="stepper">
          <button type="button" id="qminus" aria-label="Giảm số lượng">−</button>
          <input id="qty" type="number" min="1" max="99" value="1" inputmode="numeric">
          <button type="button" id="qplus" aria-label="Tăng số lượng">+</button>
        </div>
      </div>
      <div class="actions">
        <button type="button" class="btn btn-primary" data-add="${p.id}" data-name="${esc(p.name)}" data-use-qty>Thêm vào giỏ</button>
        <a class="btn btn-outline" href="cart.html">Xem giỏ hàng</a>
      </div>
    </div>`;
  const qty = $('#qty');
  const clamp = () => { qty.value = Math.max(1, Math.min(99, parseInt(qty.value, 10) || 1)); };
  $('#qminus').addEventListener('click', () => { qty.value = (parseInt(qty.value, 10) || 1) - 1; clamp(); });
  $('#qplus').addEventListener('click', () => { qty.value = (parseInt(qty.value, 10) || 1) + 1; clamp(); });
  qty.addEventListener('change', clamp);

  const { data: rel } = await sb.from('products').select('*').eq('category', p.category).neq('id', p.id).limit(4);
  let list = rel || [];
  if (list.length < 3) {
    const { data: more } = await sb.from('products').select('*').neq('id', p.id).limit(8);
    list = [...list, ...(more || []).filter((m) => !list.some((x) => x.id === m.id))].slice(0, 4);
  }
  if (list.length) {
    $('#related').innerHTML = list.map(productCard).join('');
    $('#related-wrap').hidden = false;
  }
}

document.addEventListener('DOMContentLoaded', () => { initHome(); initProduct(); });
