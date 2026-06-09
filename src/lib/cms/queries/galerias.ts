import { supabase } from "@/lib/supabase/client";
import { mapGaleriaFoto } from "@/lib/cms/mappers/galeria";
import type { GaleriaImage } from "@/types/cms";

export async function fetchGaleriaByUnidadeSlug(
  unidadeSlug: string
): Promise<GaleriaImage[]> {
  const { data: unidade, error: uError } = await supabase
    .from("unidades")
    .select("id")
    .eq("slug", unidadeSlug)
    .eq("is_active", true)
    .maybeSingle();

  if (uError) throw uError;
  if (!unidade) return [];

  const { data: galeria, error: gError } = await supabase
    .from("galerias")
    .select("id")
    .eq("unidade_id", unidade.id)
    .eq("is_active", true)
    .maybeSingle();

  if (gError) throw gError;
  if (!galeria) return [];

  const { data: fotos, error: fError } = await supabase
    .from("galeria_fotos")
    .select("*")
    .eq("galeria_id", galeria.id)
    .order("sort_order", { ascending: true });

  if (fError) throw fError;
  return (fotos ?? []).map(mapGaleriaFoto);
}
