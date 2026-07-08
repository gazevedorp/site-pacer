import { supabase } from "@/lib/supabase/client";
import { mapCategoriaPlano } from "@/lib/cms/mappers/categoriaPlano";
import { formatUnitsLabel, mapPlano } from "@/lib/cms/mappers/plano";
import type { CategoriaPlanoRow, PlanoRow } from "@/lib/supabase/types";
import type { CategoriaComPlanos } from "@/types/cms";

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

export async function fetchCategoriasComPlanos(): Promise<CategoriaComPlanos[]> {
  const [
    { data: categorias, error: cError },
    { data: planos, error: pError },
    unitMap,
  ] = await Promise.all([
    supabase
      .from("categoria_planos")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("planos")
      .select("*")
      .eq("is_active", true)
      .not("categoria_plano_id", "is", null)
      .order("sort_order", { ascending: true }),
    fetchUnitInfoByPlano(),
  ]);

  if (cError) throw cError;
  if (pError) throw pError;

  const planosByCategoria = new Map<string, PlanoRow[]>();
  for (const row of planos ?? []) {
    if (!row.categoria_plano_id) continue;
    const list = planosByCategoria.get(row.categoria_plano_id) ?? [];
    list.push(row);
    planosByCategoria.set(row.categoria_plano_id, list);
  }

  return (categorias ?? [])
    .map((row) => {
      const categoria = mapCategoriaPlano(row as CategoriaPlanoRow);
      const rows = planosByCategoria.get(categoria.id) ?? [];

      const mappedPlanos = rows.map((planoRow) => {
        const units = unitMap.get(planoRow.id);
        const unitSlugs = units?.slugs ?? [];
        const unitsLabel =
          planoRow.plan_type === "unidade" && units?.names.length
            ? formatUnitsLabel(units.names)
            : undefined;
        return mapPlano(planoRow, unitSlugs, unitsLabel);
      });

      return { ...categoria, planos: mappedPlanos };
    })
    .filter((categoria) => categoria.planos.length > 0);
}
