import type { PlanCard } from "@/types/home";
import { CENTRAL_WHATSAPP } from "./unitDetail";

export const homePlans: PlanCard[] = [
  {
    id: "basic",
    name: "Básico",
    price: 89,
    period: "mês",
    features: [
      "Musculação e cardio",
      "Acesso a 1 unidade",
      "Professores qualificados",
      "Ambiente 100% climatizado",
    ],
    whatsappText:
      "Olá! Tenho interesse no Plano Básico da Pacer Academia. Poderia me informar mais detalhes?",
  },
  {
    id: "multi",
    name: "Multi Unidades",
    price: 119,
    period: "mês",
    features: [
      "Musculação e cardio",
      "Acesso a todas as unidades",
      "Aulas coletivas inclusas",
      "Hidroginástica inclusa",
      "Professors qualificados",
    ],
    highlighted: true,
    badge: "Mais escolhido",
    whatsappText:
      "Olá! Tenho interesse no Plano Multi Unidades da Pacer Academia. Poderia me informar mais detalhes?",
  },
  {
    id: "familia",
    name: "Família",
    price: 199,
    period: "mês",
    features: [
      "Até 3 dependentes",
      "Acesso a todas as unidades",
      "Aulas coletivas inclusas",
      "Hidroginástica inclusa",
      "Natação infantil com desconto",
    ],
    whatsappText:
      "Olá! Tenho interesse no Plano Família da Pacer Academia. Poderia me informar mais detalhes?",
  },
];

export const whatsappNumber = CENTRAL_WHATSAPP;
