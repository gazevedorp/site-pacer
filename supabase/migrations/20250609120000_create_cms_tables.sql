-- =============================================================================
-- Pacer Academia — CMS tables, junctions, triggers and RLS
-- =============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- unidades
-- ---------------------------------------------------------------------------

create table public.unidades (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  name             text not null,
  city             text not null,
  address          text not null,
  hours            jsonb not null default '[]'::jsonb,
  note             text,
  whatsapp         text,
  map_query        text not null,
  latitude         double precision not null,
  longitude        double precision not null,
  cover_image_path text,
  facilidades      text[] not null default '{}'::text[],
  status           text not null default 'active'
    check (status in ('active', 'coming_soon', 'inactive')),
  sort_order       integer not null default 0,
  is_active        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index unidades_is_active_idx on public.unidades (is_active);
create index unidades_status_idx on public.unidades (status);
create index unidades_city_idx on public.unidades (city);

create trigger unidades_set_updated_at
  before update on public.unidades
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- modalidades
-- ---------------------------------------------------------------------------

create table public.modalidades (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  description      text not null,
  icon_name        text,
  cover_image_path text,
  benefits         jsonb not null default '[]'::jsonb,
  calories_avg     integer,
  recommended_for  text[] not null default '{}'::text[],
  sort_order       integer not null default 0,
  is_active        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index modalidades_is_active_idx on public.modalidades (is_active);

create trigger modalidades_set_updated_at
  before update on public.modalidades
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- modalidade_unidade (N:N)
-- ---------------------------------------------------------------------------

create table public.modalidade_unidade (
  modalidade_id uuid not null references public.modalidades (id) on delete cascade,
  unidade_id    uuid not null references public.unidades (id) on delete cascade,
  primary key (modalidade_id, unidade_id)
);

create index modalidade_unidade_unidade_id_idx
  on public.modalidade_unidade (unidade_id);

-- ---------------------------------------------------------------------------
-- planos
--
-- plan_type:
--   terrestre — válido em todas as unidades; Home, 1ª seção de /planos,
--               e junto com específicos na página da unidade (sem plano_unidade)
--   unidade   — só em unidades vinculadas via plano_unidade; 2ª seção de
--               /planos e junto com terrestres na página da unidade
-- ---------------------------------------------------------------------------

create table public.planos (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  name           text not null,
  tagline        text,
  plan_type      text not null
    check (plan_type in ('terrestre', 'unidade')),
  price          numeric(10, 2),
  price_label    text,
  period         text not null default 'monthly',
  features       jsonb not null default '[]'::jsonb,
  not_included   jsonb not null default '[]'::jsonb,
  whatsapp_text  text,
  highlighted    boolean not null default false,
  badge          text,
  sort_order     integer not null default 0,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index planos_is_active_idx on public.planos (is_active);
create index planos_plan_type_idx on public.planos (plan_type);

create trigger planos_set_updated_at
  before update on public.planos
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- plano_unidade (N:N — planos específicos por unidade)
-- ---------------------------------------------------------------------------

create table public.plano_unidade (
  plano_id   uuid not null references public.planos (id) on delete cascade,
  unidade_id uuid not null references public.unidades (id) on delete cascade,
  primary key (plano_id, unidade_id)
);

create index plano_unidade_unidade_id_idx on public.plano_unidade (unidade_id);

-- ---------------------------------------------------------------------------
-- personais
-- ---------------------------------------------------------------------------

create table public.personais (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  bio         text not null,
  city        text not null,
  credential  text,
  photo_path  text,
  featured    boolean not null default false,
  whatsapp    text,
  phone       text,
  email       text,
  instagram   text,
  sort_order  integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index personais_is_active_idx on public.personais (is_active);
create index personais_city_idx on public.personais (city);

create trigger personais_set_updated_at
  before update on public.personais
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- personal_unidade (N:N)
-- ---------------------------------------------------------------------------

create table public.personal_unidade (
  personal_id uuid not null references public.personais (id) on delete cascade,
  unidade_id  uuid not null references public.unidades (id) on delete cascade,
  primary key (personal_id, unidade_id)
);

create index personal_unidade_unidade_id_idx on public.personal_unidade (unidade_id);

-- ---------------------------------------------------------------------------
-- personal_modalidade (N:N)
-- ---------------------------------------------------------------------------

create table public.personal_modalidade (
  personal_id   uuid not null references public.personais (id) on delete cascade,
  modalidade_id uuid not null references public.modalidades (id) on delete cascade,
  primary key (personal_id, modalidade_id)
);

create index personal_modalidade_modalidade_id_idx
  on public.personal_modalidade (modalidade_id);

-- ---------------------------------------------------------------------------
-- faqs
-- ---------------------------------------------------------------------------

create table public.faqs (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  question   text not null,
  answer     text not null,
  sort_order integer not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index faqs_is_active_idx on public.faqs (is_active);

create trigger faqs_set_updated_at
  before update on public.faqs
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- galerias (1 por unidade)
-- ---------------------------------------------------------------------------

create table public.galerias (
  id          uuid primary key default gen_random_uuid(),
  unidade_id  uuid not null unique references public.unidades (id) on delete cascade,
  title       text not null default 'Galeria de fotos',
  description text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index galerias_is_active_idx on public.galerias (is_active);

create trigger galerias_set_updated_at
  before update on public.galerias
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- galeria_fotos
-- ---------------------------------------------------------------------------

create table public.galeria_fotos (
  id            uuid primary key default gen_random_uuid(),
  galeria_id    uuid not null references public.galerias (id) on delete cascade,
  storage_path  text not null,
  alt           text not null,
  caption       text,
  sort_order    integer not null default 0,
  is_cover      boolean not null default false,
  created_at    timestamptz not null default now()
);

create index galeria_fotos_galeria_id_idx on public.galeria_fotos (galeria_id);
create index galeria_fotos_sort_order_idx on public.galeria_fotos (galeria_id, sort_order);

-- ---------------------------------------------------------------------------
-- alertas (modal ao abrir o site)
-- ---------------------------------------------------------------------------

create table public.alertas (
  id           uuid primary key default gen_random_uuid(),
  imagem_path  text not null,
  ativo        boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index alertas_ativo_idx on public.alertas (ativo) where ativo = true;

create trigger alertas_set_updated_at
  before update on public.alertas
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- contatos (formulário geral — assuntos hardcoded no frontend)
-- ---------------------------------------------------------------------------

create table public.contatos (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text not null,
  subject    text not null,
  message    text not null,
  status     text not null default 'new'
    check (status in ('new', 'in_progress', 'closed')),
  created_at timestamptz not null default now()
);

create index contatos_status_idx on public.contatos (status);
create index contatos_created_at_idx on public.contatos (created_at desc);

-- ---------------------------------------------------------------------------
-- candidaturas (trabalhe conosco — áreas hardcoded no frontend)
-- ---------------------------------------------------------------------------

create table public.candidaturas (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  email           text not null,
  phone           text not null,
  area            text not null,
  curriculo_path  text not null,
  status          text not null default 'new'
    check (status in ('new', 'in_progress', 'closed')),
  created_at      timestamptz not null default now()
);

create index candidaturas_status_idx on public.candidaturas (status);
create index candidaturas_created_at_idx on public.candidaturas (created_at desc);
create index candidaturas_area_idx on public.candidaturas (area);

-- =============================================================================
-- Row Level Security
-- =============================================================================

-- ---------------------------------------------------------------------------
-- unidades
-- ---------------------------------------------------------------------------

alter table public.unidades enable row level security;

create policy "unidades_public_select"
  on public.unidades for select
  to anon
  using (is_active = true);

create policy "unidades_auth_select"
  on public.unidades for select
  to authenticated
  using (true);

create policy "unidades_auth_insert"
  on public.unidades for insert
  to authenticated
  with check (true);

create policy "unidades_auth_update"
  on public.unidades for update
  to authenticated
  using (true)
  with check (true);

create policy "unidades_auth_delete"
  on public.unidades for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- modalidades
-- ---------------------------------------------------------------------------

alter table public.modalidades enable row level security;

create policy "modalidades_public_select"
  on public.modalidades for select
  to anon
  using (is_active = true);

create policy "modalidades_auth_select"
  on public.modalidades for select
  to authenticated
  using (true);

create policy "modalidades_auth_insert"
  on public.modalidades for insert
  to authenticated
  with check (true);

create policy "modalidades_auth_update"
  on public.modalidades for update
  to authenticated
  using (true)
  with check (true);

create policy "modalidades_auth_delete"
  on public.modalidades for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- modalidade_unidade
-- ---------------------------------------------------------------------------

alter table public.modalidade_unidade enable row level security;

create policy "modalidade_unidade_public_select"
  on public.modalidade_unidade for select
  to anon
  using (true);

create policy "modalidade_unidade_auth_select"
  on public.modalidade_unidade for select
  to authenticated
  using (true);

create policy "modalidade_unidade_auth_insert"
  on public.modalidade_unidade for insert
  to authenticated
  with check (true);

create policy "modalidade_unidade_auth_update"
  on public.modalidade_unidade for update
  to authenticated
  using (true)
  with check (true);

create policy "modalidade_unidade_auth_delete"
  on public.modalidade_unidade for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- planos
-- ---------------------------------------------------------------------------

alter table public.planos enable row level security;

create policy "planos_public_select"
  on public.planos for select
  to anon
  using (is_active = true);

create policy "planos_auth_select"
  on public.planos for select
  to authenticated
  using (true);

create policy "planos_auth_insert"
  on public.planos for insert
  to authenticated
  with check (true);

create policy "planos_auth_update"
  on public.planos for update
  to authenticated
  using (true)
  with check (true);

create policy "planos_auth_delete"
  on public.planos for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- plano_unidade
-- ---------------------------------------------------------------------------

alter table public.plano_unidade enable row level security;

create policy "plano_unidade_public_select"
  on public.plano_unidade for select
  to anon
  using (true);

create policy "plano_unidade_auth_select"
  on public.plano_unidade for select
  to authenticated
  using (true);

create policy "plano_unidade_auth_insert"
  on public.plano_unidade for insert
  to authenticated
  with check (true);

create policy "plano_unidade_auth_update"
  on public.plano_unidade for update
  to authenticated
  using (true)
  with check (true);

create policy "plano_unidade_auth_delete"
  on public.plano_unidade for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- personais
-- ---------------------------------------------------------------------------

alter table public.personais enable row level security;

create policy "personais_public_select"
  on public.personais for select
  to anon
  using (is_active = true);

create policy "personais_auth_select"
  on public.personais for select
  to authenticated
  using (true);

create policy "personais_auth_insert"
  on public.personais for insert
  to authenticated
  with check (true);

create policy "personais_auth_update"
  on public.personais for update
  to authenticated
  using (true)
  with check (true);

create policy "personais_auth_delete"
  on public.personais for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- personal_unidade
-- ---------------------------------------------------------------------------

alter table public.personal_unidade enable row level security;

create policy "personal_unidade_public_select"
  on public.personal_unidade for select
  to anon
  using (true);

create policy "personal_unidade_auth_select"
  on public.personal_unidade for select
  to authenticated
  using (true);

create policy "personal_unidade_auth_insert"
  on public.personal_unidade for insert
  to authenticated
  with check (true);

create policy "personal_unidade_auth_update"
  on public.personal_unidade for update
  to authenticated
  using (true)
  with check (true);

create policy "personal_unidade_auth_delete"
  on public.personal_unidade for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- personal_modalidade
-- ---------------------------------------------------------------------------

alter table public.personal_modalidade enable row level security;

create policy "personal_modalidade_public_select"
  on public.personal_modalidade for select
  to anon
  using (true);

create policy "personal_modalidade_auth_select"
  on public.personal_modalidade for select
  to authenticated
  using (true);

create policy "personal_modalidade_auth_insert"
  on public.personal_modalidade for insert
  to authenticated
  with check (true);

create policy "personal_modalidade_auth_update"
  on public.personal_modalidade for update
  to authenticated
  using (true)
  with check (true);

create policy "personal_modalidade_auth_delete"
  on public.personal_modalidade for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- faqs
-- ---------------------------------------------------------------------------

alter table public.faqs enable row level security;

create policy "faqs_public_select"
  on public.faqs for select
  to anon
  using (is_active = true);

create policy "faqs_auth_select"
  on public.faqs for select
  to authenticated
  using (true);

create policy "faqs_auth_insert"
  on public.faqs for insert
  to authenticated
  with check (true);

create policy "faqs_auth_update"
  on public.faqs for update
  to authenticated
  using (true)
  with check (true);

create policy "faqs_auth_delete"
  on public.faqs for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- galerias
-- ---------------------------------------------------------------------------

alter table public.galerias enable row level security;

create policy "galerias_public_select"
  on public.galerias for select
  to anon
  using (is_active = true);

create policy "galerias_auth_select"
  on public.galerias for select
  to authenticated
  using (true);

create policy "galerias_auth_insert"
  on public.galerias for insert
  to authenticated
  with check (true);

create policy "galerias_auth_update"
  on public.galerias for update
  to authenticated
  using (true)
  with check (true);

create policy "galerias_auth_delete"
  on public.galerias for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- galeria_fotos
-- ---------------------------------------------------------------------------

alter table public.galeria_fotos enable row level security;

create policy "galeria_fotos_public_select"
  on public.galeria_fotos for select
  to anon
  using (
    exists (
      select 1
      from public.galerias g
      join public.unidades u on u.id = g.unidade_id
      where g.id = galeria_fotos.galeria_id
        and g.is_active = true
        and u.is_active = true
    )
  );

create policy "galeria_fotos_auth_select"
  on public.galeria_fotos for select
  to authenticated
  using (true);

create policy "galeria_fotos_auth_insert"
  on public.galeria_fotos for insert
  to authenticated
  with check (true);

create policy "galeria_fotos_auth_update"
  on public.galeria_fotos for update
  to authenticated
  using (true)
  with check (true);

create policy "galeria_fotos_auth_delete"
  on public.galeria_fotos for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- alertas
-- ---------------------------------------------------------------------------

alter table public.alertas enable row level security;

create policy "alertas_public_select"
  on public.alertas for select
  to anon
  using (ativo = true);

create policy "alertas_auth_select"
  on public.alertas for select
  to authenticated
  using (true);

create policy "alertas_auth_insert"
  on public.alertas for insert
  to authenticated
  with check (true);

create policy "alertas_auth_update"
  on public.alertas for update
  to authenticated
  using (true)
  with check (true);

create policy "alertas_auth_delete"
  on public.alertas for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- contatos
-- ---------------------------------------------------------------------------

alter table public.contatos enable row level security;

create policy "contatos_public_insert"
  on public.contatos for insert
  to anon
  with check (true);

create policy "contatos_auth_select"
  on public.contatos for select
  to authenticated
  using (true);

create policy "contatos_auth_update"
  on public.contatos for update
  to authenticated
  using (true)
  with check (true);

create policy "contatos_auth_delete"
  on public.contatos for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- candidaturas
-- ---------------------------------------------------------------------------

alter table public.candidaturas enable row level security;

create policy "candidaturas_public_insert"
  on public.candidaturas for insert
  to anon
  with check (true);

create policy "candidaturas_auth_select"
  on public.candidaturas for select
  to authenticated
  using (true);

create policy "candidaturas_auth_update"
  on public.candidaturas for update
  to authenticated
  using (true)
  with check (true);

create policy "candidaturas_auth_delete"
  on public.candidaturas for delete
  to authenticated
  using (true);
