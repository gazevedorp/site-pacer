import { useSupabaseQuery } from "@/hooks/cms/useSupabaseQuery";
import {
  fetchPlanosTerrestres,
  fetchPlanosPorUnidade,
  fetchPlanosForUnidadeSlug,
} from "@/lib/cms/queries/planos";
import type { Plano } from "@/types/cms";

export function usePlanosTerrestres() {
  return useSupabaseQuery<Plano[]>(fetchPlanosTerrestres, [], []);
}

export function usePlanosPorUnidade() {
  return useSupabaseQuery<Plano[]>(fetchPlanosPorUnidade, [], []);
}

export function usePlanosUnidade(slug: string | undefined) {
  return useSupabaseQuery<Plano[]>(
    () => (slug ? fetchPlanosForUnidadeSlug(slug) : Promise.resolve([])),
    [],
    [slug]
  );
}
