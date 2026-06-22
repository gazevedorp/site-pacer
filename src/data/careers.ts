import type { MovingCardItem } from "@/components/ui/infinite-moving-cards";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface Perk {
  id: string;
  title: string;
  description: string;
  /** span cols on desktop bento (1 or 2) */
  span?: 1 | 2;
}

export type JobArea =
  | "recepcao"
  | "professor-musculacao"
  | "professor-coletivas"
  | "professor-natacao"
  | "estagiario-musculacao"
  | "estagiario-coletivas"
  | "estagiario-natacao"
  | "cargos-administrativos"
  | "outro";

export interface JobAreaOption {
  value: JobArea;
  label: string;
}

// ─── Perks ─────────────────────────────────────────────────────────────────────

export const perks: Perk[] = [
  {
    id: "career",
    title: "Plano de Carreira",
    description:
      "Trilha estruturada com metas claras, avaliações semestrais e promoção por mérito. Aqui você sabe exatamente para onde está indo.",
    span: 2,
  },
  {
    id: "environment",
    title: "Ambiente Inspirador",
    description:
      "Equipe jovem, colaborativa e apaixonada por saúde. Trabalhe cercado de pessoas que torcem pelo seu crescimento.",
    span: 1,
  },
  {
    id: "benefits",
    title: "Benefícios Reais",
    description:
      "Plano de saúde, acesso gratuito às academias da rede, VT, VR e bônus por desempenho.",
    span: 1,
  },
  {
    id: "training",
    title: "Treinamentos Contínuos",
    description:
      "Cursos, certificações e workshops financiados pela empresa. Seu desenvolvimento é investimento, não custo.",
    span: 2,
  },
  {
    id: "personal-fee",
    title: "Isenção da taxa de personal",
    description:
      "Pode dar aula em todas as unidades da rede, sem pagar taxa de personal.",
    span: 1,
  },
];

// ─── Job areas ─────────────────────────────────────────────────────────────────

export const jobAreaOptions: JobAreaOption[] = [
  { value: "recepcao", label: "Recepção" },
  { value: "professor-musculacao", label: "Professor de Musculação" },
  { value: "professor-coletivas", label: "Professor de Coletivas" },
  { value: "professor-natacao", label: "Professor de Natação" },
  { value: "estagiario-musculacao", label: "Estagiário de Musculação" },
  { value: "estagiario-coletivas", label: "Estagiários de Coletivas" },
  { value: "estagiario-natacao", label: "Estagiário de Natação" },
  { value: "cargos-administrativos", label: "Cargos Administrativos" },
  { value: "outro", label: "Outro" },
];

// ─── Employee testimonials ─────────────────────────────────────────────────────

export const employeeTestimonials: MovingCardItem[] = [
  {
    name: "Bruna",
    title: "Recepção",
    quote:
      "Minha trajetória na Pacer é marcada por aprendizado, desafios e crescimento constante. Iniciei minha jornada como recepcionista e tive a oportunidade de evoluir profissionalmente até assumir uma posição de liderança.\n\nAo longo desses 2 anos, cresci não apenas como profissional, mas também como pessoa. As conexões construídas, as trocas diárias e o apoio de pessoas que incentivam o desenvolvimento tornam essa experiência ainda mais especial.\n\nTenho orgulho de fazer parte de uma empresa que acredita em seus colaboradores, valoriza talentos e proporciona oportunidades para crescermos juntos.",
  },
  {
    name: "Bruno",
    title: "Líder",
    quote:
      "Entrei na Pacer em 2023, no meu primeiro emprego registrado, iniciando minha trajetória como recepcionista. Com dedicação e aprendizado constante, tive a oportunidade de crescer profissionalmente e assumir uma posição de liderança.\n\nAo longo dessa jornada, enfrentei desafios que contribuíram para o meu desenvolvimento e fortaleceram minha confiança. O ambiente acolhedor e as oportunidades de crescimento são fatores que me motivam diariamente. Tenho muito orgulho da minha trajetória e de fazer parte da história da Pacer.",
  },
  {
    name: "Gabrielly",
    title: "Líder",
    quote:
      "Minha trajetória na Pacer começou há 9 anos e, desde então, tenho vivido uma jornada de muito aprendizado, crescimento e desenvolvimento.\n\nCom dedicação e paixão pelo que faço, tive a oportunidade de evoluir profissionalmente e hoje atuo como Líder de Unidade com muito orgulho.\n\nA Pacer contribuiu significativamente para meu desenvolvimento pessoal e profissional, ensinando valores como liderança, trabalho em equipe e cuidado com as pessoas. Sou grata por fazer parte dessa história e contribuir diariamente para um ambiente acolhedor e inspirador.",
  },
  {
    name: "Gabriel",
    title: "Recepção",
    quote:
      "Minha trajetória na Pacer começou em um momento de transformação pessoal e profissional. Mesmo vindo de uma área diferente, encontrei na empresa a oportunidade de desenvolver novas habilidades, crescer e construir conexões genuínas.\n\nAo longo dessa jornada, criei grandes amizades e vivi experiências que tornaram o ambiente de trabalho acolhedor e motivador. A Pacer abriu portas que eu nem imaginava serem possíveis e contribuiu significativamente para meu desenvolvimento profissional e humano.\n\nHoje, tenho orgulho de fazer parte dessa história e sigo em constante evolução, buscando crescer cada vez mais como profissional e como pessoa.",
  },
  {
    name: "Luana",
    title: "Financeiro",
    quote:
      "Falar da Pacer é falar sobre crescimento, oportunidades e gratidão. Minha trajetória começou em 2019 e, desde então, vivi uma jornada de muito aprendizado e conquistas.\n\nEnquanto construía minha carreira na empresa, também realizei o sonho de me formar em Direito. Ao longo desse caminho, encontrei pessoas que me incentivaram, apoiaram e contribuíram para o meu desenvolvimento profissional e pessoal.\n\nHoje, tenho orgulho da história que construí e sou grata por fazer parte de uma empresa que valoriza as pessoas e abre portas para novos desafios e conquistas.",
  },
  {
    name: "Mariely",
    title: "Líder",
    quote:
      "Minha história na Pacer começou há 6 anos e desde então, tenho vivido uma trajetória de muito aprendizado, crescimento e superação de desafios.\n\nAo longo desse período, tive a oportunidade de conhecer diferentes áreas, desenvolver novas habilidades e evoluir tanto profissionalmente quanto pessoalmente. O que mais me motiva é trabalhar com pessoas. O dia a dia traz desafios constantes, mas também a satisfação de ver o desenvolvimento da equipe e os resultados construídos juntos.\n\nTenho muito orgulho da minha trajetória na empresa e sou grata por todas as oportunidades!",
  },
  {
    name: "Renata",
    title: "Estagiária Musculação",
    quote:
      "Minha trajetória na Pacer começou como uma oportunidade de aprendizado e crescimento na área da Educação Física, e hoje posso dizer que essa experiência tem sido fundamental para minha formação profissional. Cada atendimento é uma chance de desenvolver não apenas conhecimentos técnicos, mas tbm habilidades como comunicação, empatia e trabalho em equipe. O ambiente de trabalho é acolhedor e a disposição de todos em compartilhar conhecimento. A Pacer me proporciona experiências práticas que complementam minha formação acadêmica e me ajudam a construir a profissional que desejo ser. Sou muito grata por fazer parte dessa equipe e por poder contribuir diariamente para o bem estar e a qualidade de vida das pessoas. Tenho orgulho da minha trajetória na Pacer e de tudo que venho aprendendo ao longo do caminho e que vou ainda aprender.",
  },
];
