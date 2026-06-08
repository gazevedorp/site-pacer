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
    name: "Mariana",
    title: "Professora de Yoga",
    quote:
      "Entrei como estagiária e hoje coordeno a área de Yoga da unidade centro. A empresa realmente investe em quem quer crescer.",
  },
  {
    name: "Carlos",
    title: "Personal Trainer",
    quote:
      "O ambiente é diferente de tudo que já trabalhei. Os alunos são engajados, a equipe se ajuda e a gestão ouve a gente de verdade.",
  },
  {
    name: "Fernanda",
    title: "Recepcionista",
    quote:
      "Quando me formei em Educação Física, a Pacer foi a primeira empresa que acreditou no meu potencial mesmo sem experiência.",
  },
  {
    name: "Rodrigo",
    title: "Coordenador de Operações",
    quote:
      "O plano de carreira é real. Entrei como assistente e fui promovido duas vezes. Cada meta é clara e o suporte está sempre presente.",
  },
  {
    name: "Juliana",
    title: "Professora de Spinning",
    quote:
      "O acesso gratuito às academias é incrível, mas o que me faz ficar é a cultura. Aqui eu me sinto parte de algo maior.",
  },
  {
    name: "Diego",
    title: "Auxiliar de Limpeza",
    quote:
      "Seis anos e continuo aprendendo. A empresa paga cursos, reconhece o esforço e me trata com respeito todos os dias.",
  },
  {
    name: "Patrícia",
    title: "Professora de Pilates",
    quote:
      "Vim de outra rede e a diferença é enorme. Turmas menores, alunos mais comprometidos e autonomia para criar as minhas aulas.",
  },
  {
    name: "Thiago",
    title: "Personal Trainer",
    quote:
      "Os treinamentos pagos pela empresa me permitiram tirar certificações que eu nunca conseguiria bancar sozinho. Gratidão total.",
  },
];
