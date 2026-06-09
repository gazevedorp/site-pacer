import { supabase } from "@/lib/supabase/client";
import { mapPersonal } from "@/lib/cms/mappers/personal";
import type { Personal } from "@/types/cms";

export async function fetchPersonais(): Promise<Personal[]> {
  const [{ data: rows, error }, { data: unitJunctions, error: uError }, { data: modJunctions, error: mError }] =
    await Promise.all([
      supabase
        .from("personais")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
      supabase.from("personal_unidade").select("personal_id, unidades(slug)"),
      supabase
        .from("personal_modalidade")
        .select("personal_id, modalidades(slug)"),
    ]);

  if (error) throw error;
  if (uError) throw uError;
  if (mError) throw mError;

  const unitMap = new Map<string, string[]>();
  for (const j of (unitJunctions ?? []) as {
    personal_id: string;
    unidades: { slug: string } | null;
  }[]) {
    const slug = j.unidades?.slug;
    if (!slug) continue;
    const list = unitMap.get(j.personal_id) ?? [];
    list.push(slug);
    unitMap.set(j.personal_id, list);
  }

  const modMap = new Map<string, string[]>();
  for (const j of (modJunctions ?? []) as {
    personal_id: string;
    modalidades: { slug: string } | null;
  }[]) {
    const slug = j.modalidades?.slug;
    if (!slug) continue;
    const list = modMap.get(j.personal_id) ?? [];
    list.push(slug);
    modMap.set(j.personal_id, list);
  }

  return (rows ?? []).map((row) =>
    mapPersonal(row, unitMap.get(row.id) ?? [], modMap.get(row.id) ?? [])
  );
}

export function filterPersonais(
  personais: Personal[],
  filters: { cidade?: string; unidade?: string; modalidade?: string }
): Personal[] {
  return personais.filter((p) => {
    if (filters.cidade && p.city !== filters.cidade) return false;
    if (filters.unidade && !p.unitSlugs.includes(filters.unidade)) return false;
    if (filters.modalidade && !p.modalitySlugs.includes(filters.modalidade))
      return false;
    return true;
  });
}

export function getTrainerCities(personais: Personal[]): string[] {
  return Array.from(new Set(personais.map((p) => p.city))).sort();
}
