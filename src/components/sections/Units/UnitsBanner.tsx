import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function UnitsBanner() {
  const reduced = useReducedMotion();

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
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-sm text-white/60">
            <li>
              <Link
                to="/"
                className="flex items-center gap-1 transition-colors hover:text-white"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <span className="text-primary" aria-current="page">
                Unidades
              </span>
            </li>
          </ol>
        </nav>

        {/* Title */}
        <motion.h1
          className="text-display text-fluid-3xl font-black tracking-tight text-white"
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
          13 unidades em Ribeirão Preto, Bonfim Paulista e Sertãozinho prontas
          para transformar o seu treino.
        </motion.p>
      </div>
    </section>
  );
}
