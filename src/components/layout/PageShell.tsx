import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export function PageShell() {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  return (
    <>
      <a
        href="#conteudo-principal"
        className="absolute left-4 top-4 z-[200] -translate-y-[200%] rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground outline-none transition-transform focus:translate-y-0"
      >
        Ir para o conteúdo
      </a>

      <Header />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          id="conteudo-principal"
          key={location.pathname}
          tabIndex={-1}
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      <Footer />
    </>
  );
}
