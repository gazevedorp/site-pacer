import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { useActiveUnits } from "@/hooks/cms/useUnidades";

export function HomeHero() {
  const prefersReduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { count: activeUnitsCount, isLoading: isLoadingUnits } = useActiveUnits();

  return (
    <section
      aria-label="Apresentação Pacer Academia"
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden"
    >
      {/* ── Background ────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        {/* Desktop: autoplay muted video */}
        <video
          ref={videoRef}
          src="/fundo.mp4"
          poster="/fundo.jpg"
          className="h-full w-full object-cover object-center"
          autoPlay={!prefersReduced}
          loop
          muted
          playsInline
          preload="none"
          aria-hidden
          width={1920}
          height={1080}
        />

        {/* Mobile play overlay — shown only when NOT playing */}
        {/* {!videoPlaying && (
          <button
            onClick={handlePlayVideo}
            aria-label="Reproduzir vídeo de apresentação"
            className="absolute inset-0 z-10 flex items-center justify-center sm:hidden"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm ring-2 ring-primary/60 transition hover:bg-background/90">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary translate-x-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )} */}

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/55" aria-hidden />
      </div>

      {/* ── Text marquee band ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-16 z-20 overflow-hidden border-y border-white/5 bg-black/25 py-3.5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <div
          className={
            prefersReduced
              ? "flex w-max"
              : "flex w-max animate-logo-marquee"
          }
        >
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex min-w-[100vw] shrink-0 items-center justify-around gap-10 px-5"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={`${group}-${i}`}
                  className="shrink-0 whitespace-nowrap text-xs font-medium tracking-wide text-white/80 sm:text-[calc(0.875rem+2px)]"
                >
                  Aluno Pacer pode treinar em todas as unidades!
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Spotlight glow ────────────────────────────────────────── */}
      <Spotlight
        className="absolute inset-0"
        fill="#E9B51D"
        size={1100}
        trackMouse
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        {/* LCP image — logo (fetchpriority high) */}
        <motion.img
          src="/logo.png"
          alt="Pacer Academia"
          width={320}
          height={160}
          fetchPriority="high"
          decoding="sync"
          className="mx-auto h-28 w-auto sm:h-36 md:h-44"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Eyebrow */}
        <motion.p
          className="mt-6 text-sm font-medium tracking-[0.3em] uppercase text-primary/80"
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Pacer, no seu ritmo
        </motion.p>


        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button size="lg" className="w-full max-w-xs sm:w-auto" asChild>
            <Link to="/unidades">
              <MapPin className="h-4 w-4" />
              Conheça as unidades
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full max-w-xs sm:w-auto"
            asChild
          >
            <Link to="/modalidades">
              <Dumbbell className="h-4 w-4" />
              Conheça nossas aulas
            </Link>
          </Button>
        </motion.div>

        {/* Social proof stats */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-black text-white sm:text-[calc(1.125rem+2px)]">+ de 1500</span>
            <span className="text-[10px] uppercase tracking-widest text-white/70 sm:text-[12px]">aulas coletivas no mês</span>
          </div>
          <div className="h-6 w-px bg-white/25 hidden sm:block" aria-hidden />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-black text-white sm:text-[calc(1.125rem+2px)]">
              {isLoadingUnits ? "—" : activeUnitsCount}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/70 sm:text-[12px]">unidades</span>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll cue ────────────────────────────────────────────── */}
      {!prefersReduced && (
        <motion.div
          aria-hidden
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-9 w-5 rounded-full border border-white/30 p-1">
            <div className="mx-auto h-2 w-1 rounded-full bg-primary/70" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
