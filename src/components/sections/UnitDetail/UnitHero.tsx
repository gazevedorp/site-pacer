import { useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { MapPin, Clock, ChevronRight, MessageCircle } from "lucide-react";
import { ImagesSlider } from "@/components/ui/images-slider";
import type { Unit } from "@/data/units";
import gymCover from "@/assets/images/gym.png";

interface UnitHeroProps {
  unit: Unit;
  whatsappHref: string;
}

export function UnitHero({ unit, whatsappHref }: UnitHeroProps) {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { margin: "-80px 0px 0px 0px" });

  return (
    <>
      <section ref={heroRef} className="relative h-[72vh] min-h-[520px]">
        <ImagesSlider
          images={[gymCover]}
          alts={[`Pacer Academia ${unit.name} — visão geral`]}
          className="h-full"
          overlay={false}
          autoPlay={false}
        >
          <>
            {/* Custom gradient overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20"
            />
            {/* Bottom content */}
            <div className="relative w-full pb-10 pt-24">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <p className="mb-3 text-sm text-white/50">
                  <a href="/unidades" className="transition-colors hover:text-white/80">
                    Unidades
                  </a>
                  {" / "}
                  <span className="text-white/70">{unit.name}</span>
                </p>

                {/* Name */}
                <motion.h1
                  className="text-display text-fluid-3xl font-black text-white"
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  Pacer{" "}
                  <span className="text-gradient-gold">{unit.name}</span>
                </motion.h1>

                {/* Address */}
                <motion.p
                  className="mt-2 flex items-start gap-2 text-white/80"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {unit.address} — {unit.city}
                </motion.p>

                {/* Hours */}
                <motion.div
                  className="mt-3 flex flex-wrap gap-2"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  {unit.hours.map((h) => (
                    <span
                      key={h}
                      className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-sm text-white/80 backdrop-blur-sm"
                    >
                      <Clock className="h-3.5 w-3.5 text-primary" aria-hidden />
                      {h}
                    </span>
                  ))}
                </motion.div>

                {/* Desktop CTA */}
                <motion.div
                  className="mt-6 hidden gap-3 sm:flex"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-black shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Matricule-se agora
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </a>
                  <a
                    href="#planos"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    Ver planos
                  </a>
                </motion.div>
              </div>
            </div>
          </>
        </ImagesSlider>
      </section>

      {/* Sticky mobile CTA — appears after hero scrolls out */}
      <AnimatePresence>
        {!heroInView && (
          <motion.div
            className="fixed bottom-20 left-0 right-0 z-40 flex justify-center sm:hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-black shadow-xl shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Matricule-se
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
