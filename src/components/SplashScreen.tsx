import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"logo" | "exit">("logo");

  const handleExit = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exit"), 2500);
    const completeTimer = setTimeout(handleExit, 3200);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [handleExit]);

  return (
    <AnimatePresence>
      {phase !== "exit" || true ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "#010205" }}
          initial={{ opacity: 1 }}
          animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Subtle ambient glow — no visible circle */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.35, 0.6] }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              times: [0, 0.3, 0.6, 1],
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(233,181,29,0.12) 0%, rgba(249,222,7,0.03) 35%, transparent 65%)",
              }}
            />
          </motion.div>

          {/* Logo + tagline */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={
              phase === "exit"
                ? { opacity: 0, scale: 0.6, y: -80 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{
              duration: phase === "exit" ? 0.6 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.img
              src="/logo.png"
              alt="Pacer Academia"
              className="h-28 w-auto sm:h-36 md:h-44"
              initial={{ filter: "brightness(0.4)" }}
              animate={{ filter: "brightness(1)" }}
              transition={{ duration: 1.4, delay: 0.2 }}
            />

            {/* Tagline */}
            <motion.p
              className="mt-6 text-sm font-medium tracking-[0.3em] uppercase text-primary/70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Saúde e qualidade de vida
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
