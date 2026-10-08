# DESIGN – Website Q-Coffee

> **DESIGN.md** quy định giao diện: màu, font, thành phần, bố cục. Khi nhờ AI viết code, đưa kèm file này để mọi trang có cùng một phong cách. File `PRD.md` nói về chức năng và dữ liệu.

## 1. Ý tưởng thiết kế

Q-Coffee là quán cà phê cho người làm sáng tạo, nên giao diện cần **gọn, ấm, dễ đọc** như một góc làm việc tốt: nền sáng, chữ rõ, ảnh món là nhân vật chính. Điểm nhấn duy nhất là **màu hổ phách** (màu của tia sáng trong logo) dùng cho hành động quan trọng như nút "Thêm vào giỏ" và "Đặt bàn". Mọi thứ còn lại giữ yên tĩnh.

**Học từ trang Milano Coffee (chỉ về bố cục):**
- Thanh menu ngang, rõ ràng, logo bên trái.
- Mỗi khối nội dung lớn gồm một ảnh, một tiêu đề, một đoạn ngắn và một nút dẫn đi tiếp.
- Khối số liệu ngắn gọn để tạo uy tín.
- Lưới ảnh không gian quán.
- Chân trang có thông tin liên hệ và mạng xã hội.

**Không bắt chước:** logo, màu thương hiệu, câu chữ và ảnh của Milano.

## 2. Logo

| File | Dùng ở |
|---|---|
| `logo.svg` | Thanh menu (desktop), banner, chân trang, báo cáo |
| `logo-icon.svg` | Favicon, thanh menu (điện thoại), ảnh đại diện mạng xã hội |

Quy tắc:
- Chỉ dùng đúng hai file trên ở **mọi trang**. Không vẽ lại, không đổi màu.
- Chừa khoảng trống quanh logo ít nhất bằng chiều cao chữ Q.
- Chiều cao tối thiểu: 32 px cho `logo.svg`, 24 px cho `logo-icon.svg`.
- Chữ trong `logo.svg` dùng font Be Vietnam Pro; nếu máy không có font thì tự chuyển sang Segoe UI/Arial. Khi cần hình cố định (báo cáo, mạng xã hội), xuất ra PNG.
- Ý nghĩa: chữ Q là miệng tách cà phê nhìn từ trên xuống, đuôi Q là quai tách, tia sáng bốn cánh là ý tưởng.

## 3. Màu sắc

| Tên | Hex | Dùng cho |
|---|---|---|
| Espresso | `#2B1B14` | Chữ chính, thanh menu, chân trang |
| Hổ phách | `#E8A33D` | Nút hành động chính, điểm nhấn, giá món khi di chuột |
| Xanh lục thẫm | `#1F6F6B` | Liên kết, nút phụ, khẩu hiệu |
| Trắng ấm | `#FBF8F3` | Nền trang |
| Nâu cà phê | `#4A2C1B` | Nền khối đậm, viền nhấn |
| Xám ấm | `#6F625A` | Chữ phụ, mô tả |
| Đường kẻ | `#E6DED3` | Viền thẻ, đường phân cách |
| Lỗi | `#B3261E` | Thông báo lỗi |
| Thành công | `#2E7D4F` | Thông báo thành công |

Khai báo thành biến CSS ở `:root`:

```css
:root {
  --espresso: #2B1B14;
  --amber: #E8A33D;
  --teal: #1F6F6B;
  --paper: #FBF8F3;
  --roast: #4A2C1B;
  --muted: #6F625A;
  --line: #E6DED3;
  --error: #B3261E;
  --success: #2E7D4F;
}
```

Tương phản: chữ espresso trên nền trắng ấm đạt chuẩn đọc tốt; chữ trên nút hổ phách dùng màu **espresso** (không dùng chữ trắng vì khó đọc).

## 4. Chữ

