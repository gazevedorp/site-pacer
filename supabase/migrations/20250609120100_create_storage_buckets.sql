-- =============================================================================
-- Pacer Academia — Storage buckets and policies
-- =============================================================================
--
-- Buckets públicos (CMS): leitura pública, upload/update/delete só authenticated
-- Bucket candidaturas: privado — anon faz upload, só authenticated lê
--
-- Rodar após 20250609120000_create_cms_tables.sql

-- ---------------------------------------------------------------------------
-- Buckets
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'modalidades',
    'modalidades',
    true,
    5242880, -- 5 MB
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'unidades',
    'unidades',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'personais',
    'personais',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'galeria-fotos',
    'galeria-fotos',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'alertas',
    'alertas',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'candidaturas',
    'candidaturas',
    false,
    5242880,
    array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
  );

-- ---------------------------------------------------------------------------
-- modalidades
-- ---------------------------------------------------------------------------

create policy "modalidades_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'modalidades');

create policy "modalidades_auth_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'modalidades');

create policy "modalidades_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'modalidades');

create policy "modalidades_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'modalidades');

-- ---------------------------------------------------------------------------
-- unidades
-- ---------------------------------------------------------------------------

create policy "unidades_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'unidades');

create policy "unidades_auth_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'unidades');

create policy "unidades_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'unidades');

create policy "unidades_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'unidades');

-- ---------------------------------------------------------------------------
-- personais
-- ---------------------------------------------------------------------------

create policy "personais_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'personais');

create policy "personais_auth_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'personais');

create policy "personais_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'personais');

create policy "personais_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'personais');

-- ---------------------------------------------------------------------------
-- galeria-fotos
-- ---------------------------------------------------------------------------

create policy "galeria_fotos_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'galeria-fotos');

create policy "galeria_fotos_auth_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'galeria-fotos');

create policy "galeria_fotos_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'galeria-fotos');

create policy "galeria_fotos_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'galeria-fotos');

-- ---------------------------------------------------------------------------
-- alertas
-- ---------------------------------------------------------------------------

create policy "alertas_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'alertas');

create policy "alertas_auth_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'alertas');

create policy "alertas_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'alertas');

create policy "alertas_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'alertas');

-- ---------------------------------------------------------------------------
-- candidaturas (privado — currículos)
-- ---------------------------------------------------------------------------

create policy "candidaturas_anon_insert"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'candidaturas');

create policy "candidaturas_auth_select"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'candidaturas');

create policy "candidaturas_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'candidaturas');

create policy "candidaturas_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'candidaturas');
