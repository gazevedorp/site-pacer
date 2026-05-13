import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { whatsappNumber } from "@/data/home";

export function HomeHero() {
  const prefersReduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Olá! Gostaria de agendar uma aula experimental na Pacer Academia."
  )}`;

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
          Saúde e qualidade de vida
        </motion.p>


        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button size="lg" className="w-full max-w-xs sm:w-auto" asChild>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarCheck className="h-4 w-4" />
              Agende sua aula
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full max-w-xs sm:w-auto"
            asChild
          >
            <Link to="/unidades">
              <MapPin className="h-4 w-4" />
              Conheça as unidades
            </Link>
          </Button>
        </motion.div>

        {/* Social proof stats */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-black text-white">+15k</span>
            <span className="text-[10px] uppercase tracking-widest text-white/50">alunos ativos</span>
          </div>
          <div className="h-8 w-px bg-white/15 hidden sm:block" aria-hidden />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-black text-white">13</span>
            <span className="text-[10px] uppercase tracking-widest text-white/50">unidades</span>
          </div>
          <div className="h-8 w-px bg-white/15 hidden sm:block" aria-hidden />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-black text-gradient-gold">2010</span>
            <span className="text-[10px] uppercase tracking-widest text-white/50">desde</span>
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
