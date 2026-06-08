import { CENTRAL_WHATSAPP, buildWhatsAppLink } from "@/data/unitDetail";
import { units } from "@/data/units";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface NetworkPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: "monthly";
  features: string[];
  notIncluded?: string[];
  highlighted?: boolean;
  badge?: string;
  whatsappText: string;
}

export interface UnitSpecificPlan {
  id: string;
  name: string;
  tagline: string;
  priceLabel: string;
  features: string[];
  unitSlugs: string[];
  whatsappText: string;
}

function formatUnitNames(slugs: string[]): string {
  return slugs
    .map((slug) => units.find((u) => u.slug === slug)?.name)
    .filter(Boolean)
    .join(" · ");
}

// ─── Plans ─────────────────────────────────────────────────────────────────────

export const networkPlans: NetworkPlan[] = [
  {
    id: "basic",
    name: "Básico",
    tagline: "Para quem está começando",
    price: 89,
    period: "monthly",
    features: [
      "Musculação e cardio ilimitados",
      "Acesso a 1 unidade de sua escolha",
      "Avaliação física inicial",
      "Professores qualificados na área",
      "Ambiente 100% climatizado",
      "Vestiário completo",
    ],
    notIncluded: [
      "Aulas coletivas",
      "Acesso multi-unidades",
    ],
    whatsappText: `Olá! Tenho interesse no *Plano Básico* da Pacer Academia (R$ 89/mês). Poderia me informar mais detalhes e disponibilidade?`,
  },
  {
    id: "multi",
    name: "Multi",
    tagline: "O mais completo da rede",
    price: 119,
    period: "monthly",
    features: [
      "Musculação e cardio ilimitados",
      "Acesso a todas as 12 unidades",
      "Aulas coletivas inclusas",
      "Hidroginástica inclusa",
      "Avaliação física inicial",
      "Professores qualificados na área",
      "Ambiente 100% climatizado",
      "Vestiário completo",
    ],
    highlighted: true,
    badge: "Mais escolhido",
    whatsappText: `Olá! Tenho interesse no *Plano Multi* da Pacer Academia (R$ 119/mês). Poderia me informar mais detalhes e disponibilidade?`,
  },
  {
    id: "family",
    name: "Família",
    tagline: "Saúde para toda a família",
    price: 199,
    period: "monthly",
    features: [
      "Tudo do Plano Multi",
      "Até 3 dependentes inclusos",
      "Desconto progressivo por dependente",
      "Prioridade em inscrição nas aulas",
      "Natação infantil disponível (Sertãozinho)",
      "Pilates disponível (Galeria Ribeirão)",
    ],
    whatsappText: `Olá! Tenho interesse no *Plano Família* da Pacer Academia (R$ 199/mês). Poderia me informar mais detalhes e disponibilidade?`,
  },
];

export const unitSpecificPlans: UnitSpecificPlan[] = [
  {
    id: "aquatico",
    name: "Setor Aquático",
    tagline: "Hidroginástica em unidades com piscina",
    priceLabel: "Incluso no Multi e Família*",
    features: [
      "Hidroginástica inclusa nos planos Multi e Família",
      "Exercícios aquáticos de baixo impacto",
      "Ideal para todas as idades",
    ],
    unitSlugs: ["sertaozinho-1", "sertaozinho-2"],
    whatsappText:
      "Olá! Gostaria de saber mais sobre o setor aquático e hidroginástica na Pacer Academia.",
  },
  {
    id: "natacao-infantil",
    name: "Natação Infantil",
    tagline: "Escolinha para crianças de 3 a 12 anos",
    priceLabel: "Consulte valores na recepção",
    features: [
      "Aulas em turmas reduzidas",
      "Professores especializados em natação infantil",
      "Desconto para dependentes no Plano Família",
    ],
    unitSlugs: ["sertaozinho-1"],
    whatsappText:
      "Olá! Gostaria de informações sobre natação infantil na Pacer Academia.",
  },
  {
    id: "pilates",
    name: "Pilates",
    tagline: "Studio com equipamentos profissionais",
    priceLabel: "Valor adicional — consulte a recepção",
    features: [
      "Aulas em studio dedicado",
      "Professores certificados",
      "Disponível como complemento ao plano",
    ],
    unitSlugs: ["galeria-ribeirao"],
    whatsappText:
      "Olá! Gostaria de saber valores e horários de Pilates na Pacer Academia Galeria Ribeirão.",
  },
];

export function getUnitSpecificPlanCards() {
  return unitSpecificPlans.map((plan) => ({
    ...plan,
    unitsLabel: `Disponível em: Pacer ${formatUnitNames(plan.unitSlugs)}`,
  }));
}

export { CENTRAL_WHATSAPP, buildWhatsAppLink };
export type { FaqItem } from "./faq";
export { faqItems } from "./faq";
