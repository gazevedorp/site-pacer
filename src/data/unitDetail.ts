import type { UnitClassPreview, UnitPlan } from "@/types/unit";
import type { Unit } from "@/data/units";
import gymCover from "@/assets/images/gym.png";

// ─── Gallery ──────────────────────────────────────────────────────────────────

export interface UnitGalleryImage {
  src: string;
  alt: string;
}

const GALLERY_POOL: Omit<UnitGalleryImage, "alt">[] = [
  { src: gymCover },
  { src: "/fundo-section.jpeg" },
  { src: "/fundo-section-2.jpeg" },
  { src: gymCover },
  { src: "/fundo-section.jpeg" },
];

const GALLERY_CAPTIONS = [
  "Área de musculação",
  "Ambiente climatizado",
  "Espaço de treino",
  "Equipamentos de alto padrão",
  "Recepção e área comum",
] as const;

export function getUnitGallery(slug: string, unitName: string): UnitGalleryImage[] {
  let offset = 0;
  for (let i = 0; i < slug.length; i++) {
    offset = (offset * 31 + slug.charCodeAt(i)) | 0;
  }
  offset = Math.abs(offset) % GALLERY_POOL.length;

  return GALLERY_POOL.map((item, i) => {
    const caption = GALLERY_CAPTIONS[(i + offset) % GALLERY_CAPTIONS.length];
    return {
      src: item.src,
      alt: `${caption} — Pacer ${unitName}`,
    };
  });
}

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

export const CENTRAL_WHATSAPP = "5516957820040";

export function buildWhatsAppLink(text: string, number = CENTRAL_WHATSAPP): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

// ─── Plans ────────────────────────────────────────────────────────────────────

export function getUnitPlans(unit: Unit): UnitPlan[] {
  const unitName = `Pacer Academia ${unit.name}`;
  return [
    {
      id: "basic",
      name: "Básico",
      price: 89,
      period: "monthly",
      features: [
        "Musculação e cardio",
        `Acesso à unidade ${unit.name}`,
        "Professores qualificados",
        "Ambiente 100% climatizado",
      ],
      whatsappText: `Olá! Tenho interesse no Plano Básico da ${unitName}. Poderia me informar mais detalhes?`,
    },
    {
      id: "multi",
      name: "Multi Unidades",
      price: 119,
      period: "monthly",
      features: [
        "Musculação e cardio",
        "Acesso a todas as unidades",
        "Aulas coletivas inclusas",
        "Hidroginástica inclusa",
        "Professores qualificados",
      ],
      highlighted: true,
      whatsappText: `Olá! Tenho interesse no Plano Multi Unidades da ${unitName}. Poderia me informar mais detalhes?`,
    },
    {
      id: "family",
      name: "Família",
      price: 199,
      period: "monthly",
      features: [
        "Tudo do Multi Unidades",
        "Até 3 dependentes",
        "Desconto progressivo",
        "Prioridade em aulas coletivas",
      ],
      whatsappText: `Olá! Tenho interesse no Plano Família da ${unitName}. Poderia me informar mais detalhes?`,
    },
  ];
}

// ─── Schedule ─────────────────────────────────────────────────────────────────

const DAY_NAMES = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
] as const;

export function getTodayName(): string {
  return DAY_NAMES[new Date().getDay()];
}

const BASE_SCHEDULE: UnitClassPreview[] = [
  { id: "b1", time: "05:30", modality: "Funcional", instructor: "Ana Lima", day: "hoje" },
  { id: "b2", time: "07:00", modality: "Musculação", instructor: "Carlos Moura", day: "hoje" },
  { id: "b3", time: "08:30", modality: "Zumba & Dança", instructor: "Juliana Neves", room: "Sala 1", day: "hoje" },
  { id: "b4", time: "12:00", modality: "Funcional", instructor: "Rafael Souza", room: "Sala 2", day: "hoje" },
  { id: "b5", time: "17:00", modality: "Muay Thai", instructor: "Bruno Castro", room: "Tatame", day: "hoje" },
  { id: "b6", time: "18:30", modality: "Zumba & Dança", instructor: "Fernanda Reis", day: "hoje" },
  { id: "b7", time: "19:30", modality: "Funcional", instructor: "Ana Lima", room: "Sala 1", day: "hoje" },
  { id: "b8", time: "20:30", modality: "Musculação", instructor: "Marcos Alves", day: "hoje" },
];

const PILATES_EXTRA: UnitClassPreview[] = [
  { id: "p1", time: "08:00", modality: "Pilates", instructor: "Patrícia Melo", room: "Studio Pilates", day: "hoje" },
  { id: "p2", time: "10:00", modality: "Pilates", instructor: "Patrícia Melo", room: "Studio Pilates", day: "hoje" },
  { id: "p3", time: "14:00", modality: "Pilates", instructor: "Diana Costa", room: "Studio Pilates", day: "hoje" },
];

const AQUA_EXTRA: UnitClassPreview[] = [
  { id: "a1", time: "07:00", modality: "Hidroginástica", instructor: "Prof. Renata", room: "Piscina", day: "hoje" },
  { id: "a2", time: "09:00", modality: "Natação Infantil", instructor: "Prof. Eduardo", room: "Piscina", day: "hoje" },
  { id: "a3", time: "10:30", modality: "Natação Infantil", instructor: "Prof. Eduardo", room: "Piscina", day: "hoje" },
  { id: "a4", time: "17:30", modality: "Hidroginástica", instructor: "Prof. Cláudia", room: "Piscina", day: "hoje" },
  { id: "a5", time: "19:00", modality: "Hidroginástica", instructor: "Prof. Cláudia", room: "Piscina", day: "hoje" },
];

const UNIT_SCHEDULE_OVERRIDES: Record<string, UnitClassPreview[]> = {
  "galeria-ribeirao": [
    ...BASE_SCHEDULE.slice(0, 3),
    ...PILATES_EXTRA,
    ...BASE_SCHEDULE.slice(3),
  ],
  "sertaozinho-1": [
    ...BASE_SCHEDULE.slice(0, 2),
    ...AQUA_EXTRA,
    ...BASE_SCHEDULE.slice(2),
  ],
  "sertaozinho-2": [
    ...BASE_SCHEDULE.slice(0, 2),
    ...AQUA_EXTRA.filter((c) => c.modality === "Hidroginástica"),
    ...BASE_SCHEDULE.slice(2),
  ],
};

export function getUnitClasses(slug: string): UnitClassPreview[] {
  const pool = UNIT_SCHEDULE_OVERRIDES[slug] ?? BASE_SCHEDULE;
  return [...pool]
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 6);
}
