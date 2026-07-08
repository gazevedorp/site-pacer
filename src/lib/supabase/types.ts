export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type TableDef<
  Row,
  Insert,
  Update = Partial<Insert>,
  Relationships extends readonly unknown[] = [],
> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: Relationships;
};

type ModalidadeUnidadeRelationships = [
  {
    foreignKeyName: "modalidade_unidade_modalidade_id_fkey";
    columns: ["modalidade_id"];
    isOneToOne: false;
    referencedRelation: "modalidades";
    referencedColumns: ["id"];
  },
  {
    foreignKeyName: "modalidade_unidade_unidade_id_fkey";
    columns: ["unidade_id"];
    isOneToOne: false;
    referencedRelation: "unidades";
    referencedColumns: ["id"];
  },
];

type PlanoUnidadeRelationships = [
  {
    foreignKeyName: "plano_unidade_plano_id_fkey";
    columns: ["plano_id"];
    isOneToOne: false;
    referencedRelation: "planos";
    referencedColumns: ["id"];
  },
  {
    foreignKeyName: "plano_unidade_unidade_id_fkey";
    columns: ["unidade_id"];
    isOneToOne: false;
    referencedRelation: "unidades";
    referencedColumns: ["id"];
  },
];

type PersonalUnidadeRelationships = [
  {
    foreignKeyName: "personal_unidade_personal_id_fkey";
    columns: ["personal_id"];
    isOneToOne: false;
    referencedRelation: "personais";
    referencedColumns: ["id"];
  },
  {
    foreignKeyName: "personal_unidade_unidade_id_fkey";
    columns: ["unidade_id"];
    isOneToOne: false;
    referencedRelation: "unidades";
    referencedColumns: ["id"];
  },
];

type PersonalModalidadeRelationships = [
  {
    foreignKeyName: "personal_modalidade_personal_id_fkey";
    columns: ["personal_id"];
    isOneToOne: false;
    referencedRelation: "personais";
    referencedColumns: ["id"];
  },
  {
    foreignKeyName: "personal_modalidade_modalidade_id_fkey";
    columns: ["modalidade_id"];
    isOneToOne: false;
    referencedRelation: "modalidades";
    referencedColumns: ["id"];
  },
];

type GaleriasRelationships = [
  {
    foreignKeyName: "galerias_unidade_id_fkey";
    columns: ["unidade_id"];
    isOneToOne: true;
    referencedRelation: "unidades";
    referencedColumns: ["id"];
  },
];

type GaleriaFotosRelationships = [
  {
    foreignKeyName: "galeria_fotos_galeria_id_fkey";
    columns: ["galeria_id"];
    isOneToOne: false;
    referencedRelation: "galerias";
    referencedColumns: ["id"];
  },
];

type UnidadesRow = {
  id: string;
  slug: string;
  name: string;
  city: string;
  address: string;
  hours: Json;
  note: string | null;
  whatsapp: string | null;
  map_query: string;
  latitude: number;
  longitude: number;
  cover_image_path: string | null;
  facilidades: string[];
  status: "active" | "coming_soon" | "inactive";
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type ModalidadesRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon_name: string | null;
  cover_image_path: string | null;
  benefits: Json;
  calories_avg: number | null;
  recommended_for: string[];
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type CategoriaPlanosRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type PlanosRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  plan_type: "terrestre" | "unidade";
  categoria_id: string | null;
  price: number | null;
  price_label: string | null;
  period: string;
  features: Json;
  not_included: Json;
  whatsapp_text: string | null;
  highlighted: boolean;
  badge: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type PersonaisRow = {
  id: string;
  slug: string;
  name: string;
  bio: string;
  city: string;
  credential: string | null;
  photo_path: string | null;
  featured: boolean;
  whatsapp: string | null;
  phone: string | null;
  email: string | null;
  instagram: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type FaqsRow = {
  id: string;
  slug: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type GaleriasRow = {
  id: string;
  unidade_id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type GaleriaFotosRow = {
  id: string;
  galeria_id: string;
  storage_path: string;
  alt: string;
  caption: string | null;
  sort_order: number;
  is_cover: boolean;
  created_at: string;
};

type AlertasRow = {
  id: string;
  imagem_path: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
};

type ContatosRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

type CandidaturasRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  curriculo_path: string;
  status: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      unidades: TableDef<
        UnidadesRow,
        Omit<UnidadesRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        }
      >;
      modalidades: TableDef<
        ModalidadesRow,
        Omit<ModalidadesRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        }
      >;
      modalidade_unidade: TableDef<
        { modalidade_id: string; unidade_id: string },
        { modalidade_id: string; unidade_id: string },
        Partial<{ modalidade_id: string; unidade_id: string }>,
        ModalidadeUnidadeRelationships
      >;
      categoria_planos: TableDef<
        CategoriaPlanosRow,
        Omit<CategoriaPlanosRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        }
      >;
      planos: TableDef<
        PlanosRow,
        Omit<PlanosRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        }
      >;
      plano_unidade: TableDef<
        { plano_id: string; unidade_id: string },
        { plano_id: string; unidade_id: string },
        Partial<{ plano_id: string; unidade_id: string }>,
        PlanoUnidadeRelationships
      >;
      personais: TableDef<
        PersonaisRow,
        Omit<PersonaisRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        }
      >;
      personal_unidade: TableDef<
        { personal_id: string; unidade_id: string },
        { personal_id: string; unidade_id: string },
        Partial<{ personal_id: string; unidade_id: string }>,
        PersonalUnidadeRelationships
      >;
      personal_modalidade: TableDef<
        { personal_id: string; modalidade_id: string },
        { personal_id: string; modalidade_id: string },
        Partial<{ personal_id: string; modalidade_id: string }>,
        PersonalModalidadeRelationships
      >;
      faqs: TableDef<
        FaqsRow,
        Omit<FaqsRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        }
      >;
      galerias: TableDef<
        GaleriasRow,
        Omit<GaleriasRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        },
        Partial<
          Omit<GaleriasRow, "id" | "created_at" | "updated_at"> & {
            id?: string;
            created_at?: string;
            updated_at?: string;
          }
        >,
        GaleriasRelationships
      >;
      galeria_fotos: TableDef<
        GaleriaFotosRow,
        Omit<GaleriaFotosRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        },
        Partial<
          Omit<GaleriaFotosRow, "id" | "created_at"> & {
            id?: string;
            created_at?: string;
          }
        >,
        GaleriaFotosRelationships
      >;
      alertas: TableDef<
        AlertasRow,
        Omit<AlertasRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        }
      >;
      contatos: TableDef<
        ContatosRow,
        Omit<ContatosRow, "id" | "created_at" | "status"> & {
          id?: string;
          status?: string;
          created_at?: string;
        }
      >;
      candidaturas: TableDef<
        CandidaturasRow,
        Omit<CandidaturasRow, "id" | "created_at" | "status"> & {
          id?: string;
          status?: string;
          created_at?: string;
        }
      >;
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

export type UnidadeRow = UnidadesRow;
export type ModalidadeRow = ModalidadesRow;
export type CategoriaPlanoRow = CategoriaPlanosRow;
export type PlanoRow = PlanosRow;
export type PersonalRow = PersonaisRow;
export type FaqRow = FaqsRow;
export type GaleriaFotoRow = GaleriaFotosRow;
export type AlertaRow = AlertasRow;
