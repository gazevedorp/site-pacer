import { useSupabaseQuery } from "@/hooks/cms/useSupabaseQuery";
import { fetchAlertaAtivo } from "@/lib/cms/queries/alertas";
import type { Alerta } from "@/types/cms";

export function useAlertaAtivo() {
  return useSupabaseQuery<Alerta | null>(fetchAlertaAtivo, null, []);
}
