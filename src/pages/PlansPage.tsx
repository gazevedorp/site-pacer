import { useSeoMeta } from "@/hooks/useSeoMeta";
import { faqItems, networkPlans } from "@/data/plans";
import { PlansBanner } from "@/components/sections/Plans/PlansBanner";
import { PlansShowcase } from "@/components/sections/Plans/PlansShowcase";
import { PlansFAQ } from "@/components/sections/Plans/PlansFAQ";

// ─── FAQ JSON-LD ──────────────────────────────────────────────────────────────

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlansPage() {
  useSeoMeta({
    title: "Planos e Preços | Pacer Academia — Ribeirão Preto e Sertãozinho",
    description:
      "Conheça os planos da Pacer Academia: Básico, Multi e Família. Sem fidelidade, sem surpresas. Acesse qualquer uma das 12 unidades em Ribeirão Preto e Sertãozinho.",
    jsonLd: `[${faqJsonLd},${plansJsonLd}]`,
  });

  return (
    <main>
      <PlansBanner />
      <PlansShowcase />
      <PlansFAQ />
    </main>
  );
}
