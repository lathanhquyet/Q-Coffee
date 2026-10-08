# Q-Coffee – Khơi nguồn sáng tạo

Website của **Q-Coffee**, quán cà phê hư cấu dành cho người làm sáng tạo. Đây là đồ án cuối khóa: website tĩnh (HTML + CSS + JavaScript) dùng **Supabase** làm database.

- Người sáng lập: Lã Thành Quyết (lathanhquyet@gmail.com)
- Địa chỉ: 80 đường số 4, Phường Thủ Đức, TP. Hồ Chí Minh
- Website đã deploy: _điền link sau khi deploy_

## Các trang

| Trang | File | Nội dung |
|---|---|---|
| Trang chủ | `index.html` | Banner, món nổi bật, menu có bộ lọc, giới thiệu, số liệu |
| Về chúng tôi | `about.html` | Câu chuyện thương hiệu, giá trị, giờ mở cửa, Google Map nhúng |
| Chi tiết món | `product.html?id=…` | Ảnh, giá, mô tả, chọn số lượng, thêm vào giỏ |
| Giỏ hàng | `cart.html` | Đổi số lượng, xóa món, tổng tiền |
| Đặt bàn | `booking.html` | Form đặt bàn |

Chân trang chung ở mọi trang có bản quyền Q-Coffee và tên người sáng lập.

## Chức năng và thao tác database

| Chức năng | Thao tác |
|---|---|
| Hiển thị menu, xem chi tiết món | SELECT bảng `products` |
| Thêm món vào giỏ | INSERT (hoặc UPDATE tăng số lượng nếu món đã có) bảng `cart_items` |
| Đổi số lượng trong giỏ | UPDATE bảng `cart_items` |
| Xóa món khỏi giỏ | DELETE bảng `cart_items` |
| Đặt bàn | INSERT bảng `bookings` |
| Số lượng trên biểu tượng giỏ | SELECT bảng `cart_items` |

Giỏ hàng không cần đăng nhập: mỗi trình duyệt có một mã phiên ngẫu nhiên (`session_id`) lưu trong `localStorage`.

## Cấu trúc thư mục

```
q-coffee/
├── index.html  about.html  product.html  cart.html  booking.html
├── css/style.css
├── js/
│   ├── supabase.js   # kết nối Supabase, hàm dùng chung
│   ├── menu.js       # menu, chi tiết món
│   ├── cart.js       # giỏ hàng
│   └── booking.js    # đặt bàn
├── supabase/
│   ├── schema.sql        # tạo bảng, ràng buộc, RLS, phân quyền
│   ├── seed.sql          # 10 món mẫu
│   └── update_images.sql # đổi ảnh món sang Unsplash (cho DB đã seed trước đó)
├── logo.svg  logo-icon.svg
├── PRD.md  DESIGN.md  README.md
└── BaoCao_Q-Coffee.docx
```

## Cài đặt database (Supabase)

1. Tạo project trên [supabase.com](https://supabase.com).
2. Vào **SQL Editor**, chạy lần lượt `supabase/schema.sql`, rồi `supabase/seed.sql`.
   Nếu đã chạy `seed.sql` bản cũ (ảnh dạng `images/…`), chạy thêm `supabase/update_images.sql`.
3. Mở `js/supabase.js`, điền **Project URL** và khóa **anon public** của project mình.

> Khóa `anon` được thiết kế để nằm trong mã nguồn công khai, quyền thật sự do RLS trong `schema.sql` quyết định. **Không bao giờ** đưa khóa `service_role` lên GitHub.

## Chạy thử trên máy

Website không cần build. Cách đơn giản nhất:

```bash
cd q-coffee
python3 -m http.server 8000
# mở http://localhost:8000
```

(Mở trực tiếp file `index.html` cũng được, nhưng nên dùng máy chủ cục bộ để giống môi trường thật.)

## Deploy lên GitHub Pages

1. Tạo repository **Public** trên GitHub và push toàn bộ thư mục này lên nhánh `main`.
2. Vào **Settings → Pages**, chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`, bấm Save.
3. Sau 1–2 phút, website có địa chỉ dạng `https://<tên-tài-khoản>.github.io/<tên-repo>/`.

## Hình ảnh

Ảnh minh họa lấy từ [Unsplash](https://unsplash.com) (Unsplash License, dùng miễn phí). Ảnh món lưu dạng đường dẫn trong cột `image_url` của bảng `products`; muốn đổi ảnh chỉ cần sửa cột này (xem `supabase/update_images.sql`). Nếu một ảnh không tải được, trang tự hiện `logo-icon.svg` thay thế. Logo Q-Coffee do dự án tự thiết kế.

## Tài liệu

- `PRD.md`: yêu cầu sản phẩm (làm gì, cho ai).
- `DESIGN.md`: hướng dẫn thiết kế (trông thế nào).
