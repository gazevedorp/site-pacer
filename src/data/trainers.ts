/** @deprecated CMS data — use `usePersonais()` */

import type { UnitModalityId } from "@/data/units";
import { buildWhatsAppLink, CENTRAL_WHATSAPP } from "@/lib/whatsapp";

export { buildWhatsAppLink, CENTRAL_WHATSAPP };

export interface Trainer {
  id: string;
  slug: string;
  name: string;
  bio: string;
  city: string;
  unitSlugs: string[];
  modalityIds: UnitModalityId[];
  credential?: string;
  featured: boolean;
  contact: {
    whatsapp: string;
    phone: string;
    email: string;
    instagram: string;
  };
}

export const trainers: Trainer[] = [];
