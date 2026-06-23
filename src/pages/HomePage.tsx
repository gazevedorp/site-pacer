import { HomeHero } from "@/components/sections/Home/HomeHero";
import { HomeUnitsSearch } from "@/components/sections/Home/HomeUnitsSearch";
import { HomeCTABand } from "@/components/sections/Home/HomeCTABand";
import { HomePlans } from "@/components/sections/Home/HomePlans";
import { HomeFooterCTA } from "@/components/sections/Home/HomeFooterCTA";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useActiveUnits } from "@/hooks/cms/useUnidades";
import { formatUnidadesCount } from "@/lib/cms/mappers/unidade";

// Header and Footer are provided by PageShell (layout route).
export default function HomePage() {
  const { count: activeUnitsCount, isLoading } = useActiveUnits();

  const description = isLoading || activeUnitsCount === 0
    ? "Pacer Academia - Pacer, no seu ritmo! A academia que mais cresce em Ribeirão e região."
    : `Pacer Academia - Pacer, no seu ritmo! A academia que mais cresce em Ribeirão e região. ${formatUnidadesCount(activeUnitsCount)}.`;

  useSeoMeta({
    title: "Pacer Academia — Pacer, no seu ritmo!",
    description,
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
