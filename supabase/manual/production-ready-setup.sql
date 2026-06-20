create extension if not exists "pgcrypto";

alter table public.profiles
  add column if not exists onboarding_summary jsonb not null default '{}'::jsonb;

do $$
declare
  admin_email constant text := 'admin@gapa.app';
  admin_password constant text := 'admin123';
  admin_name constant text := 'Admin GAPA';
  admin_id uuid;

  member_email constant text := 'elena@gapa.app';
  member_password constant text := 'demo123';
  member_name constant text := 'Elena Vargas';
  member_id uuid;
begin
  select id into admin_id
  from auth.users
  where email = admin_email
  limit 1;

  if admin_id is null then
    admin_id := gen_random_uuid();

    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    )
    values (
      '00000000-0000-0000-0000-000000000000',
      admin_id,
      'authenticated',
      'authenticated',
      admin_email,
      crypt(admin_password, gen_salt('bf')),
      timezone('utc'::text, now()),
      timezone('utc'::text, now()),
      jsonb_build_object('provider', 'email', 'providers', array['email']),
      jsonb_build_object(
        'full_name', admin_name,
        'role', 'admin',
        'membership_status', 'active'
      ),
      timezone('utc'::text, now()),
      timezone('utc'::text, now())
    );
  end if;

  insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  )
  select
    gen_random_uuid(),
    admin_id,
    jsonb_build_object('sub', admin_id::text, 'email', admin_email),
    'email',
    admin_id::text,
    timezone('utc'::text, now()),
    timezone('utc'::text, now()),
    timezone('utc'::text, now())
  where not exists (
    select 1
    from auth.identities
    where user_id = admin_id
      and provider = 'email'
  );

  insert into public.profiles (
    id,
    email,
    full_name,
    role,
    membership_status,
    membership_provider,
    membership_plan,
    profile_category,
    onboarding_answers,
    onboarding_summary
  )
  values (
    admin_id,
    admin_email,
    admin_name,
    'admin',
    'active',
    'manual',
    'Admin',
    'Operación interna',
    '{}'::jsonb,
    '{}'::jsonb
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = excluded.full_name,
    role = excluded.role,
    membership_status = excluded.membership_status,
    membership_provider = excluded.membership_provider,
    membership_plan = excluded.membership_plan,
    profile_category = excluded.profile_category,
    onboarding_answers = excluded.onboarding_answers,
    onboarding_summary = excluded.onboarding_summary;

  select id into member_id
  from auth.users
  where email = member_email
  limit 1;

  if member_id is null then
    member_id := gen_random_uuid();

    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    )
    values (
      '00000000-0000-0000-0000-000000000000',
      member_id,
      'authenticated',
      'authenticated',
      member_email,
      crypt(member_password, gen_salt('bf')),
      timezone('utc'::text, now()),
      timezone('utc'::text, now()),
      jsonb_build_object('provider', 'email', 'providers', array['email']),
      jsonb_build_object(
        'full_name', member_name,
        'role', 'user',
        'membership_status', 'active'
      ),
      timezone('utc'::text, now()),
      timezone('utc'::text, now())
    );
  end if;

  insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  )
  select
    gen_random_uuid(),
    member_id,
    jsonb_build_object('sub', member_id::text, 'email', member_email),
    'email',
    member_id::text,
    timezone('utc'::text, now()),
    timezone('utc'::text, now()),
    timezone('utc'::text, now())
  where not exists (
    select 1
    from auth.identities
    where user_id = member_id
      and provider = 'email'
  );

  insert into public.profiles (
    id,
    email,
    full_name,
    role,
    membership_status,
    membership_provider,
    membership_plan,
    profile_category,
    onboarding_answers,
    onboarding_summary
  )
  values (
    member_id,
    member_email,
    member_name,
    'user',
    'active',
    'mercado_pago',
    'Mensual',
    'Ansiedad generalizada',
    jsonb_build_object(
      'intensity_now', '4',
      'intensity_peak', '8',
      'main_goal', 'Reducir ansiedad'
    ),
    jsonb_build_object(
      'profileCategory', 'Ansiedad generalizada',
      'wellbeingLevel', 4,
      'riskLevel', 'nunca'
    )
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = excluded.full_name,
    role = excluded.role,
    membership_status = excluded.membership_status,
    membership_provider = excluded.membership_provider,
    membership_plan = excluded.membership_plan,
    profile_category = excluded.profile_category,
    onboarding_answers = excluded.onboarding_answers,
    onboarding_summary = excluded.onboarding_summary;

  insert into public.membership_payments (
    profile_id,
    provider,
    provider_reference,
    amount_in_ars,
    currency,
    status,
    paid_at
  )
  select
    member_id,
    'mercado_pago',
    'seed-membership-elena',
    20000,
    'ARS',
    'approved',
    timezone('utc'::text, now())
  where not exists (
    select 1
    from public.membership_payments
    where profile_id = member_id
      and provider_reference = 'seed-membership-elena'
  );
end
$$;

select
  email,
  role,
  membership_status,
  membership_plan
from public.profiles
where email in ('admin@gapa.app', 'elena@gapa.app')
order by email;
