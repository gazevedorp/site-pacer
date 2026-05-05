import { HomeHero } from "@/components/sections/Home/HomeHero";
import { HomeUnitsSearch } from "@/components/sections/Home/HomeUnitsSearch";
import { HomeCTABand } from "@/components/sections/Home/HomeCTABand";
import { HomePlans } from "@/components/sections/Home/HomePlans";
import { HomeFooterCTA } from "@/components/sections/Home/HomeFooterCTA";

// Header and Footer are provided by PageShell (layout route).
export default function HomePage() {
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
