import { useSeoMeta } from "@/hooks/useSeoMeta";
import { networkPlans } from "@/data/plans";
import { PlansBanner } from "@/components/sections/Plans/PlansBanner";
import { PlansShowcase } from "@/components/sections/Plans/PlansShowcase";
import { PlansUnitExtras } from "@/components/sections/Plans/PlansUnitExtras";

const plansJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Planos Pacer Academia",
  url: "https://paceracademia.com.br/planos",
  itemListElement: networkPlans.map((plan, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: plan.name,
    description: plan.tagline,
  })),
});

export default function PlansPage() {
  useSeoMeta({
    title: "Planos e Preços | Pacer Academia — Ribeirão e região",
    description:
      "Conheça os planos da Pacer Academia: Básico, Multi e Família. Sem fidelidade, sem surpresas. Acesse qualquer uma das 12 unidades em Ribeirão e região.",
    jsonLd: plansJsonLd,
  });

  return (
    <main>
      <PlansBanner />
      <PlansShowcase />
      <PlansUnitExtras />
    </main>
  );
}
