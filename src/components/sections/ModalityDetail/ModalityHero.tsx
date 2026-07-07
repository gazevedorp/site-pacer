import { motion, useReducedMotion } from "framer-motion";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";
import type { Modalidade } from "@/types/cms";

interface ModalityHeroProps {
  modality: Modalidade;
}

export function ModalityHero({ modality }: ModalityHeroProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[55vh] items-end overflow-hidden pt-24 pb-12"
      aria-label={`Hero — ${modality.title}`}
    >
      <img
        src={modality.coverImageUrl}
        alt={`${modality.title} na Pacer Academia`}
        className="absolute inset-0 h-full w-full object-cover"
        width={1440}
        height={800}
        loading="eager"
        decoding="sync"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"
        aria-hidden="true"
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <PageBreadcrumb
          items={[
            { label: "Modalidades", href: "/modalidades" },
            { label: modality.title },
          ]}
        />
        <motion.h1
          className="text-display text-fluid-3xl text-white"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {modality.title}
        </motion.h1>
        <motion.p
          className="mt-3 max-w-2xl text-fluid-md text-white/75"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {modality.description}
        </motion.p>
      </div>
    </section>
  );
}
