import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { modalities } from "@/data/modalities";
import type { UnitModalityId } from "@/data/units";
import { UnitSection } from "@/components/sections/UnitDetail/UnitSection";

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

interface UnitModalitiesProps {
  unitModalities: UnitModalityId[];
}

export function UnitModalities({ unitModalities }: UnitModalitiesProps) {
  const reduced = useReducedMotion();
  const titleSet = new Set(unitModalities.map((id) => MODALITY_TITLE[id]));
  const items = modalities.filter((m) => titleSet.has(m.title));

  if (items.length === 0) return null;

  return (
    <UnitSection
      ariaLabel="Modalidades disponíveis nesta unidade"
      variant="dark"
      eyebrow="Modalidades"
      title="O que você pode praticar"
      description="Tudo que esta unidade oferece para o seu treino."
    >
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
              className="group flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm transition-all hover:border-primary/35 hover:bg-white/[0.07]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-sm font-bold text-white">{mod.title}</h3>
              <p className="flex-1 text-xs leading-relaxed text-white/55">
                {mod.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end border-t border-white/[0.08] pt-6">
        <Link
          to="/modalidades"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Ver todas as modalidades
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </UnitSection>
  );
}
