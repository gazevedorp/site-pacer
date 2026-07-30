import { motion, useReducedMotion } from "framer-motion";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";

export function AppBanner() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Baixe o app Pacer Academia"
      className="relative flex min-h-[240px] items-end overflow-hidden pt-24 sm:min-h-[300px] md:min-h-[340px]"
    >
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

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/15" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-28 w-3/4 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative z-10 container mx-auto w-full px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
        <PageBreadcrumb items={[{ label: "App" }]} />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Disponível para iOS e Android
          </p>
          <h1 className="text-display text-fluid-2xl leading-tight text-white sm:text-fluid-3xl">
            App{" "}
            <span className="text-primary">Pacer Academia</span>
          </h1>
          <p className="mt-3 max-w-md text-fluid-md text-white/50 sm:max-w-lg">
            Leve a experiência do treino para onde estiver. Treinos, agenda de
            aulas e notificações, tudo no seu celular.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
