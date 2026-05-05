import type { UnitModalityId } from "@/data/units";

// ─── Type ─────────────────────────────────────────────────────────────────────

export interface Trainer {
  id: string;
  name: string;
  /** 1-2 sentence professional bio */
  bio: string;
  /** Slugs of units where this trainer operates */
  unitSlugs: string[];
  /** Primary city (for city filter) */
  city: string;
  /** Modalities taught */
  modalityIds: UnitModalityId[];
  /** Optional extra credential / tagline */
  credential?: string;
  featured?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const trainers: Trainer[] = [
  {
    id: "carlos-moura",
    name: "Carlos Moura",
    bio: "Personal trainer com 8 anos de experiência em musculação e hipertrofia. Especialista em treinos para iniciantes e atletas intermediários.",
    unitSlugs: ["bonfim-1", "greenville"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["musculacao", "funcional"],
    credential: "CREF 123456-G/SP",
    featured: true,
  },
  {
    id: "ana-lima",
    name: "Ana Lima",
    bio: "Professora de funcional e condicionamento físico com foco em emagrecimento e saúde. Formada em Ed. Física pela USP-RP.",
    unitSlugs: ["fiusa", "galeria-ribeirao"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["funcional", "danca"],
    credential: "CREF 234567-G/SP",
    featured: true,
  },
  {
    id: "bruno-castro",
    name: "Bruno Castro",
    bio: "Faixa preta de Muay Thai com 12 anos de prática. Aulas para todos os níveis — do iniciante ao competidor.",
    unitSlugs: ["nova-alianca-sul", "ribeirania"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["muay-thai", "funcional"],
    credential: "CREF 345678-G/SP",
  },
  {
    id: "juliana-neves",
    name: "Juliana Neves",
    bio: "Professora de Zumba certificada pelo ZIN. Transforma cada aula em uma experiência de bem-estar e alegria.",
    unitSlugs: ["fiusa", "mirante-sul", "novo-shopping"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["zumba", "danca"],
    credential: "ZIN Member #78901",
  },
  {
    id: "patricia-melo",
    name: "Patrícia Melo",
    bio: "Fisioterapeuta e instrutora de Pilates certificada pelo Stott Pilates. Atua com reabilitação, gestantes e prevenção de lesões.",
    unitSlugs: ["galeria-ribeirao"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["pilates"],
    credential: "CREFITO 5/12345-F",
    featured: true,
  },
  {
    id: "marcos-alves",
    name: "Marcos Alves",
    bio: "Especialista em musculação com ênfase em força e powerlifting. Acompanhou mais de 500 alunos em suas transformações.",
    unitSlugs: ["bonfim-1", "jardim-paulista"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["musculacao"],
    credential: "CREF 456789-G/SP",
  },
  {
    id: "rafael-souza",
    name: "Rafael Souza",
    bio: "Personal trainer especializado em emagrecimento funcional e HIIT. Metodologia baseada em evidências científicas.",
    unitSlugs: ["mirante-sul", "nova-alianca-sul"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["funcional", "musculacao"],
    credential: "CREF 567890-G/SP",
  },
  {
    id: "fernanda-reis",
    name: "Fernanda Reis",
    bio: "Professora de dança e Zumba com formação em Ballet e Jazz. Cria atmosferas únicas em cada aula coletiva.",
    unitSlugs: ["novo-shopping", "ribeirania", "galeria-ribeirao"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["danca", "zumba"],
    credential: "CREF 678901-G/SP",
  },
  {
    id: "renata-dias",
    name: "Renata Dias",
    bio: "Professora de Hidroginástica com especialização em gerontologia. Atende idosos e gestantes com total segurança.",
    unitSlugs: ["sertaozinho-1", "sertaozinho-2"],
    city: "Sertãozinho – SP",
    modalityIds: ["hidroginastica"],
    credential: "CREF 789012-G/SP",
    featured: true,
  },
  {
    id: "eduardo-matos",
    name: "Eduardo Matos",
    bio: "Treinador de natação infantil com 6 anos de experiência em escolinha. Metodologia lúdica e segura para crianças de 3 a 12 anos.",
    unitSlugs: ["sertaozinho-1"],
    city: "Sertãozinho – SP",
    modalityIds: ["natacao", "hidroginastica"],
    credential: "CREF 890123-G/SP",
  },
  {
    id: "diego-oliveira",
    name: "Diego Oliveira",
    bio: "Lutador profissional de Muay Thai e instrutor certificado. Técnica refinada aliada a uma didática acessível para todos.",
    unitSlugs: ["bonfim-1", "nova-alianca-sul"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["muay-thai"],
    credential: "CREF 901234-G/SP",
  },
  {
    id: "camila-torres",
    name: "Camila Torres",
    bio: "Personal trainer focada em saúde feminina e emagrecimento. Mãe de 2 filhos e apaixonada por transformar vidas.",
    unitSlugs: ["cafe", "jardim-paulista"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["funcional", "musculacao"],
    credential: "CREF 012345-G/SP",
  },
  {
    id: "lucas-ferreira",
    name: "Lucas Ferreira",
    bio: "Especialista em treinamento para terceira idade e reabilitação física. Abordagem gentil e progressiva.",
    unitSlugs: ["sertaozinho-1", "sertaozinho-2"],
    city: "Sertãozinho – SP",
    modalityIds: ["musculacao", "funcional"],
    credential: "CREF 112345-G/SP",
  },
  {
    id: "diana-costa",
    name: "Diana Costa",
    bio: "Instrutora de Pilates com pós-graduação em biomecânica. Trabalha com atletas e pacientes em processo de reabilitação.",
    unitSlugs: ["galeria-ribeirao"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["pilates"],
    credential: "CREFITO 5/23456-F",
  },
  {
    id: "paulo-mendes",
    name: "Paulo Mendes",
    bio: "Personal trainer e ex-atleta de artes marciais. Treinos de alta intensidade combinando lutas e condicionamento.",
    unitSlugs: ["greenville", "ribeirania"],
    city: "Ribeirão Preto – SP",
    modalityIds: ["muay-thai", "funcional"],
    credential: "CREF 213456-G/SP",
  },
];

// ─── Derived city options ─────────────────────────────────────────────────────

export const TRAINER_CITIES = Array.from(
  new Set(trainers.map((t) => t.city))
).sort();

// ─── Filter helper ────────────────────────────────────────────────────────────

export function getFilteredTrainers({
  city,
  unitSlug,
  modalityId,
}: {
  city?: string;
  unitSlug?: string;
  modalityId?: string;
}): Trainer[] {
  return trainers.filter((t) => {
    if (city && t.city !== city) return false;
    if (unitSlug && !t.unitSlugs.includes(unitSlug)) return false;
    if (modalityId && !t.modalityIds.includes(modalityId as UnitModalityId))
      return false;
    return true;
  });
}
