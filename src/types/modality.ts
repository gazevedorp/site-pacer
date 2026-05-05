// ─── Modality types ───────────────────────────────────────────────────────────

import type { LucideIcon } from "lucide-react";

export interface ModalityBenefit {
  label: string;
  icon?: string;
}

export interface Modality {
  id: string;
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Hero / cover image */
  image?: string;
  benefits?: ModalityBenefit[];
  /** Average calories burned per hour */
  caloriesAvg?: number;
  /** Recommended for profiles e.g. "Iniciantes", "Atletas", "Idosos" */
  recommendedFor?: string[];
  /** Slugs of units that offer this modality */
  availableUnits?: string[];
}
