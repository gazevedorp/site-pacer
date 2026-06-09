/** Legacy types kept for schedule mock (future phase). CMS uses `@/types/cms`. */

export type UnitAmenityId =
  | "estacionamento"
  | "aulas-coletivas"
  | "hidroginastica"
  | "natacao-infantil"
  | "pilates"
  | "lanchonete"
  | "vestiario"
  | "climatizado";

export type UnitModalityId =
  | "musculacao"
  | "funcional"
  | "muay-thai"
  | "pilates"
  | "hidroginastica"
  | "natacao"
  | "danca"
  | "zumba";

export interface Unit {
  name: string;
  slug: string;
  city: string;
  address: string;
  hours: string[];
  note?: string;
  whatsapp?: string;
  mapQuery: string;
  lat: number;
  lng: number;
  amenities: UnitAmenityId[];
  unitModalities: UnitModalityId[];
}

export interface ComingSoonUnit {
  name: string;
  slug: string;
  city: string;
  address: string;
}

/** @deprecated CMS data — use `useUnidades()` */
export const units: Unit[] = [];

/** @deprecated CMS data — use `useUnidades()` with `status = coming_soon` */
export const comingSoon: ComingSoonUnit[] = [];

export function getUnitBySlug(slug: string): Unit | undefined {
  return units.find((u) => u.slug === slug);
}

export function getOtherUnits(slug: string): Unit[] {
  return units.filter((u) => u.slug !== slug);
}
