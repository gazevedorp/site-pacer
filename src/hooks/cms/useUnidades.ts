import { useSupabaseQuery } from "@/hooks/cms/useSupabaseQuery";
import { fetchUnidades, fetchUnidadeBySlug } from "@/lib/cms/queries/unidades";
import type { Unidade } from "@/types/cms";

export function useUnidades() {
  return useSupabaseQuery<Unidade[]>(fetchUnidades, [], []);
}

export function useUnidade(slug: string | undefined) {
  return useSupabaseQuery<Unidade | null>(
    () => (slug ? fetchUnidadeBySlug(slug) : Promise.resolve(null)),
    null,
    [slug]
  );
}
