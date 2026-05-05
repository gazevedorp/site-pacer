import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { modalities } from "@/data/modalities";
import gymCover from "@/assets/images/gym.png";

type ModalityItem = (typeof modalities)[number];

interface ModalityHeroProps {
  modality: ModalityItem;
}

export function ModalityHero({ modality }: ModalityHeroProps) {
  const reduced = useReducedMotion();
  const Icon = modality.icon;

  return (
    <section
      className="relative flex min-h-[55vh] items-end overflow-hidden pt-24 pb-12"
      aria-label={`Hero — ${modality.title}`}
    >
      {/* Full-bleed background image */}
      <img
        src={gymCover}
        alt={`${modality.title} na Pacer Academia`}
        className="absolute inset-0 h-full w-full object-cover"
        width={1440}
        height={800}
        loading="eager"
        decoding="sync"
        aria-hidden="true"
      />

      {/* Layered overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"
        aria-hidden="true"
      />
      {/* Gold glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <li>
              <Link to="/" className="flex items-center gap-1 transition-colors hover:text-white">
                <Home className="h-3.5 w-3.5" aria-hidden />
                Home
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
            <li>
              <Link to="/modalidades" className="transition-colors hover:text-white">
                Modalidades
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
            <li>
              <span className="text-primary" aria-current="page">{modality.title}</span>
            </li>
          </ol>
        </nav>

        {/* Icon badge */}
        <motion.div
          className={cn(
            "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl",
            "border border-primary/30 bg-primary/15 text-primary"
          )}
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <Icon className="h-7 w-7" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-display text-fluid-3xl font-black text-white"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {modality.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-3 max-w-2xl text-fluid-md text-white/75"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {modality.description}
        </motion.p>

        {/* Meta pills */}
        <motion.div
          className="mt-5 flex flex-wrap gap-2"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          {modality.caloriesAvg > 0 && (
            <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-sm text-primary backdrop-blur-sm">
              <Flame className="h-3.5 w-3.5" aria-hidden />
              ~{modality.caloriesAvg} kcal/h
            </span>
          )}
          {modality.availableUnits.length > 0 && (
            <span className="rounded-full bg-black/60 px-3 py-1.5 text-sm text-white/70 backdrop-blur-sm">
              {modality.availableUnits.length}{" "}
              {modality.availableUnits.length === 1 ? "unidade" : "unidades"}
            </span>
          )}
          {modality.recommendedFor.slice(0, 2).map((r) => (
            <span
              key={r}
              className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-sm text-primary/90 backdrop-blur-sm"
            >
              {r}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
