import type { UnidadeRow } from "@/lib/supabase/types";
import type { FacilidadeId, Unidade } from "@/types/cms";
import { getPublicUrl } from "@/lib/supabase/storage";

function parseHours(hours: unknown): string[] {
  if (!Array.isArray(hours)) return [];
  return hours.map((item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object" && "hours" in item) {
      const o = item as { label?: string; hours?: string };
      return o.label ? `${o.label}: ${o.hours ?? ""}` : String(o.hours ?? "");
    }
    return String(item);
  });
}

function parseFacilidades(values: string[]): FacilidadeId[] {
  return values as FacilidadeId[];
}

export function mapUnidade(
  row: UnidadeRow,
  modalitySlugs: string[] = []
): Unidade {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    city: row.city,
    address: row.address,
    hours: parseHours(row.hours),
    note: row.note ?? undefined,
    whatsapp: row.whatsapp ?? undefined,
    mapQuery: row.map_query,
    lat: row.latitude,
    lng: row.longitude,
    facilidades: parseFacilidades(row.facilidades),
    modalitySlugs,
    status: row.status,
    coverImageUrl: getPublicUrl("unidades", row.cover_image_path),
  };
}

export function isActiveUnit(u: Unidade): boolean {
  return u.status === "active";
}

export function formatUnidadesCount(count: number): string {
  return `${count} unidade${count === 1 ? "" : "s"}`;
}

export function isComingSoonUnit(u: Unidade): boolean {
  return u.status === "coming_soon";
}
