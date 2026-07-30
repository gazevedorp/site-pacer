import { motion, useReducedMotion } from "framer-motion";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";

export function CareersBanner() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Trabalhe Conosco — Pacer Academia"
      className="relative flex min-h-[340px] items-end overflow-hidden pt-24 sm:min-h-[400px]"
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
        height={400}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Gradient layers */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-r from-black/55 via-transparent to-transparent" />

      {/* Gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto w-full px-4 pb-12 sm:px-6 lg:px-8">
        <PageBreadcrumb items={[{ label: "Trabalhe Conosco" }]} />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Faça parte do time
          </p>
          <h1 className="text-fluid-3xl font-bold leading-tight text-white">
            Trabalhe{" "}
            <span className="text-primary">Conosco</span>
          </h1>
          <p className="mt-3 max-w-lg text-fluid-md text-white/50">
            Construa sua carreira na maior rede de academias de Ribeirão e
            região. Aqui o seu talento encontra propósito.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
