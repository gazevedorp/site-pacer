import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Units } from "@/components/sections/Units";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Units />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
