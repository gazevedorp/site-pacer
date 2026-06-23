import { useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/cms/useSupabaseQuery";
import { fetchUnidades, fetchUnidadeBySlug } from "@/lib/cms/queries/unidades";
import { isActiveUnit } from "@/lib/cms/mappers/unidade";
import type { Unidade } from "@/types/cms";

export function useUnidades() {
  return useSupabaseQuery<Unidade[]>(fetchUnidades, [], []);
}

export function useActiveUnits() {
  const { data: unidades, isLoading, error, refetch } = useUnidades();

  const units = useMemo(() => unidades.filter(isActiveUnit), [unidades]);

  return {
    units,
    count: units.length,
    isLoading,
    error,
    refetch,
  };
}

export function useUnidade(slug: string | undefined) {
  return useSupabaseQuery<Unidade | null>(
    () => (slug ? fetchUnidadeBySlug(slug) : Promise.resolve(null)),
    null,
    [slug]
  );
}
