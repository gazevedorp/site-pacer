import { motion, useReducedMotion } from "framer-motion";
import { Dumbbell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated";

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          src="/fundo.mp4"
          className="h-full w-full object-cover object-left sm:object-center"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75" />
        {/* Bottom fade to background color */}
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Subtle gold glow */}
      <div className="pointer-events-none absolute inset-0 w-full h-full">
        <div
          className="absolute left-1/2 top-1/3 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(233,181,29,0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-4 w-full max-w-4xl px-4 py-12 sm:py-16 md:py-20 text-center bg-black/60 backdrop-blur-sm rounded-xl">
        {/* Logo */}
        <AnimatedSection>
          <motion.img
            src="/logo.png"
            alt="Pacer Academia"
            className="mx-auto h-32 w-auto sm:h-40 md:h-48 lg:h-56"
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="mx-auto mt-6 text-sm font-medium tracking-[0.3em] uppercase text-primary/70">
            Saúde e qualidade de vida
          </p>
        </AnimatedSection>

        {/* Quick nav */}
        <AnimatedSection delay={0.3}>
          <div className=" mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3 sm:gap-4">
            <Button size="lg" className="group w-full sm:w-52 justify-center" asChild>
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
            <Button variant="outline" size="lg" className="w-full sm:w-52 justify-center" asChild>
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
