/** @deprecated CMS data — use `useModalidades()` */

export interface Modality {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  recommendedFor: string[];
  caloriesAvg?: number;
}

export const modalities: Modality[] = [];
