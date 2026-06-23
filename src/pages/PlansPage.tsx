import { useSeoMeta } from "@/hooks/useSeoMeta";
import { usePlanosTerrestres } from "@/hooks/cms/usePlanos";
import { PlansBanner } from "@/components/sections/Plans/PlansBanner";
import { PlansShowcase } from "@/components/sections/Plans/PlansShowcase";
import { PlansUnitExtras } from "@/components/sections/Plans/PlansUnitExtras";

export default function PlansPage() {
  const { data: terrestres } = usePlanosTerrestres();

  const plansJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Planos Pacer Academia",
    url: "https://paceracademia.com.br/planos",
    itemListElement: terrestres.map((plan, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: plan.name,
      description: plan.tagline,
    })),
  });

  useSeoMeta({
    title: "Planos e Preços | Pacer Academia — Ribeirão e região",
    description:
      "Conheça os planos da Pacer Academia: Básico, Multi e Família. Sem fidelidade, sem surpresas. Acesse qualquer uma das unidades em Ribeirão Preto e região.",
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
