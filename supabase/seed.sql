-- =====================================================================
-- Q-Coffee – Dữ liệu menu mẫu (10 món)
-- Chạy SAU schema.sql. Chạy lại nhiều lần vẫn an toàn (bỏ qua món đã có).
-- Tên file ảnh khớp với thư mục images/ của website.
-- =====================================================================
insert into public.products (name, category, price, image_url, description, is_featured) values
  ('Cà phê phin đen',   'ca-phe', 25000, 'images/ca-phe-phin-den.jpg',  'Cà phê phin truyền thống, đậm vị, hậu ngọt nhẹ.', false),
  ('Cà phê sữa đá',     'ca-phe', 29000, 'images/ca-phe-sua-da.jpg',    'Cà phê phin đậm đà hòa cùng sữa đặc, nhiều đá.', true),
  ('Bạc xỉu',           'ca-phe', 32000, 'images/bac-xiu.jpg',          'Nhiều sữa, ít cà phê, êm và ngọt dịu.', false),
  ('Americano',         'ca-phe', 35000, 'images/americano.jpg',        'Espresso pha loãng với nước, vị thanh và sạch.', false),
  ('Latte',             'ca-phe', 45000, 'images/latte.jpg',            'Espresso với sữa tươi đánh nóng, lớp bọt mịn.', false),
  ('Q-Spark',           'ca-phe', 49000, 'images/q-spark.jpg',          'Món đặc trưng của quán: espresso, cam vắt và soda, tỉnh táo cho buổi làm việc dài.', true),
  ('Trà đào cam sả',    'tra',    42000, 'images/tra-dao-cam-sa.jpg',   'Trà thanh mát với đào miếng, cam tươi và sả thơm.', true),
  ('Matcha đá xay',     'da-xay', 52000, 'images/matcha-da-xay.jpg',    'Bột matcha xay cùng đá và sữa, béo nhẹ, hậu trà xanh.', false),
  ('Cookie đá xay',     'da-xay', 55000, 'images/cookie-da-xay.jpg',    'Đá xay sữa với bánh quy giòn, ngọt béo.', false),
  ('Bánh croissant bơ', 'banh',   38000, 'images/croissant-bo.jpg',     'Bánh sừng bò nướng mới, vỏ giòn, thơm bơ.', false)
on conflict (name) do nothing;
