alter table public.profiles
  add column if not exists daily_check_ins jsonb not null default '[]'::jsonb,
  add column if not exists process_goals text[] not null default '{}',
  add column if not exists process_entries jsonb not null default '[]'::jsonb,
  add column if not exists exposure_steps jsonb not null default '[]'::jsonb,
  add column if not exists sos_history jsonb not null default '[]'::jsonb;

select
  column_name,
  data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'profiles'
  and column_name in (
    'daily_check_ins',
    'process_goals',
    'process_entries',
    'exposure_steps',
    'sos_history'
  )
order by column_name;
