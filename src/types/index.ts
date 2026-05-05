// ─── Shared primitives ────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  content: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}
