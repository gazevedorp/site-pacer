import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useFaqs } from "@/hooks/cms/useFaqs";
import { FAQBanner } from "@/components/sections/FAQ/FAQBanner";
import { FAQSection } from "@/components/sections/FAQ/FAQSection";

export default function FAQPage() {
  const { data: faqItems } = useFaqs();

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
