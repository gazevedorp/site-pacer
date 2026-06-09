import { supabase } from "@/lib/supabase/client";
import { getPublicUrl } from "@/lib/supabase/storage";
import type { Alerta } from "@/types/cms";

export async function fetchAlertaAtivo(): Promise<Alerta | null> {
  const { data, error } = await supabase
    .from("alertas")
    .select("*")
    .eq("ativo", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    imagemUrl: getPublicUrl("alertas", data.imagem_path),
  };
}
