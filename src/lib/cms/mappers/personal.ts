import type { PersonalRow } from "@/lib/supabase/types";
import type { Personal, PersonalContact } from "@/types/cms";
import { getPublicUrl } from "@/lib/supabase/storage";
import { CENTRAL_WHATSAPP } from "@/lib/whatsapp";

function slugToEmailLocal(slug: string): string {
  return slug.replace(/-/g, ".");
}

function buildDefaultContact(slug: string): PersonalContact {
  return {
    whatsapp: CENTRAL_WHATSAPP,
    phone: "(16) 95782-0040",
    email: `${slugToEmailLocal(slug)}@paceracademia.com.br`,
    instagram: "paceracademia",
  };
}

export function mapPersonal(
  row: PersonalRow,
  unitSlugs: string[] = [],
  modalitySlugs: string[] = []
): Personal {
  const defaults = buildDefaultContact(row.slug);

  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    bio: row.bio,
    city: row.city,
    unitSlugs,
    modalitySlugs,
    credential: row.credential ?? undefined,
    featured: row.featured,
    photoUrl: getPublicUrl("personais", row.photo_path),
    contact: {
      whatsapp: row.whatsapp ?? defaults.whatsapp,
      phone: row.phone ?? defaults.phone,
      email: row.email ?? defaults.email,
      instagram: row.instagram ?? defaults.instagram,
    },
  };
}
