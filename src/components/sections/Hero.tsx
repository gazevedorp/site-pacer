import { motion } from "framer-motion";
import { Dumbbell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-10 lg:pt-0">
      {/* Background photo */}
      <div className="absolute inset-0">
        <video
          src="/fundo.mp4"
          className="h-full w-full object-cover object-top"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Bottom fade to background color */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
      </div>

      {/* Subtle gold glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(233,181,29,0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto mt-5 max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-12 bg-black/60 backdrop-blur-sm rounded-xl">
        {/* Logo */}
        <AnimatedSection>
          <motion.img
            src="/logo.png"
            alt="Pacer Academia"
            className="mx-auto h-36 w-auto sm:h-44 md:h-48 lg:h-52"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="mx-auto mt-4 max-w-xl text-lg tracking-wide text-muted-foreground sm:text-xl lg:text-lg">
            Saúde e{" "}
            <span className="bg-linear-to-r from-primary via-primary-hover to-accent bg-clip-text text-transparent font-semibold">
              qualidade de vida
            </span>
          </p>
        </AnimatedSection>

        {/* Quick nav */}
        <AnimatedSection delay={0.3}>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group w-52 justify-center" asChild>
              <a
                href="#unidades"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('unidades');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <MapPin className="h-4 w-4" />
                Nossas unidades
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-52 justify-center" asChild>
              <a
                href="#modalidades"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('modalidades');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Dumbbell className="h-4 w-4" />
                Modalidades
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
