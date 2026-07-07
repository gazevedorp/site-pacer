import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export function AppFloat() {
  const { pathname } = useLocation();

  if (pathname === "/app") return null;

  return (
    <motion.div
      className="fixed bottom-3 right-3 z-50 flex items-start gap-2 sm:bottom-4 sm:right-4"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="pointer-events-none -mt-2 hidden rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-none bg-white px-3 py-1 text-xs font-medium text-foreground shadow-sm md:inline-block">
        Baixe nosso app!
      </span>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/app"
          aria-label="Baixar o app Pacer Academia"
          className="relative block shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl hover:shadow-primary/40"
        >
          <img
            src="/icone-app.png"
            alt=""
            className="block h-24 w-auto max-w-none object-contain"
          />

          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-xl bg-primary opacity-20"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}
