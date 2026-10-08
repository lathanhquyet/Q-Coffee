/* Kết nối Supabase và các hàm dùng chung cho mọi trang.
   Lưu ý: khóa "anon" được thiết kế để nằm trong mã nguồn công khai;
   quyền truy cập thật sự được kiểm soát bằng RLS (xem supabase/schema.sql).
   TUYỆT ĐỐI không đưa khóa "service_role" vào đây. */
const SUPABASE_URL = 'https://wcddiwvpmkztwewdmszb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZGRpd3ZwbWt6dHdld2Rtc3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0NDM2NDEsImV4cCI6MjEwNzAxOTY0MX0.7BpozvyalHZrwP8LEsoEuiGEshNgVLxvAWMx1_ZNONY';

const sb = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const CATEGORIES = { 'ca-phe': 'Cà phê', 'tra': 'Trà', 'da-xay': 'Đá xay', 'banh': 'Bánh' };
const IMG_FALLBACK = "this.onerror=null;this.src='logo-icon.svg'";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function fmt(n) { return new Intl.NumberFormat('vi-VN').format(n) + 'đ'; }

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* Mã phiên ngẫu nhiên thay cho đăng nhập: mỗi trình duyệt có một giỏ hàng riêng */
function sessionId() {
  let id = null;
  try { id = localStorage.getItem('qc_session'); } catch (e) { /* bỏ qua */ }
  if (!id) {
    id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 's' + Date.now() + Math.random().toString(36).slice(2, 10);
    try { localStorage.setItem('qc_session', id); } catch (e) { /* bỏ qua */ }
  }
  return id;
}

let toastTimer;
function toast(msg, type = 'ok') {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.className = 'toast show' + (type === 'error' ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = 'toast' + (type === 'error' ? ' error' : ''); }, 3000);
}

/* F7: số lượng món trên biểu tượng giỏ hàng */
async function updateCartCount(bump = false) {
  const badge = $('#cart-count');
  if (!badge || !sb) return;
  try {
    const { data, error } = await sb.from('cart_items').select('quantity').eq('session_id', sessionId());
    if (error) throw error;
    const total = (data || []).reduce((s, r) => s + r.quantity, 0);
    badge.textContent = total;
    badge.hidden = total === 0;
    if (bump) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
  } catch (e) {
    badge.hidden = true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = $('#nav-toggle'), links = $('#nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  updateCartCount();
});
