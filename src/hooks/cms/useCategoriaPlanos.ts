import { useSupabaseQuery } from "@/hooks/cms/useSupabaseQuery";
import { fetchCategoriasComPlanos } from "@/lib/cms/queries/categoriaPlanos";
import type { CategoriaComPlanos } from "@/types/cms";

export function useCategoriasComPlanos() {
  return useSupabaseQuery<CategoriaComPlanos[]>(fetchCategoriasComPlanos, [], []);
}
