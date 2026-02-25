export interface Unit {
  name: string;
  slug: string;
  city: string;
  address: string;
  hours: string[];
  note?: string;
  whatsapp?: string;
  mapQuery: string;
  lat: number;
  lng: number;
}

export interface ComingSoonUnit {
  name: string;
  slug: string;
  city: string;
  address: string;
}

export const units: Unit[] = [
  {
    name: "Bonfim I",
    slug: "bonfim-1",
    city: "Bonfim Paulista – SP",
    address: "Rua Odila Rosa da Silva Vianna, 535",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    mapQuery: "Rua Odila Rosa da Silva Vianna, 535, Bonfim Paulista, SP",
    lat: -21.1590,
    lng: -47.8270,
  },
  {
    name: "Café",
    slug: "cafe",
    city: "Ribeirão Preto – SP",
    address: "Av. do Café, 2429 – Vila Amélia",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    note: "Sem aulas coletivas",
    mapQuery: "Av. do Café, 2429, Vila Amélia, Ribeirão Preto, SP",
    lat: -21.2050,
    lng: -47.8190,
  },
  {
    name: "Fiusa",
    slug: "fiusa",
    city: "Ribeirão Preto – SP",
    address: "Av. Wladimir Meirelles Ferreira, 1900 – 2º andar, Fiusa Center",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    mapQuery:
      "Av. Wladimir Meirelles Ferreira, 1900, Fiusa Center, Ribeirão Preto, SP",
    lat: -21.2260,
    lng: -47.8260,
  },
  {
    name: "Galeria Ribeirão",
    slug: "galeria-ribeirao",
    city: "Ribeirão Preto – SP",
    address: "Av. Antonio e Helena Zerrener, 1500 – Sumarezinho",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    note: "Pilates disponível",
    mapQuery:
      "Av. Antonio e Helena Zerrener, 1500, Sumarezinho, Ribeirão Preto, SP",
    lat: -21.1760,
    lng: -47.8360,
  },
  {
    name: "Greenville",
    slug: "greenville",
    city: "Ribeirão Preto – SP",
    address: "Rua Sargento Rogério Antônio Maglia, 50",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    mapQuery:
      "Rua Sargento Rogério Antônio Maglia, 50, Ribeirão Preto, SP",
    lat: -21.2340,
    lng: -47.8120,
  },
  {
    name: "Mirante Sul",
    slug: "mirante-sul",
    city: "Ribeirão Preto – SP",
    address: "Av. Heráclito Fontoura Sobral Pinto, 1175 – Plaza Mirante Sul",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    mapQuery:
      "Av. Heráclito Fontoura Sobral Pinto, 1175, Plaza Mirante Sul, Ribeirão Preto, SP",
    lat: -21.2380,
    lng: -47.7950,
  },
  {
    name: "Nova Aliança Sul",
    slug: "nova-alianca-sul",
    city: "Ribeirão Preto – SP",
    address: "Rua Manoel Lopes Velludo, 55 – Jd. Nova Aliança Sul",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    mapQuery:
      "Rua Manoel Lopes Velludo, 55, Jd. Nova Aliança Sul, Ribeirão Preto, SP",
    lat: -21.2270,
    lng: -47.8350,
  },
  {
    name: "Novo Shopping",
    slug: "novo-shopping",
    city: "Ribeirão Preto – SP",
    address: "Av. Independência – Novo Shopping",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    mapQuery: "Novo Shopping Ribeirão Preto, SP",
    lat: -21.1910,
    lng: -47.7980,
  },
  {
    name: "Ribeirânia",
    slug: "ribeirania",
    city: "Ribeirão Preto – SP",
    address: "Av. Leão XIII, 540 – Ribeirânia",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    mapQuery: "Av. Leão XIII, 540, Ribeirânia, Ribeirão Preto, SP",
    lat: -21.1880,
    lng: -47.7780,
  },
  {
    name: "Sertãozinho I",
    slug: "sertaozinho-1",
    city: "Sertãozinho – SP",
    address: "Av. Nossa Senhora Aparecida, 2533 – Conj. Lourenço Domenici",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    note: "Natação infantil e hidroginástica",
    mapQuery:
      "Av. Nossa Senhora Aparecida, 2533, Conj. Lourenço Domenici, Sertãozinho, SP",
    lat: -21.1340,
    lng: -47.9830,
  },
  {
    name: "Sertãozinho II",
    slug: "sertaozinho-2",
    city: "Sertãozinho – SP",
    address: "Av. Beppe Olivare, 210 – Jd. Lopes da Silva",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    note: "Hidroginástica inclusa",
    mapQuery:
      "Av. Beppe Olivare, 210, Jd. Lopes da Silva, Sertãozinho, SP",
    lat: -21.1290,
    lng: -47.9720,
  },
  {
    name: "Jardim Paulista",
    slug: "jardim-paulista",
    city: "Ribeirão Preto – SP",
    address: "Rua Henrique Dumont, 1365",
    hours: ["Seg a Sex: 05h às 22h", "Sáb, Dom e Feriados: 08h às 13h"],
    mapQuery: "Rua Henrique Dumont, 1365, Ribeirão Preto, SP",
    lat: -21.1910,
    lng: -47.8140,
  },
];

export const comingSoon: ComingSoonUnit[] = [
  {
    name: "Sertãozinho III",
    slug: "sertaozinho-3",
    city: "Sertãozinho – SP",
    address: "Av. Almir Maria Miranda – Jd. Grande Aliança",
  },
  {
    name: "Bonfim II",
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
