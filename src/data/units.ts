export interface Unit {
  name: string;
  slug: string;
  city: string;
  address: string;
  hours: string;
  note?: string;
  whatsapp?: string;
  mapQuery: string;
}

export interface ComingSoonUnit {
  name: string;
  slug: string;
  city: string;
  address: string;
}

export const units: Unit[] = [
  {
    name: "Bonfim 1",
    slug: "bonfim-1",
    city: "Bonfim Paulista – SP",
    address: "Rua Odila Rosa da Silva Vianna, 535",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    mapQuery: "Rua Odila Rosa da Silva Vianna, 535, Bonfim Paulista, SP",
  },
  {
    name: "Café",
    slug: "cafe",
    city: "Ribeirão Preto – SP",
    address: "Av. do Café, 2429 – Vila Amélia",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    note: "Sem aulas coletivas",
    mapQuery: "Av. do Café, 2429, Vila Amélia, Ribeirão Preto, SP",
  },
  {
    name: "Fiusa",
    slug: "fiusa",
    city: "Ribeirão Preto – SP",
    address: "Av. Wladimir Meirelles Ferreira, 1900 – 2º andar, Fiusa Center",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    mapQuery:
      "Av. Wladimir Meirelles Ferreira, 1900, Fiusa Center, Ribeirão Preto, SP",
  },
  {
    name: "Galeria Ribeirão",
    slug: "galeria-ribeirao",
    city: "Ribeirão Preto – SP",
    address: "Av. Antonio e Helena Zerrener, 1500 – Sumarezinho",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    note: "Pilates disponível",
    mapQuery:
      "Av. Antonio e Helena Zerrener, 1500, Sumarezinho, Ribeirão Preto, SP",
  },
  {
    name: "Greenville",
    slug: "greenville",
    city: "Ribeirão Preto – SP",
    address: "Rua Sargento Rogério Antônio Maglia, 50",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    mapQuery:
      "Rua Sargento Rogério Antônio Maglia, 50, Ribeirão Preto, SP",
  },
  {
    name: "Mirante Sul",
    slug: "mirante-sul",
    city: "Ribeirão Preto – SP",
    address: "Av. Heráclito Fontoura Sobral Pinto, 1175 – Plaza Mirante Sul",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    mapQuery:
      "Av. Heráclito Fontoura Sobral Pinto, 1175, Plaza Mirante Sul, Ribeirão Preto, SP",
  },
  {
    name: "Nova Aliança Sul",
    slug: "nova-alianca-sul",
    city: "Ribeirão Preto – SP",
    address: "Rua Manoel Lopes Velludo, 55 – Jd. Nova Aliança Sul",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    mapQuery:
      "Rua Manoel Lopes Velludo, 55, Jd. Nova Aliança Sul, Ribeirão Preto, SP",
  },
  {
    name: "Novo Shopping",
    slug: "novo-shopping",
    city: "Ribeirão Preto – SP",
    address: "Av. Independência – Novo Shopping",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    mapQuery: "Novo Shopping Ribeirão Preto, SP",
  },
  {
    name: "Ribeirânia",
    slug: "ribeirania",
    city: "Ribeirão Preto – SP",
    address: "Av. Leão XIII, 540 – Ribeirânia",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    mapQuery: "Av. Leão XIII, 540, Ribeirânia, Ribeirão Preto, SP",
  },
  {
    name: "Sertãozinho 1",
    slug: "sertaozinho-1",
    city: "Sertãozinho – SP",
    address: "Av. Nossa Senhora Aparecida, 2533 – Conj. Lourenço Domenici",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    note: "Natação infantil e hidroginástica",
    mapQuery:
      "Av. Nossa Senhora Aparecida, 2533, Conj. Lourenço Domenici, Sertãozinho, SP",
  },
  {
    name: "Sertãozinho 2",
    slug: "sertaozinho-2",
    city: "Sertãozinho – SP",
    address: "Av. Beppe Olivare, 210 – Jd. Lopes da Silva",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    note: "Hidroginástica inclusa",
    mapQuery:
      "Av. Beppe Olivare, 210, Jd. Lopes da Silva, Sertãozinho, SP",
  },
  {
    name: "Jardim Paulista",
    slug: "jardim-paulista",
    city: "Ribeirão Preto – SP",
    address: "Rua Henrique Dumont, 1365",
    hours: "Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h",
    mapQuery: "Rua Henrique Dumont, 1365, Ribeirão Preto, SP",
  },
];

export const comingSoon: ComingSoonUnit[] = [
  {
    name: "Sertãozinho 3",
    slug: "sertaozinho-3",
    city: "Sertãozinho – SP",
    address: "Av. Almir Maria Miranda – Jd. Grande Aliança",
  },
  {
    name: "Bonfim 2",
    slug: "bonfim-2",
    city: "Ribeirão Preto – SP",
    address: "Rua Aníbal Vercesi, s/n – Bonfim Paulista",
  },
];

export function getUnitBySlug(slug: string): Unit | undefined {
  return units.find((u) => u.slug === slug);
}

export function getOtherUnits(slug: string): Unit[] {
  return units.filter((u) => u.slug !== slug);
}

export const GOOGLE_MAPS_API_KEY = "AIzaSyBJ_elVHevGbsx4PU1aSy0EkViGLg05LB4";
