import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { modalities } from "@/data/modalities";
import type { UnitModalityId } from "@/data/units";

// ─── ID → modality title map ─────────────────────────────────────────────────

const MODALITY_TITLE: Record<UnitModalityId, string> = {
  musculacao: "Musculação",
  funcional: "Funcional",
  "muay-thai": "Muay Thai",
  pilates: "Pilates",
  hidroginastica: "Hidroginástica",
  natacao: "Natação Infantil",
  danca: "Zumba & Dança",
  zumba: "Zumba & Dança",
};

// ─── Component ───────────────────────────────────────────────────────────────

interface UnitModalitiesProps {
  unitModalities: UnitModalityId[];
}

export function UnitModalities({ unitModalities }: UnitModalitiesProps) {
  const reduced = useReducedMotion();

  // Deduplicate titles then filter modalities array
  const titleSet = new Set(unitModalities.map((id) => MODALITY_TITLE[id]));
  const items = modalities.filter((m) => titleSet.has(m.title));

  if (items.length === 0) return null;

  return (
    <section
      aria-label="Modalidades disponíveis nesta unidade"
      className="section-padding container mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h2 className="mb-2 text-fluid-xl font-bold text-foreground">
        Modalidades nesta Unidade
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Tudo que você pode praticar aqui.
      </p>

      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        role="list"
      >
        {items.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <motion.div
              key={mod.title}
              role="listitem"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.5,
                delay: reduced ? 0 : Math.min(i * 0.08, 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col gap-3 rounded-2xl border border-card-border bg-card p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-surface-raised"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-sm font-bold text-white">{mod.title}</h3>
              <p className="flex-1 text-xs leading-relaxed text-white/60">
                {mod.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Link to full modalities page */}
      <div className="mt-6 flex justify-end">
        <Link
          to="/modalidades"
          className="inline-flex items-center gap-1.5 text-sm text-primary/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Ver todas as modalidades
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
