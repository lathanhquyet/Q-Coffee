-- =====================================================================
-- Q-Coffee – Cập nhật ảnh món sang ảnh Unsplash (chạy sau seed.sql)
-- Cách chạy: Supabase > SQL Editor > dán > Run. Chạy lại nhiều lần vẫn an toàn.
-- Muốn đổi ảnh một món: sửa URL bên dưới rồi chạy lại.
-- =====================================================================
update public.products set image_url = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=75' where name = 'Cà phê phin đen';
update public.products set image_url = 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=75' where name = 'Cà phê sữa đá';
update public.products set image_url = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=75' where name = 'Bạc xỉu';
update public.products set image_url = 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=75' where name = 'Americano';
update public.products set image_url = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=75' where name = 'Latte';
update public.products set image_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=75' where name = 'Q-Spark';
update public.products set image_url = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=75' where name = 'Trà đào cam sả';
update public.products set image_url = 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=75' where name = 'Matcha đá xay';
update public.products set image_url = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=75' where name = 'Cookie đá xay';
update public.products set image_url = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=75' where name = 'Bánh croissant bơ';

-- Kiểm tra kết quả:
-- select id, name, image_url from public.products order by id;
