import type { FacilidadeId } from "@/types/cms";

export const FACILIDADE_LABELS: Record<FacilidadeId, string> = {
  estacionamento: "Estacionamento",
  "aulas-coletivas": "Aulas Coletivas",
  hidroginastica: "Hidroginástica",
  "natacao-infantil": "Natação Infantil",
  pilates: "Pilates",
  lanchonete: "Lanchonete",
  vestiario: "Vestiário",
  climatizado: "Climatizado",
};

export const ALL_FACILIDADE_IDS = Object.keys(
  FACILIDADE_LABELS
) as FacilidadeId[];
