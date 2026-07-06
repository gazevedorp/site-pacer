import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function PlansBanner() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Planos da Pacer Academia"
      className="relative flex min-h-[300px] items-end overflow-hidden pt-16 sm:min-h-[340px]"
    >
      {/* Background */}
      <img
        src="/fundo.jpg"
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
        {/* Breadcrumb */}
        <nav aria-label="Navegação estrutural" className="mb-4">
          <ol className="flex items-center gap-1.5 text-xs text-white/40">
            <li>
              <Link
                to="/"
                className="inline-flex items-center gap-1 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <Home className="h-3 w-3" aria-hidden />
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3 w-3" />
            </li>
            <li>
              <span className="text-white/70">Planos</span>
            </li>
          </ol>
        </nav>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-display text-fluid-3xl leading-tight text-white">
            Planos e Preços
          </h1>
          <p className="mt-2 max-w-lg text-sm text-white/55 sm:text-base">
            Escolha o plano ideal para o seu estilo de vida.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
