import type { GaleriaFotoRow } from "@/lib/supabase/types";
import type { GaleriaImage } from "@/types/cms";
import { getPublicUrl } from "@/lib/supabase/storage";

export function mapGaleriaFoto(row: GaleriaFotoRow): GaleriaImage {
  return {
    src: getPublicUrl("galeria-fotos", row.storage_path),
    alt: row.alt,
    caption: row.caption ?? undefined,
  };
}
