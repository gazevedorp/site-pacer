import { motion, useReducedMotion } from "framer-motion";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";
import { useActiveUnits } from "@/hooks/cms/useUnidades";
import { formatUnidadesCount } from "@/lib/cms/mappers/unidade";

export function UnitsBanner() {
  const reduced = useReducedMotion();
  const { count: activeUnitsCount, isLoading } = useActiveUnits();

  return (
    <section
      className="relative flex min-h-[40vh] items-end overflow-hidden pt-24 pb-10"
      aria-label="Nossas Unidades"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/fundo.jpg)" }}
        aria-hidden="true"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"
        aria-hidden="true"
      />
      {/* Gold glow accent */}
      <div
        className="absolute bottom-0 left-1/2 h-40 w-[60%] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <PageBreadcrumb items={[{ label: "Unidades" }]} />

        {/* Title */}
        <motion.h1
          className="text-display text-fluid-3xl tracking-tight text-white"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Nossas{" "}
          <span className="text-gradient-gold">Unidades</span>
        </motion.h1>

        <motion.p
          className="mt-3 max-w-xl text-fluid-md text-white/70"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {isLoading
            ? "Unidades em Ribeirão Preto e região prontas"
            : `${formatUnidadesCount(activeUnitsCount)} em Ribeirão Preto e região prontas`}{" "}
          para transformar o seu treino.
        </motion.p>
      </div>
    </section>
  );
}