Dùng một họ font duy nhất: **Be Vietnam Pro** (Google Fonts, hỗ trợ đầy đủ tiếng Việt).

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700;800&display=swap" rel="stylesheet">
```

Font dự phòng: `'Segoe UI', Arial, sans-serif`.

| Vai trò | Cỡ chữ | Độ đậm | Dòng cao |
|---|---|---|---|
| Tiêu đề trang (h1) | 44 px (điện thoại 32 px) | 800 | 1.15 |
| Tiêu đề khối (h2) | 30 px (điện thoại 24 px) | 700 | 1.25 |
| Tên món (h3) | 20 px | 700 | 1.3 |
| Nội dung | 17 px | 400 | 1.6 |
| Chữ phụ | 14 px | 400 | 1.5 |
| Nút | 16 px | 700 | 1 |

Quy tắc: viết **hoa chữ cái đầu câu** như thường, không viết hoa toàn bộ; mỗi dòng nội dung dài tối đa khoảng 70 ký tự.

## 5. Khoảng cách và hình khối

- Đơn vị cơ bản 8 px: 8 · 16 · 24 · 32 · 48 · 80.
- Chiều rộng nội dung tối đa 1120 px, căn giữa; lề hai bên 16 px trên điện thoại.
- Khoảng cách giữa các khối lớn: 80 px (điện thoại 48 px).
- Bo góc: thẻ món 16 px, nút 999 px (dạng viên thuốc), ô nhập 10 px.
- Bóng đổ chỉ dùng cho thẻ khi di chuột: `0 8px 24px rgba(43, 27, 20, .12)`.
- Căn lề: nội dung văn bản căn **trái**; chỉ căn giữa tiêu đề banner và thông báo.

## 6. Thành phần

### Thanh menu (mọi trang)
Nền trắng ấm, viền dưới 1 px màu đường kẻ, cố định ở đầu trang. Bên trái: `logo.svg`. Bên phải: Trang chủ · Menu · Về chúng tôi · Đặt bàn · Giỏ hàng (có số lượng trong vòng tròn hổ phách). Mục của trang hiện tại có gạch chân hổ phách. Trên điện thoại: dùng `logo-icon.svg` và nút ☰ mở danh sách menu.

### Nút
- **Chính:** nền hổ phách, chữ espresso. Ví dụ: Xem menu, Thêm vào giỏ, Đặt bàn.
- **Phụ:** viền xanh lục thẫm, chữ xanh lục thẫm, nền trong suốt.
- **Nguy hiểm nhẹ:** chữ lỗi, không nền (nút Xóa trong giỏ).
- Trạng thái: di chuột làm tối 8%; bấm có viền nổi 3 px hổ phách khi dùng bàn phím (`:focus-visible`); khi đang gửi dữ liệu thì khóa nút và đổi chữ ("Đang thêm…").

### Thẻ món
Ảnh vuông bo góc ở trên, tên món, mô tả một dòng, giá (định dạng `29.000đ`), nút Thêm vào giỏ. Cả thẻ bấm được để vào trang Chi tiết. Lưới 4 cột (máy tính), 2 cột (điện thoại).

### Bộ lọc nhóm món
Dãy nút nhỏ dạng viên thuốc: Tất cả · Cà phê · Trà · Đá xay · Bánh. Mục đang chọn nền espresso, chữ trắng ấm.

### Dòng sản phẩm trong giỏ
Ảnh nhỏ, tên, đơn giá, bộ chọn số lượng (− số +), thành tiền, nút Xóa. Cuối bảng: tổng tiền in đậm. Trên điện thoại mỗi món là một thẻ xếp dọc.

### Form đặt bàn
Mỗi ô có nhãn nằm **phía trên** ô nhập (không dùng chữ mờ thay nhãn). Các ô: Họ tên, Số điện thoại, Ngày, Giờ, Số người, Ghi chú. Lỗi hiện ngay dưới ô có lỗi, nói rõ cách sửa, ví dụ "Số điện thoại cần 10 chữ số". Gửi thành công thì thay form bằng thông báo xác nhận kèm tóm tắt lịch đã đặt.

### Thông báo
Dải nhỏ phía trên nội dung, nền nhạt của màu thành công hoặc lỗi. Câu chữ nêu rõ việc đã xảy ra: "Đã thêm Cà phê sữa đá vào giỏ".

### Trạng thái đặc biệt
- Đang tải: dòng chữ "Đang tải menu…".
- Giỏ trống: "Giỏ hàng đang trống" + nút **Xem menu**.
- Lỗi kết nối: "Không tải được menu. Kiểm tra mạng và tải lại trang."

## 7. Bố cục từng trang

### Trang Chủ
```
[ Thanh menu ]
[ Banner: ảnh quán bên phải | trái: logo lớn, "Khơi nguồn sáng tạo", nút Xem menu ]
[ Món nổi bật: 3 thẻ ]
[ Menu: bộ lọc + lưới thẻ món ]
[ Khối giới thiệu ngắn: ảnh | chữ | nút "Về chúng tôi" ]
[ Số liệu: năm thành lập · số món · số chỗ ngồi ]
[ Chân trang ]
```
Phần đầu trang (banner) là điểm nhấn của cả website: ảnh lớn, tiêu đề lớn, một nút duy nhất.

### Về Chúng Tôi
```
[ Thanh menu ]
[ Tiêu đề + câu chuyện thương hiệu (văn bản | ảnh) ]
[ Ba giá trị: Wifi mạnh · Ổ cắm mọi bàn · Góc yên tĩnh ]
[ Lưới ảnh không gian quán ]
[ Giờ mở cửa + địa chỉ | Google Map nhúng ]
[ Chân trang ]
```

### Chi tiết sản phẩm
```
[ Thanh menu ]
[ Đường dẫn: Trang chủ > Menu > Tên món ]
[ Ảnh lớn | tên, giá, mô tả, số lượng, nút Thêm vào giỏ ]
[ Món gợi ý: 3–4 thẻ ]
[ Chân trang ]
```

### Giỏ hàng
```
[ Thanh menu ]
[ Tiêu đề "Giỏ hàng" ]
[ Danh sách món (trái) | Tóm tắt đơn: tổng tiền, nút Đặt bàn/Tiếp tục xem menu (phải) ]
[ Chân trang ]
```

### Đặt bàn
```
[ Thanh menu ]
[ Form (trái) | ảnh quán + giờ mở cửa (phải) ]
[ Chân trang ]
```

### Chân trang (global, mọi trang)
Nền espresso, chữ trắng ấm. Dùng **cùng một chân trang** ở cả 5 trang.

```
[ Cột 1: logo + "Khơi nguồn sáng tạo" ]
[ Cột 2: Liên kết nhanh – Trang chủ · Menu · Về chúng tôi · Đặt bàn · Giỏ hàng ]
[ Cột 3: Liên hệ – 80 đường số 4, Phường Thủ Đức, TP. Hồ Chí Minh · lathanhquyet@gmail.com ]
------------------------------------------------------------
© 2026 Q-Coffee. Bảo lưu mọi quyền. Người sáng lập: Lã Thành Quyết.
```

- Dòng bản quyền nằm ở dải dưới cùng, cách phần trên bằng đường kẻ mỏng, chữ 14 px, căn giữa.
- Email là liên kết `mailto:`; địa chỉ là liên kết mở Google Maps.
- Trên điện thoại ba cột xếp dọc, dòng bản quyền vẫn nằm cuối cùng.

## 8. Hình ảnh

- Phong cách: ảnh thật, ánh sáng tự nhiên, tông ấm, nền đơn giản; ảnh món chụp từ trên xuống hoặc góc 45°.
- Ảnh món vuông 800×800 px, ảnh banner 1600×900 px, định dạng `.webp` hoặc `.jpg` dưới 200 KB.
- Mọi ảnh có thuộc tính `alt` mô tả nội dung (ví dụ `alt="Ly cà phê sữa đá trên bàn gỗ"`).
- Ảnh lấy từ nguồn miễn phí bản quyền, ghi nguồn trong `README.md`.

## 9. Chuyển động

Chỉ có chuyển động khi người dùng thao tác:
- Thẻ món nâng nhẹ 4 px khi di chuột.
- Số trên biểu tượng giỏ nhấp nháy một lần khi thêm món.
- Thông báo trượt vào rồi tự ẩn sau 3 giây.

Tôn trọng `prefers-reduced-motion`: tắt mọi chuyển động nếu người dùng bật tùy chọn này.

## 10. Điểm đáp ứng (responsive) và khả năng truy cập

- Điểm ngắt: **640 px** (điện thoại) và **960 px** (máy tính bảng).
- Thiết kế cho điện thoại trước, sau đó mở rộng.
- Mọi nút và liên kết có vùng bấm tối thiểu 44×44 px.
- Có thể thao tác hoàn toàn bằng bàn phím; viền focus luôn nhìn thấy.
- Dùng thẻ ngữ nghĩa: `header`, `nav`, `main`, `section`, `footer`.
- Khai báo `<html lang="vi">`.

## 11. Giọng văn

Thân thiện, ngắn gọn, nói thẳng việc cần làm.

| Nên | Không nên |
|---|---|
| "Thêm vào giỏ" | "Submit" |
| "Đã thêm Latte vào giỏ" | "Thao tác thành công" |
| "Giỏ hàng đang trống" | "Không có dữ liệu" |
| "Số điện thoại cần 10 chữ số" | "Dữ liệu không hợp lệ" |

Khẩu hiệu dùng đúng nguyên văn: **Khơi nguồn sáng tạo**.

## 12. Danh sách kiểm tra trước khi nộp

- [ ] Mọi trang dùng đúng `logo.svg` / `logo-icon.svg`, favicon là `logo-icon.svg`
- [ ] Thanh menu giống nhau và liên kết đủ 5 trang
- [ ] Chân trang có dòng bản quyền Q-Coffee và tên người sáng lập Lã Thành Quyết ở mọi trang
- [ ] Dùng đúng bảng màu và font ở trên
- [ ] Xem tốt ở 375 px (điện thoại) và 1280 px (máy tính)
- [ ] Có trạng thái đang tải, giỏ trống, lỗi
- [ ] Ảnh có `alt`, có ghi nguồn ảnh trong `README.md`
