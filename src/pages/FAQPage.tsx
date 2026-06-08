import { useSeoMeta } from "@/hooks/useSeoMeta";
import { faqItems } from "@/data/faq";
import { FAQBanner } from "@/components/sections/FAQ/FAQBanner";
import { FAQSection } from "@/components/sections/FAQ/FAQSection";

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

export default function FAQPage() {
  useSeoMeta({
    title: "FAQ | Pacer Academia — Ribeirão e região",
    description:
      "Tire suas dúvidas sobre planos, matrícula, aulas coletivas, cancelamento e muito mais na Pacer Academia.",
    jsonLd: faqJsonLd,
  });

  return (
    <main>
      <FAQBanner />
      <FAQSection showHeading={false} />
    </main>
  );
}
