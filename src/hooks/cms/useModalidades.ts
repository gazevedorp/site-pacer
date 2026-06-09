import { useSupabaseQuery } from "@/hooks/cms/useSupabaseQuery";
import {
  fetchModalidades,
  fetchModalidadeBySlug,
} from "@/lib/cms/queries/modalidades";
import type { Modalidade } from "@/types/cms";

export function useModalidades() {
  return useSupabaseQuery<Modalidade[]>(fetchModalidades, [], []);
}

export function useModalidade(slug: string | undefined) {
  return useSupabaseQuery<Modalidade | null>(
    () => (slug ? fetchModalidadeBySlug(slug) : Promise.resolve(null)),
    null,
    [slug]
  );
}
