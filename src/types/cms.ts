export type FacilidadeId =
  | "estacionamento"
  | "aulas-coletivas"
  | "hidroginastica"
  | "natacao-infantil"
  | "pilates"
  | "lanchonete"
  | "vestiario"
  | "climatizado";

export type UnidadeStatus = "active" | "coming_soon" | "inactive";

export interface Unidade {
  id: string;
  slug: string;
  name: string;
  city: string;
  address: string;
  hours: string[];
  note?: string;
  whatsapp?: string;
  mapQuery: string;
  lat: number;
  lng: number;
  facilidades: FacilidadeId[];
  modalitySlugs: string[];
  status: UnidadeStatus;
  coverImageUrl: string;
}

export interface Modalidade {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName?: string;
  coverImageUrl: string;
  benefits: string[];
  caloriesAvg?: number;
  recommendedFor: string[];
  unitSlugs: string[];
}

export interface CategoriaPlano {
  id: string;
  slug: string;
  name: string;
  description?: string;
  sortOrder: number;
}

export interface CategoriaComPlanos extends CategoriaPlano {
  planos: Plano[];
}

export interface Plano {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  planType: "terrestre" | "unidade";
  categoriaId?: string;
  price?: number;
  priceLabel?: string;
  period: string;
  features: string[];
  notIncluded: string[];
  whatsappText: string;
  highlighted: boolean;
  badge?: string;
  unitSlugs: string[];
  unitsLabel?: string;
}

export interface PersonalContact {
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
}

export interface Personal {
  id: string;
  slug: string;
  name: string;
  bio: string;
  city: string;
  unitSlugs: string[];
  modalitySlugs: string[];
  credential?: string;
  featured: boolean;
  photoUrl: string;
  contact: PersonalContact;
}

export interface FaqItem {
  id: string;
  slug: string;
  question: string;
  answer: string;
}

export interface GaleriaImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Alerta {
  id: string;
  imagemUrl: string;
}

export interface CmsQueryState<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
