create extension if not exists "pgcrypto";

create type public.app_role as enum ('admin', 'user', 'professional');
create type public.membership_status as enum ('pending', 'active', 'past_due', 'cancelled');
create type public.payment_provider as enum ('mercado_pago', 'talio_pay', 'manual');
create type public.resource_type as enum ('guide', 'audio', 'video', 'template');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $function$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$function$;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique,
  full_name text not null,
  role public.app_role not null default 'user',
  membership_status public.membership_status not null default 'pending',
  membership_provider public.payment_provider,
  membership_plan text,
  profile_category text,
  onboarding_answers jsonb not null default '{}'::jsonb,
  avatar_url text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table public.membership_payments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  provider public.payment_provider not null,
  provider_reference text,
  amount_in_ars integer not null check (amount_in_ars > 0),
  currency text not null default 'ARS',
  status text not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text not null,
  description text not null,
  professional_id uuid references public.profiles (id) on delete set null,
  professional_name text not null,
  meet_url text not null,
  starts_at timestamptz not null,
  duration_minutes integer not null check (duration_minutes > 0),
  capacity integer not null check (capacity > 0),
  is_featured boolean not null default false,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table public.session_enrollments (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default timezone('utc'::text, now()),
  unique (session_id, profile_id)
);

create table public.campus_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table public.campus_resources (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.campus_categories (id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  body jsonb not null default '[]'::jsonb,
  author_id uuid references public.profiles (id) on delete set null,
  author_name text not null,
  resource_type public.resource_type not null default 'guide',
  read_time_minutes integer check (read_time_minutes > 0),
  target_profiles text[] not null default '{}',
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create or replace function public.is_admin(user_id uuid)
returns boolean
language sql
stable
as $function$
  select exists (
    select 1
    from public.profiles
    where id = user_id
      and role = 'admin'
  );
$function$;

create or replace function public.has_active_membership(user_id uuid)
returns boolean
language sql
stable
as $function$
  select exists (
    select 1
    from public.profiles
    where id = user_id
      and membership_status = 'active'
  );
$function$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    role,
    membership_status
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'Nuevo usuario'),
    coalesce((new.raw_user_meta_data ->> 'role')::public.app_role, 'user'),
    coalesce((new.raw_user_meta_data ->> 'membership_status')::public.membership_status, 'pending')
  )
  on conflict (id) do nothing;

  return new;
end;
$function$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger sessions_set_updated_at
  before update on public.sessions
  for each row execute procedure public.set_updated_at();

create trigger campus_resources_set_updated_at
  before update on public.campus_resources
  for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.membership_payments enable row level security;
alter table public.sessions enable row level security;
alter table public.session_enrollments enable row level security;
alter table public.campus_categories enable row level security;
alter table public.campus_resources enable row level security;

create policy "profiles self read"
on public.profiles
for select
to authenticated
using (auth.uid() = id or public.is_admin(auth.uid()));

create policy "profiles self update"
on public.profiles
for update
to authenticated
using (auth.uid() = id or public.is_admin(auth.uid()))
with check (auth.uid() = id or public.is_admin(auth.uid()));

create policy "admins manage profiles"
on public.profiles
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "members can read payments"
on public.membership_payments
for select
to authenticated
using (auth.uid() = profile_id or public.is_admin(auth.uid()));

create policy "admins manage payments"
on public.membership_payments
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "authenticated can read sessions"
on public.sessions
for select
to authenticated
using (public.has_active_membership(auth.uid()) or public.is_admin(auth.uid()));

create policy "admins manage sessions"
on public.sessions
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "members read own enrollments"
on public.session_enrollments
for select
to authenticated
using (auth.uid() = profile_id or public.is_admin(auth.uid()));

create policy "members create own enrollments"
on public.session_enrollments
for insert
to authenticated
with check (
  auth.uid() = profile_id
  and public.has_active_membership(auth.uid())
);

create policy "admins manage enrollments"
on public.session_enrollments
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "authenticated can read categories"
on public.campus_categories
for select
to authenticated
using (public.has_active_membership(auth.uid()) or public.is_admin(auth.uid()));

create policy "admins manage categories"
on public.campus_categories
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "authenticated can read published resources"
on public.campus_resources
for select
to authenticated
using (
  is_published = true
  and (public.has_active_membership(auth.uid()) or public.is_admin(auth.uid()))
);

create policy "admins manage resources"
on public.campus_resources
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

insert into public.campus_categories (name, slug, description)
values
  ('Herramientas practicas', 'herramientas-practicas', 'Recursos concretos para regular y ordenar el dia a dia.'),
  ('Meditaciones', 'meditaciones', 'Contenido para bajar activacion, descansar y recuperar foco.'),
  ('Habitos', 'habitos', 'Plantillas y guias para sostener bienestar con continuidad.'),
  ('Vinculos', 'vinculos', 'Material orientado a autoestima, limites y relaciones.')
on conflict (slug) do nothing;
