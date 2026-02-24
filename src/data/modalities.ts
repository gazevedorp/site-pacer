import type { LucideIcon } from "lucide-react";
import {
  Dumbbell,
  HeartPulse,
  Waves,
  Swords,
  PersonStanding,
  Music,
  Snowflake,
  Baby,
} from "lucide-react";

export interface Modality {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const modalities: Modality[] = [
  {
    icon: Dumbbell,
    title: "Musculação",
    description:
      "Aparelhos de alto padrão e modernos especialmente selecionados. Professores à disposição para montar seu treino personalizado.",
  },
  {
    icon: HeartPulse,
    title: "Funcional",
    description:
      "Treinos dinâmicos para queimar calorias, ganhar resistência e transformar seu corpo com acompanhamento profissional.",
  },
  {
    icon: Swords,
    title: "Muay Thai",
    description:
      "Aulas de luta para todos os níveis. Melhore seu condicionamento, ganhe confiança e aprenda defesa pessoal.",
  },
  {
    icon: Music,
    title: "Zumba & Dança",
    description:
      "Aulas de ginástica e dança que fazem parte da grade. Queime calorias se divertindo ao som da música.",
  },
  {
    icon: Waves,
    title: "Hidroginástica",
    description:
      "Inclusa no plano sem custo adicional. Exercícios aquáticos de baixo impacto para todas as idades.",
  },
  {
    icon: Baby,
    title: "Natação Infantil",
    description:
      "Aulas de natação para crianças. Consulte a disponibilidade de vagas diretamente na recepção da unidade.",
  },
  {
    icon: PersonStanding,
    title: "Pilates",
    description:
      "Disponível em unidades selecionadas. Equilíbrio entre corpo e mente com professores certificados.",
  },
  {
    icon: Snowflake,
    title: "100% Climatizado",
    description:
      "Todas as unidades com ar condicionado. Treine confortavelmente em qualquer clima, o ano inteiro.",
  },
];
