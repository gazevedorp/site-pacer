// ─── Home page types ──────────────────────────────────────────────────────────

export interface HeroCta {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

export interface PlanCard {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  whatsappText?: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}
