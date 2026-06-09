import { supabase } from "@/lib/supabase/client";
import { formatUnitsLabel, mapPlano } from "@/lib/cms/mappers/plano";
import type { PlanoRow } from "@/lib/supabase/types";
import type { Plano } from "@/types/cms";

type PlanoUnidadeJunction = {
  plano_id: string;
  unidades: { slug: string; name: string } | null;
};

async function fetchUnitInfoByPlano(): Promise<
  Map<string, { slugs: string[]; names: string[] }>
> {
  const { data, error } = await supabase
    .from("plano_unidade")
    .select("plano_id, unidades(slug, name)");

  if (error) throw error;

  const map = new Map<string, { slugs: string[]; names: string[] }>();
  for (const row of (data ?? []) as PlanoUnidadeJunction[]) {
    const u = row.unidades;
    if (!u) continue;
    const entry = map.get(row.plano_id) ?? { slugs: [], names: [] };
    entry.slugs.push(u.slug);
    entry.names.push(u.name);
    map.set(row.plano_id, entry);
  }
  return map;
}

function mapPlanosWithUnits(
  rows: PlanoRow[],
  unitMap: Map<string, { slugs: string[]; names: string[] }>
): Plano[] {
  return rows.map((row) => {
    const units = unitMap.get(row.id);
    const unitSlugs = units?.slugs ?? [];
    const unitsLabel =
      row.plan_type === "unidade" && units?.names.length
        ? formatUnitsLabel(units.names)
        : undefined;
    return mapPlano(row, unitSlugs, unitsLabel);
  });
}

export async function fetchPlanosTerrestres(): Promise<Plano[]> {
  const { data, error } = await supabase
    .from("planos")
    .select("*")
    .eq("is_active", true)
    .eq("plan_type", "terrestre")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row) => mapPlano(row, []));
}

export async function fetchPlanosPorUnidade(): Promise<Plano[]> {
  const [{ data, error }, unitMap] = await Promise.all([
    supabase
      .from("planos")
      .select("*")
      .eq("is_active", true)
      .eq("plan_type", "unidade")
      .order("sort_order", { ascending: true }),
    fetchUnitInfoByPlano(),
  ]);

  if (error) throw error;
  return mapPlanosWithUnits(data ?? [], unitMap);
}

export async function fetchPlanosForUnidadeSlug(
  unidadeSlug: string
): Promise<Plano[]> {
  const [terrestres, { data: unidade, error: uError }] = await Promise.all([
    fetchPlanosTerrestres(),
    supabase
      .from("unidades")
      .select("id")
      .eq("slug", unidadeSlug)
      .eq("is_active", true)
      .maybeSingle(),
  ]);

  if (uError) throw uError;
  if (!unidade) return terrestres;

  const { data: junctions, error: jError } = await supabase
    .from("plano_unidade")
    .select("plano_id")
    .eq("unidade_id", unidade.id);

  if (jError) throw jError;

  const planoIds = (junctions ?? []).map((j) => j.plano_id);
  if (planoIds.length === 0) return terrestres;

  const [{ data: especificos, error: pError }, unitMap] = await Promise.all([
    supabase
      .from("planos")
      .select("*")
      .in("id", planoIds)
      .eq("is_active", true)
      .eq("plan_type", "unidade")
      .order("sort_order", { ascending: true }),
    fetchUnitInfoByPlano(),
  ]);

  if (pError) throw pError;

  return [...terrestres, ...mapPlanosWithUnits(especificos ?? [], unitMap)];
}
