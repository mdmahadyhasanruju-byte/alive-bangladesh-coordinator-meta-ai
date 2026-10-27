-- Draft schema only. Review ownership, retention, and RLS with local governance before applying.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  created_at timestamptz not null default now()
);

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assessment_id uuid references public.assessments(id) on delete cascade,
  response jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  dimension text not null,
  score integer not null check (score between 0 and 100),
  created_at timestamptz not null default now()
);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  model_label text,
  output_summary jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_reference text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

do $$ declare t text; begin
  foreach t in array array['profiles','assessments','responses','scores','progress','tasks','ai_logs','purchases'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists owner_select on public.%I', t);
    if t = 'profiles' then
      execute 'create policy owner_select on public.profiles for select to authenticated using (id = auth.uid())';
    else
      execute format('create policy owner_select on public.%I for select to authenticated using (user_id = auth.uid())', t);
    end if;
    execute format('drop policy if exists owner_insert on public.%I', t);
    if t = 'profiles' then
      execute 'create policy owner_insert on public.profiles for insert to authenticated with check (id = auth.uid())';
    else
      execute format('create policy owner_insert on public.%I for insert to authenticated with check (user_id = auth.uid())', t);
    end if;
    execute format('drop policy if exists owner_update on public.%I', t);
    if t = 'profiles' then
      execute 'create policy owner_update on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid())';
    else
      execute format('create policy owner_update on public.%I for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
    end if;
    execute format('drop policy if exists owner_delete on public.%I', t);
    if t = 'profiles' then
      execute 'create policy owner_delete on public.profiles for delete to authenticated using (id = auth.uid())';
    else
      execute format('create policy owner_delete on public.%I for delete to authenticated using (user_id = auth.uid())', t);
    end if;
  end loop;
end $$;
