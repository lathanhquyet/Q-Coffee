/* F6 – Đặt bàn (INSERT vào bảng bookings) */
(function () {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const localToday = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  form.booking_date.min = localToday();

  const fields = ['full_name', 'phone', 'booking_date', 'booking_time', 'guests', 'note'];
  function setError(name, msg) {
    const wrap = form[name].closest('.field');
    wrap.classList.toggle('invalid', !!msg);
    document.getElementById('err-' + name).textContent = msg || '';
    form[name].setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function validate() {
    const v = Object.fromEntries(fields.map((f) => [f, form[f].value.trim()]));
    const err = {};
    if (v.full_name.length < 2 || v.full_name.length > 100) err.full_name = 'Nhập họ tên từ 2 đến 100 ký tự';
    if (!/^[0-9]{10}$/.test(v.phone)) err.phone = 'Số điện thoại cần đúng 10 chữ số';
    if (!v.booking_date) err.booking_date = 'Chọn ngày đặt bàn';
    else if (v.booking_date < localToday()) err.booking_date = 'Ngày đặt bàn không được ở quá khứ';
    if (!v.booking_time) err.booking_time = 'Chọn giờ đặt bàn';
    else if (v.booking_time < '07:00' || v.booking_time > '21:00') err.booking_time = 'Giờ đặt bàn từ 07:00 đến 21:00';
    const g = Number(v.guests);
    if (!Number.isInteger(g) || g < 1 || g > 12) err.guests = 'Số người từ 1 đến 12';
    if (v.note.length > 500) err.note = 'Ghi chú tối đa 500 ký tự';
    fields.forEach((f) => setError(f, err[f]));
    const first = fields.find((f) => err[f]);
    if (first) { form[first].focus(); return null; }
    return { full_name: v.full_name, phone: v.phone, booking_date: v.booking_date, booking_time: v.booking_time, guests: g, note: v.note };
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const row = validate();
    if (!row) return;
    if (!sb) { toast('Không kết nối được máy chủ. Hãy tải lại trang.', 'error'); return; }
    const btn = document.getElementById('booking-submit');
    btn.disabled = true; btn.textContent = 'Đang gửi…';
    try {
      /* Chỉ INSERT, không .select() vì bảng bookings không cho khách đọc lại */
      const { error } = await sb.from('bookings').insert(row);
      if (error) throw error;
      const d = row.booking_date.split('-').reverse().join('/');
      document.getElementById('booking-card').innerHTML = `
        <div class="success-box" role="status">
          <div class="check" aria-hidden="true">✓</div>
          <h2>Đặt bàn thành công</h2>
          <p class="muted">Q-Coffee đã nhận yêu cầu của bạn và hẹn gặp bạn tại quán.</p>
          <ul class="summary-list">
            <li><span>Họ tên</span><strong>${esc(row.full_name)}</strong></li>
            <li><span>Điện thoại</span><strong>${esc(row.phone)}</strong></li>
            <li><span>Ngày</span><strong>${d}</strong></li>
            <li><span>Giờ</span><strong>${esc(row.booking_time)}</strong></li>
            <li><span>Số người</span><strong>${row.guests}</strong></li>
          </ul>
          <a class="btn btn-primary" href="booking.html">Đặt thêm bàn khác</a>
        </div>`;
      document.getElementById('booking-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      console.error(err);
      toast('Chưa gửi được yêu cầu đặt bàn. Kiểm tra mạng rồi thử lại.', 'error');
      btn.disabled = false; btn.textContent = 'Đặt bàn';
    }
  });
})();
