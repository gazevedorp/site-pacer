-- ---------------------------------------------------------------------------
-- categoria_planos — agrupa planos na tela /planos
-- ---------------------------------------------------------------------------

create table public.categoria_planos (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text,
  sort_order  integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index categoria_planos_is_active_idx on public.categoria_planos (is_active);
create index categoria_planos_sort_order_idx on public.categoria_planos (sort_order);

create trigger categoria_planos_set_updated_at
  before update on public.categoria_planos
  for each row execute function public.set_updated_at();

alter table public.planos
  add column categoria_id uuid references public.categoria_planos (id) on delete set null;

create index planos_categoria_id_idx on public.planos (categoria_id);

-- Categorias padrão (espelham as seções atuais da página de planos)
insert into public.categoria_planos (slug, name, description, sort_order)
values
  (
    'terrestres',
    'Planos Terrestres',
    'Uma mensalidade com acesso a todas as unidades. * Exceto setor aquático',
    0
  ),
  (
    'unidades',
    'Disponíveis em unidades selecionadas',
    'Pilates, setor aquático e natação infantil não fazem parte dos planos gerais da rede. Consulte a unidade para valores e vagas.',
    1
  );

update public.planos p
set categoria_id = c.id
from public.categoria_planos c
where p.plan_type = 'terrestre' and c.slug = 'terrestres';

update public.planos p
set categoria_id = c.id
from public.categoria_planos c
where p.plan_type = 'unidade' and c.slug = 'unidades';

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.categoria_planos enable row level security;

create policy "categoria_planos_public_select"
  on public.categoria_planos for select
  to anon
  using (is_active = true);

create policy "categoria_planos_auth_select"
  on public.categoria_planos for select
  to authenticated
  using (true);

create policy "categoria_planos_auth_insert"
  on public.categoria_planos for insert
  to authenticated
  with check (true);

create policy "categoria_planos_auth_update"
  on public.categoria_planos for update
  to authenticated
  using (true)
  with check (true);

create policy "categoria_planos_auth_delete"
  on public.categoria_planos for delete
  to authenticated
  using (true);
