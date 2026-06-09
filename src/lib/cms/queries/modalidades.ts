import { supabase } from "@/lib/supabase/client";
import { mapModalidade } from "@/lib/cms/mappers/modalidade";
import type { Modalidade } from "@/types/cms";

type UnitJunction = {
  unidades: { slug: string } | null;
};

async function fetchUnitSlugsByModality(): Promise<Map<string, string[]>> {
  const { data, error } = await supabase
    .from("modalidade_unidade")
    .select("modalidade_id, unidades(slug)");

  if (error) throw error;

  const map = new Map<string, string[]>();
  for (const row of (data ?? []) as { modalidade_id: string; unidades: { slug: string } | null }[]) {
    const slug = row.unidades?.slug;
    if (!slug) continue;
    const list = map.get(row.modalidade_id) ?? [];
    list.push(slug);
    map.set(row.modalidade_id, list);
  }
  return map;
}

export async function fetchModalidades(): Promise<Modalidade[]> {
  const [{ data: rows, error }, slugMap] = await Promise.all([
    supabase
      .from("modalidades")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    fetchUnitSlugsByModality(),
  ]);

  if (error) throw error;

  return (rows ?? []).map((row) =>
    mapModalidade(row, slugMap.get(row.id) ?? [])
  );
}

export async function fetchModalidadeBySlug(
  slug: string
): Promise<Modalidade | null> {
  const { data: row, error } = await supabase
    .from("modalidades")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  if (!row) return null;

  const { data: junctions, error: jError } = await supabase
    .from("modalidade_unidade")
    .select("unidades(slug)")
    .eq("modalidade_id", row.id);

  if (jError) throw jError;

  const unitSlugs = ((junctions ?? []) as UnitJunction[])
    .map((j) => j.unidades?.slug)
    .filter((s): s is string => Boolean(s));

  return mapModalidade(row, unitSlugs);
}
