import type { PlanoRow } from "@/lib/supabase/types";
import type { Plano } from "@/types/cms";

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

export function mapPlano(
  row: PlanoRow,
  unitSlugs: string[] = [],
  unitsLabel?: string
): Plano {
  const price = row.price != null ? Number(row.price) : undefined;

  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? "",
    planType: row.plan_type,
    categoriaId: row.categoria_id ?? undefined,
    price,
    priceLabel: row.price_label ?? undefined,
    period: row.period,
    features: parseStringArray(row.features),
    notIncluded: parseStringArray(row.not_included),
    whatsappText: row.whatsapp_text ?? "",
    highlighted: row.highlighted,
    badge: row.badge ?? undefined,
    unitSlugs,
    unitsLabel,
  };
}

export function formatUnitsLabel(unitNames: string[]): string {
  if (unitNames.length === 0) return "";
  return `Disponível em: Pacer ${unitNames.join(" · ")}`;
}
