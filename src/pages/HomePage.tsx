import { useMemo } from "react";
import { HomeHero } from "@/components/sections/Home/HomeHero";
import { HomeUnitsSearch } from "@/components/sections/Home/HomeUnitsSearch";
import { HomeCTABand } from "@/components/sections/Home/HomeCTABand";
import { HomePlans } from "@/components/sections/Home/HomePlans";
import { HomeFooterCTA } from "@/components/sections/Home/HomeFooterCTA";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useActiveUnits } from "@/hooks/cms/useUnidades";
import { formatUnidadesCount } from "@/lib/cms/mappers/unidade";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/config/site";

// Header and Footer are provided by PageShell (layout route).
export default function HomePage() {
  const { count: activeUnitsCount, isLoading } = useActiveUnits();

  const description = isLoading || activeUnitsCount === 0
    ? DEFAULT_DESCRIPTION
    : `${DEFAULT_DESCRIPTION} ${formatUnidadesCount(activeUnitsCount)}.`;

  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/logo.png`,
            sameAs: ["https://instagram.com/paceracademia"],
            email: "sac@paceracademia.com.br",
            telephone: "+5516957820040",
          },
          {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            description: DEFAULT_DESCRIPTION,
            inLanguage: "pt-BR",
            publisher: { "@type": "Organization", name: SITE_NAME },
          },
        ],
      }),
    []
  );

  useSeoMeta({
    title: "Pacer Academia — Pacer, no seu ritmo!",
    description,
    canonical: "/",
    jsonLd,
  });

  return (
    <main>
      <HomeHero />
      <HomeUnitsSearch />
      <HomeCTABand />
      <HomePlans />
      <HomeFooterCTA />
    </main>
  );
}
