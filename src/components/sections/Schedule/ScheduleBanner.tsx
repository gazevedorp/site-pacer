import { motion, useReducedMotion } from "framer-motion";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";

export function ScheduleBanner() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Grade de aulas"
      className="relative flex min-h-[280px] items-end overflow-hidden pt-24 sm:min-h-[320px]"
    >
      {/* Background image */}
      <img
        src="/fundo.jpg"
        alt=""
        role="presentation"
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        width={1920}
        height={320}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-r from-black/55 via-transparent to-transparent" />

      {/* Gold glow at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto w-full px-4 pb-10 sm:px-6 lg:px-8">
        <PageBreadcrumb items={[{ label: "Grade de Aulas" }]} />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-display text-fluid-3xl leading-tight text-white">
            Grade de Aulas
          </h1>
          <p className="mt-2 max-w-lg text-sm text-white/55 sm:text-base">
            Selecione sua unidade e modalidade para ver os horários disponíveis.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
