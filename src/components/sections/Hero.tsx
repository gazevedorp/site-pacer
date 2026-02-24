import { motion } from "framer-motion";
import { Dumbbell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src="/fundo.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
        {/* Logo */}
        <AnimatedSection>
          <motion.img
            src="/logo.png"
            alt="Pacer Academia"
            className="mx-auto h-36 w-auto sm:h-42 md:h-48"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h1 className="mx-auto mt-8 max-w-4xl text-2xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Saúde e {" "}
            <span className="bg-linear-to-r from-primary via-primary-hover to-accent bg-clip-text text-transparent">
              qualidade de vida
            </span>
          </h1>
          {/* <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            13 unidades em Ribeirão Preto e Sertãozinho
          </p> */}
        </AnimatedSection>

        {/* Quick nav */}
        <AnimatedSection delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group w-52 justify-center" asChild>
              <a href="#modalidades">
                <Dumbbell className="h-4 w-4" />
                Modalidades
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-52 justify-center" asChild>
              <a href="#unidades">
                <MapPin className="h-4 w-4" />
                Nossas unidades
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
