# PRD – Website Q-Coffee

> **PRD (Product Requirements Document)** là tài liệu mô tả *làm gì và làm cho ai*: mục tiêu, trang, chức năng, dữ liệu và tiêu chí hoàn thành. Cả nhóm (và AI) dựa vào file này để biết phạm vi dự án trước khi viết code. Cách trình bày giao diện nằm ở file `DESIGN.md`.

## 1. Tổng quan

| Mục | Nội dung |
|---|---|
| Tên thương hiệu | **Q-Coffee** (thương hiệu hư cấu) |
| Khẩu hiệu | **Khơi nguồn sáng tạo** |
| Người sáng lập | Lã Thành Quyết (lathanhquyet@gmail.com) |
| Địa chỉ | 80 đường số 4, Phường Thủ Đức, TP. Hồ Chí Minh |
| Lĩnh vực | Quán cà phê kiêm không gian làm việc cho người làm sáng tạo (thiết kế, viết lách, lập trình, sinh viên) |
| Logo | `logo.svg` (đầy đủ) và `logo-icon.svg` (biểu tượng/favicon). Chữ **Q** là miệng tách cà phê nhìn từ trên xuống, đuôi Q là quai tách, tia sáng bốn cánh tượng trưng cho ý tưởng |
| Tham khảo | Bố cục và phong cách trang [milanocoffee.com.vn](https://milanocoffee.com.vn/): thanh menu rõ ràng, các khối nội dung lớn có hình + tiêu đề + một đoạn ngắn, khối số liệu, lưới ảnh, chân trang có thông tin liên hệ |

> **Lưu ý về nội dung tham khảo:** Q-Coffee là thương hiệu hư cấu nên **không dùng logo, ảnh và tên sản phẩm của Milano**. Chỉ học cách bố cục. Menu và hình ảnh là của Q-Coffee (xem mục 6).

## 2. Mục tiêu

1. Giới thiệu thương hiệu Q-Coffee và không gian quán.
2. Cho khách xem menu, xem chi tiết từng món, thêm vào giỏ hàng.
3. Cho khách đặt bàn trước.
4. Đáp ứng đủ yêu cầu bài kiểm tra cuối khóa (xem mục 9).

**Không nằm trong phạm vi** (để demo gọn): đăng nhập, thanh toán online, trang quản trị, đa ngôn ngữ.

## 3. Người dùng

- Sinh viên và người đi làm tìm chỗ ngồi làm việc, cần wifi, ổ cắm, yên tĩnh.
- Khách muốn xem menu và đặt món/đặt bàn nhanh trên điện thoại.

## 4. Công nghệ

| Phần | Lựa chọn | Lý do |
|---|---|---|
| Giao diện | HTML + CSS + JavaScript thuần | Dễ hiểu, không cần build |
| Database | **Supabase** (PostgreSQL) | Gọi trực tiếp từ trình duyệt bằng `supabase-js`, không cần viết server |
| Nhúng | Google Map ở trang Về Chúng Tôi (có thể thêm video YouTube) | Đủ 0,5 điểm |
| Mã nguồn | GitHub (**Public**) | Yêu cầu đề bài |
| Deploy | GitHub Pages (hoặc Cloudflare Pages) | Website tĩnh, miễn phí |

## 5. Các trang

| # | Trang | File | Nội dung chính |
|---|---|---|---|
| 1 | Trang Chủ | `index.html` | Banner với logo + khẩu hiệu, nút **Xem menu**; khối "Món nổi bật" (đọc từ bảng `products`); menu đầy đủ có lọc theo nhóm; khối số liệu; chân trang |
| 2 | Về Chúng Tôi | `about.html` | Câu chuyện thương hiệu, giá trị (không gian sáng tạo: wifi, ổ cắm, góc làm việc), giờ mở cửa, địa chỉ, **Google Map nhúng** |
| 3 | Chi tiết sản phẩm | `product.html?id=…` | Ảnh lớn, tên, giá, mô tả, chọn số lượng, nút **Thêm vào giỏ** |
| 4 | Giỏ hàng | `cart.html` | Danh sách món đã chọn, đổi số lượng, xóa món, tổng tiền |
| 5 | Đặt bàn | `booking.html` | Form đặt bàn, thông báo thành công |

**Điều hướng:** thanh menu ở đầu **mọi trang** gồm: Trang chủ · Menu · Về chúng tôi · Đặt bàn · Giỏ hàng (kèm số lượng). Logo bấm về Trang chủ. Mỗi thẻ món ở Trang chủ dẫn đến trang Chi tiết. Thiếu liên kết giữa các trang sẽ bị trừ 0,5 điểm.

### Thông tin thương hiệu dùng chung

Các thông tin này xuất hiện ở nhiều trang, nên khai báo **một lần** (ví dụ trong `js/site.js` hoặc phần chân trang dùng chung) rồi dùng lại.

| Thông tin | Giá trị |
|---|---|
| Tên thương hiệu | Q-Coffee |
| Khẩu hiệu | Khơi nguồn sáng tạo |
| Địa chỉ | 80 đường số 4, Phường Thủ Đức, TP. Hồ Chí Minh |
| Người sáng lập | Lã Thành Quyết |
| Email liên hệ | lathanhquyet@gmail.com (email này sẽ hiển thị công khai trên website và GitHub) |
| Bản quyền | © 2026 Q-Coffee. Bảo lưu mọi quyền. |

**Chân trang (global):** xuất hiện ở **mọi trang**, luôn có dòng bản quyền và tên người sáng lập:

> © 2026 Q-Coffee. Bảo lưu mọi quyền. Người sáng lập: Lã Thành Quyết.

**Google Map (trang Về Chúng Tôi):** dùng đoạn nhúng dưới đây, đổi `width="600"` thành `width="100%"` để vừa màn hình điện thoại và thêm `title` cho trình đọc màn hình. Giữ nguyên `src`.

```html
<iframe
  src="https://www.google.com/maps/embed?pb=!4v1791446800877!6m8!1m7!1sokru3D2PWjFNu3LUo20p-A!2m2!1d10.83507753212439!2d106.7598555215377!3f291.59717!4f0!5f0.7820865974627469"
  width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  title="Bản đồ Q-Coffee, 80 đường số 4, Phường Thủ Đức, TP. Hồ Chí Minh"></iframe>
```

Dưới bản đồ ghi rõ địa chỉ bằng chữ để người dùng sao chép được.

## 6. Dữ liệu (Supabase)

> **SQL tạo bảng:** `supabase/schema.sql` (bảng, ràng buộc, RLS, phân quyền) và `supabase/seed.sql` (10 món mẫu). Chạy theo thứ tự `schema.sql` rồi `seed.sql` trong Supabase SQL Editor. Các ràng buộc dưới đây khớp với file SQL.

### Bảng `products` – danh sách món (chỉ đọc từ website)

| Cột | Kiểu | Ghi chú |
|---|---|---|
| `id` | bigint, PK | tự tăng |
| `name` | text | tên món, không trùng nhau (`unique`) |
| `category` | text | `ca-phe`, `tra`, `da-xay`, `banh` |
| `price` | integer | đơn vị VND |
| `image_url` | text | đường dẫn ảnh trong `images/` |
| `description` | text | mô tả ngắn |
| `is_featured` | boolean | hiển thị ở "Món nổi bật" |

### Bảng `cart_items` – giỏ hàng

| Cột | Kiểu | Ghi chú |
|---|---|---|
| `id` | bigint, PK | tự tăng |
| `session_id` | text | mã ngẫu nhiên lưu trong `localStorage` của trình duyệt, thay cho đăng nhập |
| `product_id` | bigint, FK → `products.id` | |
| `quantity` | integer | từ 1 đến 99 |
| `created_at` | timestamptz | mặc định `now()` |

Ràng buộc: `unique (session_id, product_id)` để thêm món đã có thì tăng số lượng thay vì tạo dòng mới.

### Bảng `bookings` – đặt bàn

| Cột | Kiểu | Ghi chú |
|---|---|---|
| `id` | bigint, PK | tự tăng |
| `full_name` | text | bắt buộc |
| `phone` | text | bắt buộc, đúng 10 chữ số |
| `booking_date` | date | bắt buộc; không cho chọn ngày quá khứ (kiểm tra ở JavaScript) |
| `booking_time` | time | bắt buộc; trong giờ mở cửa (kiểm tra ở JavaScript) |
| `guests` | integer | 1–12 |
| `note` | text | không bắt buộc |
| `created_at` | timestamptz | mặc định `now()` |

### Quyền truy cập (Row Level Security)

Vì key `anon` của Supabase nằm trong mã nguồn công khai, **bắt buộc bật RLS** cho cả 3 bảng:

- `products`: chỉ cho `select`.
- `cart_items`: cho `select / insert / update / delete` (bản demo; chấp nhận hạn chế là ai biết `session_id` cũng sửa được giỏ).
- `bookings`: chỉ cho `insert`.

Lưu ý khi viết code: với `bookings`, chỉ gọi `.insert(...)`, **không** nối `.select()` phía sau vì bảng này không cho đọc.

Không đưa `service_role` key vào mã nguồn.

### Menu mẫu (10 món, tự soạn cho Q-Coffee)

| Món | Nhóm | Giá (VND) | Nổi bật |
|---|---|---|---|
| Cà phê phin đen | ca-phe | 25.000 | |
| Cà phê sữa đá | ca-phe | 29.000 | ✔ |
| Bạc xỉu | ca-phe | 32.000 | |
| Americano | ca-phe | 35.000 | |
| Latte | ca-phe | 45.000 | |
| **Q-Spark** (espresso + cam vắt + soda, món đặc trưng) | ca-phe | 49.000 | ✔ |
| Trà đào cam sả | tra | 42.000 | ✔ |
| Matcha đá xay | da-xay | 52.000 | |
| Cookie đá xay | da-xay | 55.000 | |
| Bánh croissant bơ | banh | 38.000 | |

### Hình ảnh
Dùng ảnh miễn phí bản quyền (Unsplash, Pexels) hoặc ảnh do AI tạo, đặt trong `images/`. Ghi nguồn trong `README.md`. Không lấy ảnh từ trang Milano.

## 7. Chức năng

| Mã | Chức năng | Loại thao tác DB | Mô tả |
|---|---|---|---|
| F1 | Hiển thị menu | Select | Đọc `products`, lọc theo nhóm, hiện món nổi bật |
| F2 | Xem chi tiết món | Select | Đọc 1 dòng theo `id` trên URL |
| F3 | Thêm vào giỏ | **Insert** | Chưa có món trong giỏ → thêm dòng mới; đã có → tăng `quantity` (update) |
| F4 | Đổi số lượng | **Update** | Nút − / + trong giỏ, tối thiểu 1 |
| F5 | Xóa món khỏi giỏ | **Delete** | Nút xóa từng món |
| F6 | Đặt bàn | **Insert** | Kiểm tra dữ liệu trước khi gửi, báo thành công/lỗi rõ ràng |
| F7 | Số lượng trên biểu tượng giỏ | Select | Cập nhật sau mỗi thao tác |
| F8 | Nhúng Google Map | – | iframe ở trang Về Chúng Tôi |

Quy tắc chung: khi đang tải dữ liệu thì hiện trạng thái "Đang tải…"; khi giỏ trống thì hiện lời mời quay lại menu; khi lỗi thì nói rõ lỗi gì và cách làm lại.

## 8. Cấu trúc thư mục

```
q-coffee/
├── index.html
├── about.html
├── product.html
├── cart.html
├── booking.html
├── css/style.css
├── js/
│   ├── supabase.js      # khởi tạo kết nối
│   ├── menu.js          # F1, F2
│   ├── cart.js          # F3, F4, F5, F7
│   └── booking.js       # F6
├── images/              # logo và ảnh món
├── supabase/
│   ├── schema.sql       # tạo bảng, RLS, phân quyền
│   └── seed.sql         # dữ liệu menu mẫu
├── logo.svg
├── logo-icon.svg
├── README.md            # giới thiệu, cách chạy, nguồn ảnh
├── PRD.md               # file này
├── DESIGN.md            # hướng dẫn thiết kế
└── REPORT.md            # báo cáo nộp bài, gồm nhật ký prompt
```

## 9. Đối chiếu yêu cầu bài kiểm tra

| Yêu cầu (điểm) | Đáp ứng bằng |
|---|---|
| 3 trang (3) | Trang chủ, Về chúng tôi, Chi tiết sản phẩm (+ Giỏ hàng, Đặt bàn) |
| Dùng database (3) | Supabase: `products`, `cart_items`, `bookings` |
| ≥ 2 chức năng sửa DB (2) | F3 Insert, F4 Update, F5 Delete, F6 Insert |
| Nhúng (0,5) | Google Map ở `about.html` |
| File .md (0,5) | `README.md`, `PRD.md`, `DESIGN.md`, `REPORT.md` |
| GitHub public (0,5) | Repo `q-coffee`, chế độ Public |
| Deploy (0,5) | GitHub Pages / Cloudflare Pages |
| Chân trang | Mọi trang có dòng bản quyền Q-Coffee và tên người sáng lập Lã Thành Quyết |
| Không bị trừ điểm | Menu liên kết đủ các trang; logo được **tạo trước** và dùng **đúng** file `logo.svg` ở mọi trang |

## 10. Các file .md và công dụng (dùng cho báo cáo)

| File | Công dụng |
|---|---|
| `README.md` | Giới thiệu dự án, cách chạy, link deploy, nguồn ảnh |
| `PRD.md` | Mô tả yêu cầu: mục tiêu, trang, chức năng, dữ liệu. Trả lời câu hỏi "làm gì" |
| `DESIGN.md` | Quy định giao diện: màu, font, thành phần, bố cục. Trả lời câu hỏi "trông thế nào" |
| `REPORT.md` | Báo cáo nộp bài, gồm thứ tự prompt và kết quả từng prompt |

## 11. Kế hoạch thực hiện (hạn nộp 17/10/2026)

1. ✔ Logo, `PRD.md`, `DESIGN.md`
2. Tạo project Supabase, chạy `supabase/schema.sql` và `supabase/seed.sql`
3. Làm `style.css` và khung chung (thanh menu, chân trang)
4. Trang Chủ, Chi tiết, Về chúng tôi
5. Giỏ hàng (F3–F5, F7), Đặt bàn (F6)
6. Nhúng Google Map, kiểm tra liên kết giữa các trang
7. Push GitHub (Public), deploy, kiểm tra lại trên link đã deploy
8. Hoàn thiện `README.md`, `REPORT.md`, nộp hai đường link
