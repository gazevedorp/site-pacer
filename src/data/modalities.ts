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

// Re-export canonical type from src/types/modality.ts
export type { Modality } from "@/types/modality";

// Internal interface for the data array (satisfies the full Modality type)
interface ModalityData {
  id: string;
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  caloriesAvg: number;
  recommendedFor: string[];
  availableUnits: string[];
}

export const modalities: ModalityData[] = [
  {
    id: "musculacao",
    slug: "musculacao",
    icon: Dumbbell,
    title: "Musculação",
    description:
      "Aparelhos de alto padrão e modernos especialmente selecionados. Professores à disposição para montar seu treino personalizado.",
    benefits: [
      "Aumento de massa muscular",
      "Melhora da postura",
      "Aceleração do metabolismo",
      "Fortalecimento ósseo",
      "Redução de gordura corporal",
    ],
    caloriesAvg: 350,
    recommendedFor: ["Iniciantes", "Intermediários", "Avançados"],
    availableUnits: [
      "bonfim-1", "cafe", "fiusa", "galeria-ribeirao", "greenville",
      "mirante-sul", "nova-alianca-sul", "novo-shopping", "ribeirania",
      "sertaozinho-1", "sertaozinho-2", "jardim-paulista",
    ],
  },
  {
    id: "funcional",
    slug: "funcional",
    icon: HeartPulse,
    title: "Funcional",
    description:
      "Treinos dinâmicos para queimar calorias, ganhar resistência e transformar seu corpo com acompanhamento profissional.",
    benefits: [
      "Alta queima calórica",
      "Melhora do condicionamento",
      "Ganho de resistência",
      "Trabalho do corpo todo",
      "Variedade de exercícios",
    ],
    caloriesAvg: 500,
    recommendedFor: ["Intermediários", "Avançados", "Quem quer emagrecer"],
    availableUnits: [
      "bonfim-1", "cafe", "fiusa", "galeria-ribeirao", "greenville",
      "mirante-sul", "nova-alianca-sul", "novo-shopping", "ribeirania",
      "sertaozinho-1", "sertaozinho-2", "jardim-paulista",
    ],
  },
  {
    id: "muay-thai",
    slug: "muay-thai",
    icon: Swords,
    title: "Muay Thai",
    description:
      "Aulas de luta para todos os níveis. Melhore seu condicionamento, ganhe confiança e aprenda defesa pessoal.",
    benefits: [
      "Defesa pessoal",
      "Queima intensa de calorias",
      "Disciplina e foco",
      "Condicionamento cardiovascular",
      "Autoconfiança",
    ],
    caloriesAvg: 700,
    recommendedFor: ["Iniciantes", "Intermediários", "Quem quer desafios"],
    availableUnits: [
      "bonfim-1", "fiusa", "greenville",
      "nova-alianca-sul", "ribeirania", "jardim-paulista",
    ],
  },
  {
    id: "zumba-danca",
    slug: "zumba-danca",
    icon: Music,
    title: "Zumba & Dança",
    description:
      "Aulas de ginástica e dança que fazem parte da grade. Queime calorias se divertindo ao som da música.",
    benefits: [
      "Diversão garantida",
      "Coordenação motora",
      "Socialização",
      "Queima calórica moderada",
      "Melhora do ritmo",
    ],
    caloriesAvg: 400,
    recommendedFor: ["Iniciantes", "Todas as idades", "Quem ama dançar"],
    availableUnits: [
      "bonfim-1", "cafe", "fiusa", "galeria-ribeirao", "greenville",
      "mirante-sul", "nova-alianca-sul", "novo-shopping", "ribeirania",
      "sertaozinho-1", "sertaozinho-2", "jardim-paulista",
    ],
  },
  {
    id: "hidroginastica",
    slug: "hidroginastica",
    icon: Waves,
    title: "Hidroginástica",
    description:
      "Inclusa no plano sem custo adicional. Exercícios aquáticos de baixo impacto para todas as idades.",
    benefits: [
      "Baixo impacto nas articulações",
      "Ideal para reabilitação",
      "Melhora da circulação",
      "Inclusa no plano",
      "Para todas as idades",
    ],
    caloriesAvg: 300,
    recommendedFor: ["Idosos", "Gestantes", "Reabilitação", "Todas as idades"],
    availableUnits: ["sertaozinho-1", "sertaozinho-2"],
  },
  {
    id: "natacao-infantil",
    slug: "natacao-infantil",
    icon: Baby,
    title: "Natação Infantil",
    description:
      "Aulas de natação para crianças. Consulte a disponibilidade de vagas diretamente na recepção da unidade.",
    benefits: [
      "Desenvolvimento motor",
      "Segurança na água",
      "Socialização infantil",
      "Disciplina e foco",
      "Saúde respiratória",
    ],
    caloriesAvg: 250,
    recommendedFor: ["Crianças de 3 a 12 anos"],
    availableUnits: ["sertaozinho-1"],
  },
  {
    id: "pilates",
    slug: "pilates",
    icon: PersonStanding,
    title: "Pilates",
    description:
      "Disponível em unidades selecionadas. Equilíbrio entre corpo e mente com professores certificados.",
    benefits: [
      "Fortalecimento do core",
      "Melhora da postura",
      "Flexibilidade",
      "Redução de dores crônicas",
      "Equilíbrio corpo-mente",
    ],
    caloriesAvg: 200,
    recommendedFor: ["Reabilitação", "Gestantes", "Idosos", "Todos os níveis"],
    availableUnits: ["galeria-ribeirao"],
  },
  {
    id: "climatizado",
    slug: "climatizado",
    icon: Snowflake,
    title: "100% Climatizado",
    description:
      "Todas as unidades com ar condicionado. Treine confortavelmente em qualquer clima, o ano inteiro.",
    benefits: [
      "Conforto térmico garantido",
      "Melhor performance no treino",
      "Disponível o ano todo",
      "Todas as unidades",
      "Ambiente agradável",
    ],
    caloriesAvg: 0,
    recommendedFor: ["Todos os alunos"],
    availableUnits: [
      "bonfim-1", "cafe", "fiusa", "galeria-ribeirao", "greenville",
      "mirante-sul", "nova-alianca-sul", "novo-shopping", "ribeirania",
      "sertaozinho-1", "sertaozinho-2", "jardim-paulista",
    ],
  },
];

export function getModalityBySlug(slug: string): ModalityData | undefined {
  return modalities.find((m) => m.slug === slug);
}
