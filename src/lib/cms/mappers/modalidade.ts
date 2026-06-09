import type { ModalidadeRow } from "@/lib/supabase/types";
import type { Modalidade } from "@/types/cms";
import { getPublicUrl } from "@/lib/supabase/storage";

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

export function mapModalidade(
  row: ModalidadeRow,
  unitSlugs: string[] = []
): Modalidade {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    iconName: row.icon_name ?? undefined,
    coverImageUrl: getPublicUrl("modalidades", row.cover_image_path),
    benefits: parseStringArray(row.benefits),
    caloriesAvg: row.calories_avg ?? undefined,
    recommendedFor: row.recommended_for ?? [],
    unitSlugs,
  };
}
