import type { CategoriaPlanoRow } from "@/lib/supabase/types";
import type { CategoriaPlano } from "@/types/cms";

export function mapCategoriaPlano(row: CategoriaPlanoRow): CategoriaPlano {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? undefined,
    sortOrder: row.sort_order,
  };
}
