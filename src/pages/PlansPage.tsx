import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useCategoriasComPlanos } from "@/hooks/cms/useCategoriaPlanos";
import { PlansBanner } from "@/components/sections/Plans/PlansBanner";
import { PlansCategories } from "@/components/sections/Plans/PlansCategories";
import { SITE_URL } from "@/config/site";

export default function PlansPage() {
  const { data: categorias } = useCategoriasComPlanos();

  const allPlans = categorias.flatMap((categoria) => categoria.planos);

  const plansJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Planos Pacer Academia",
    url: `${SITE_URL}/planos`,
    itemListElement: allPlans.map((plan, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: plan.name,
      description: plan.tagline,
    })),
  });

  useSeoMeta({
    title: "Planos e Preços | Pacer Academia — Ribeirão e região",
    description:
      "Conheça os planos da Pacer Academia: Básico, Multi e Família. Acesse qualquer uma das unidades em Ribeirão Preto e região.",
    canonical: "/planos",
    jsonLd: plansJsonLd,
  });

  return (
    <main>
      <PlansBanner />
      <PlansCategories />
    </main>
  );
}
