-- =====================================================================
-- Q-Coffee – Schema Supabase (PostgreSQL)
-- Cách chạy: Supabase Dashboard > SQL Editor > New query > dán file > Run
-- Có thể chạy lại nhiều lần (dùng IF NOT EXISTS / DROP POLICY IF EXISTS).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Bảng products – danh sách món (website chỉ đọc)
-- ---------------------------------------------------------------------
create table if not exists public.products (
  id           bigint generated always as identity primary key,
  name         text        not null unique,
  category     text        not null
               check (category in ('ca-phe', 'tra', 'da-xay', 'banh')),
  price        integer     not null check (price >= 0),      -- đơn vị: VND
  image_url    text        not null,                          -- vd: images/latte.jpg
  description  text        not null default '',
  is_featured  boolean     not null default false,            -- hiện ở "Món nổi bật"
  created_at   timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);

-- ---------------------------------------------------------------------
-- 2. Bảng cart_items – giỏ hàng (insert / update / delete)
--    session_id: mã ngẫu nhiên lưu trong localStorage của trình duyệt,
--    thay cho đăng nhập.
-- ---------------------------------------------------------------------
create table if not exists public.cart_items (
  id          bigint generated always as identity primary key,
  session_id  text        not null check (length(session_id) between 8 and 64),
  product_id  bigint      not null references public.products (id) on delete cascade,
  quantity    integer     not null default 1 check (quantity between 1 and 99),
  created_at  timestamptz not null default now(),
  constraint cart_items_session_product_key unique (session_id, product_id)
);

create index if not exists cart_items_session_idx on public.cart_items (session_id);

-- ---------------------------------------------------------------------
-- 3. Bảng bookings – đặt bàn (insert)
-- ---------------------------------------------------------------------
create table if not exists public.bookings (
  id            bigint generated always as identity primary key,
  full_name     text        not null check (length(trim(full_name)) between 2 and 100),
  phone         text        not null check (phone ~ '^[0-9]{10}$'),
  booking_date  date        not null,
  booking_time  time        not null,
  guests        integer     not null check (guests between 1 and 12),
  note          text        not null default '' check (length(note) <= 500),
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 4. Row Level Security (BẮT BUỘC vì anon key nằm trong mã nguồn công khai)
-- ---------------------------------------------------------------------
alter table public.products   enable row level security;
alter table public.cart_items enable row level security;
alter table public.bookings   enable row level security;

-- products: ai cũng được đọc, không ai được sửa từ website
drop policy if exists "products_select_all" on public.products;
create policy "products_select_all"
  on public.products for select
  to anon, authenticated
  using (true);

-- cart_items: bản demo cho phép đọc/thêm/sửa/xóa
-- (hạn chế: ai biết session_id của người khác thì sửa được giỏ của họ)
drop policy if exists "cart_select" on public.cart_items;
create policy "cart_select"
  on public.cart_items for select
  to anon, authenticated
  using (true);

drop policy if exists "cart_insert" on public.cart_items;
create policy "cart_insert"
  on public.cart_items for insert
  to anon, authenticated
  with check (true);

drop policy if exists "cart_update" on public.cart_items;
create policy "cart_update"
  on public.cart_items for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "cart_delete" on public.cart_items;
create policy "cart_delete"
  on public.cart_items for delete
  to anon, authenticated
  using (true);

-- bookings: khách chỉ được gửi (insert), không đọc được đơn của người khác
drop policy if exists "bookings_insert" on public.bookings;
create policy "bookings_insert"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

-- ---------------------------------------------------------------------
-- 5. Cấp quyền cho vai trò anon (tối thiểu cần thiết)
-- ---------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
grant select                         on public.products   to anon, authenticated;
grant select, insert, update, delete on public.cart_items to anon, authenticated;
grant insert                         on public.bookings   to anon, authenticated;
