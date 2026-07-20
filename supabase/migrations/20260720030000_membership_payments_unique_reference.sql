create unique index if not exists membership_payments_provider_reference_idx
on public.membership_payments (provider_reference)
where provider_reference is not null;
