// ─── Unit types ───────────────────────────────────────────────────────────────

export interface UnitAmenity {
  id: string;
  label: string;
  icon: string; // lucide icon name
  description?: string;
}

export interface UnitPlan {
  id: string;
  name: string;
  price: number;
  period: "monthly" | "quarterly" | "annual";
  features: string[];
  highlighted?: boolean;
  whatsappText?: string;
}

export interface UnitClassPreview {
  id: string;
  modality: string;
  time: string;
  instructor: string;
  room?: string;
  day: string;
}

export interface UnitDetail {
  slug: string;
  name: string;
  city: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  hours: string[];
  amenities: UnitAmenity[];
  modalityIds: string[];
  gallery: string[];
  plans: UnitPlan[];
  classes: UnitClassPreview[];
  mapQuery: string;
  lat: number;
  lng: number;
}
