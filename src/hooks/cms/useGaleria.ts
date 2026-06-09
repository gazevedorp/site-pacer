import { useSupabaseQuery } from "@/hooks/cms/useSupabaseQuery";
import { fetchGaleriaByUnidadeSlug } from "@/lib/cms/queries/galerias";
import type { GaleriaImage } from "@/types/cms";

export function useGaleria(unidadeSlug: string | undefined) {
  return useSupabaseQuery<GaleriaImage[]>(
    () =>
      unidadeSlug
        ? fetchGaleriaByUnidadeSlug(unidadeSlug)
        : Promise.resolve([]),
    [],
    [unidadeSlug]
  );
}
