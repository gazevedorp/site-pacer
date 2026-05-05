import type { MovingCardItem } from "@/components/ui/infinite-moving-cards";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface Perk {
  id: string;
  icon: string; // lucide icon name — resolved in component
  title: string;
  description: string;
  /** span cols on desktop bento (1 or 2) */
  span?: 1 | 2;
}

export type JobArea =
  | "recepcao"
  | "professor"
  | "personal"
  | "limpeza"
  | "outro";

export interface JobAreaOption {
  value: JobArea;
  label: string;
}

// ─── Perks ─────────────────────────────────────────────────────────────────────

export const perks: Perk[] = [
  {
    id: "career",
    icon: "TrendingUp",
    title: "Plano de Carreira",
    description:
      "Trilha estruturada com metas claras, avaliações semestrais e promoção por mérito. Aqui você sabe exatamente para onde está indo.",
    span: 2,
  },
  {
    id: "environment",
    icon: "Users",
    title: "Ambiente Inspirador",
    description:
      "Equipe jovem, colaborativa e apaixonada por saúde. Trabalhe cercado de pessoas que torcem pelo seu crescimento.",
    span: 1,
  },
  {
    id: "benefits",
    icon: "Gift",
    title: "Benefícios Reais",
    description:
      "Plano de saúde, acesso gratuito às academias da rede, VT, VR e bônus por desempenho.",
    span: 1,
  },
  {
    id: "training",
    icon: "GraduationCap",
    title: "Treinamentos Contínuos",
    description:
      "Cursos, certificações e workshops financiados pela empresa. Seu desenvolvimento é investimento, não custo.",
    span: 2,
  },
];

// ─── Job areas ─────────────────────────────────────────────────────────────────

export const jobAreaOptions: JobAreaOption[] = [
  { value: "recepcao", label: "Recepção" },
  { value: "professor", label: "Professor" },
  { value: "personal", label: "Personal Trainer" },
  { value: "limpeza", label: "Limpeza e Conservação" },
  { value: "outro", label: "Outro" },
];

// ─── Employee testimonials ─────────────────────────────────────────────────────

export const employeeTestimonials: MovingCardItem[] = [
  {
    name: "Mariana Souza",
    title: "Professora de Yoga · 3 anos na Pacer",
    quote:
      "Entrei como estagiária e hoje coordeno a área de Yoga da unidade centro. A empresa realmente investe em quem quer crescer.",
  },
  {
    name: "Carlos Henrique",
    title: "Personal Trainer · 5 anos na Pacer",
    quote:
      "O ambiente é diferente de tudo que já trabalhei. Os alunos são engajados, a equipe se ajuda e a gestão ouve a gente de verdade.",
  },
  {
    name: "Fernanda Lima",
    title: "Recepcionista · 1 ano e meio na Pacer",
    quote:
      "Quando me formei em Educação Física, a Pacer foi a primeira empresa que acreditou no meu potencial mesmo sem experiência.",
  },
  {
    name: "Rodrigo Alves",
    title: "Coordenador de Operações · 4 anos na Pacer",
    quote:
      "O plano de carreira é real. Entrei como assistente e fui promovido duas vezes. Cada meta é clara e o suporte está sempre presente.",
  },
  {
    name: "Juliana Costa",
    title: "Professora de Spinning · 2 anos na Pacer",
    quote:
      "O acesso gratuito às academias é incrível, mas o que me faz ficar é a cultura. Aqui eu me sinto parte de algo maior.",
  },
  {
    name: "Diego Martins",
    title: "Auxiliar de Limpeza · 6 anos na Pacer",
    quote:
      "Seis anos e continuo aprendendo. A empresa paga cursos, reconhece o esforço e me trata com respeito todos os dias.",
  },
  {
    name: "Patrícia Nunes",
    title: "Professora de Pilates · 3 anos na Pacer",
    quote:
      "Vim de outra rede e a diferença é enorme. Turmas menores, alunos mais comprometidos e autonomia para criar as minhas aulas.",
  },
  {
    name: "Thiago Ramos",
    title: "Personal Trainer · 2 anos na Pacer",
    quote:
      "Os treinamentos pagos pela empresa me permitiram tirar certificações que eu nunca conseguiria bancar sozinho. Gratidão total.",
  },
];
