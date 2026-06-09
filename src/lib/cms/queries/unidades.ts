import { supabase } from "@/lib/supabase/client";
import { mapUnidade } from "@/lib/cms/mappers/unidade";
import type { Unidade } from "@/types/cms";

type JunctionRow = {
  unidade_id: string;
  modalidade_id: string;
  modalidades: { slug: string } | null;
};

async function fetchModalitySlugsByUnit(): Promise<Map<string, string[]>> {
  const { data, error } = await supabase
    .from("modalidade_unidade")
    .select("unidade_id, modalidades(slug)");

  if (error) throw error;

  const map = new Map<string, string[]>();
  for (const row of (data ?? []) as JunctionRow[]) {
    const slug = row.modalidades?.slug;
    if (!slug) continue;
    const list = map.get(row.unidade_id) ?? [];
    list.push(slug);
    map.set(row.unidade_id, list);
  }
  return map;
}

export async function fetchUnidades(): Promise<Unidade[]> {
  const [{ data: rows, error }, slugMap] = await Promise.all([
    supabase
      .from("unidades")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    fetchModalitySlugsByUnit(),
  ]);

  if (error) throw error;

  return (rows ?? []).map((row) =>
    mapUnidade(row, slugMap.get(row.id) ?? [])
  );
}

export async function fetchUnidadeBySlug(slug: string): Promise<Unidade | null> {
  const { data: row, error } = await supabase
    .from("unidades")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  if (!row) return null;

  const { data: junctions, error: jError } = await supabase
    .from("modalidade_unidade")
    .select("modalidades(slug)")
    .eq("unidade_id", row.id);

  if (jError) throw jError;

  const modalitySlugs = ((junctions ?? []) as { modalidades: { slug: string } | null }[])
    .map((j) => j.modalidades?.slug)
    .filter((s): s is string => Boolean(s));

  return mapUnidade(row, modalitySlugs);
}

export async function fetchModalidadesForUnidade(
  unidadeId: string
): Promise<{ id: string; slug: string; title: string; description: string; icon_name: string | null; cover_image_path: string | null }[]> {
  const { data, error } = await supabase
    .from("modalidade_unidade")
    .select("modalidades(*)")
    .eq("unidade_id", unidadeId);

  if (error) throw error;

  return ((data ?? []) as { modalidades: {
    id: string;
    slug: string;
    title: string;
    description: string;
    icon_name: string | null;
    cover_image_path: string | null;
    is_active: boolean;
  } | null }[])
    .map((j) => j.modalidades)
    .filter((m): m is NonNullable<typeof m> => Boolean(m?.is_active));
}
