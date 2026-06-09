import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Modalidade } from "@/types/cms";
import { getModalityIcon } from "@/lib/cms/iconMap";
import { UnitSection } from "@/components/sections/UnitDetail/UnitSection";

interface UnitModalitiesProps {
  modalidades: Modalidade[];
}

export function UnitModalities({ modalidades }: UnitModalitiesProps) {
  const reduced = useReducedMotion();

  if (modalidades.length === 0) return null;

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
        {modalidades.map((mod, i) => {
          const Icon = getModalityIcon(mod.iconName);
          return (
            <motion.div
              key={mod.slug}
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
              <div>
                <h3 className="font-semibold text-white">{mod.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/60">
                  {mod.description}
                </p>
              </div>
              <Link
                to={`/modalidades/${mod.slug}`}
                className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors group-hover:text-primary/80"
              >
                Saiba mais
                <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </UnitSection>
  );
}
