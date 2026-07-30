import { motion, useReducedMotion } from "framer-motion";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";

export function TrainersBanner() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Personal trainers"
      className="relative flex min-h-[300px] items-end overflow-hidden pt-24 sm:min-h-[340px]"
    >
      {/* Background */}
      <img
        src="/fundo.webp"
        alt=""
        role="presentation"
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        width={1920}
        height={340}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Gradient layers */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/15" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />

      {/* Gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-28 w-3/4 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto w-full px-4 pb-10 sm:px-6 lg:px-8">
        <PageBreadcrumb items={[{ label: "Personal Trainers" }]} />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-display text-fluid-3xl leading-tight text-white">
            Personal Trainers
          </h1>
          <p className="mt-2 max-w-lg text-fluid-md text-white/55">
            Conheça os profissionais certificados da rede Pacer. Use os filtros
            para encontrar o trainer ideal para você.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
