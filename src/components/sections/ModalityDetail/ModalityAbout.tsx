import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Flame,
  Target,
  Users,
} from "lucide-react";
import { modalities } from "@/data/modalities";

type ModalityItem = (typeof modalities)[number];

interface ModalityAboutProps {
  modality: ModalityItem;
}

export function ModalityAbout({ modality }: ModalityAboutProps) {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label={`Sobre ${modality.title}`}
      className="section-padding container mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — benefits */}
        <div>
          <motion.h2
            className="mb-6 text-fluid-xl font-bold text-white"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Benefícios
          </motion.h2>

          <ul className="flex flex-col gap-3" role="list">
            {modality.benefits.map((benefit, i) => (
              <motion.li
                key={benefit}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
                initial={reduced ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 0.45,
                  delay: reduced ? 0 : i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden
                />
                <span className="text-sm text-white/80">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right — stats table */}
        <div className="flex flex-col gap-5">
          <motion.h2
            className="mb-1 text-fluid-xl font-bold text-white"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Indicadores
          </motion.h2>

          {/* Calories */}
          {modality.caloriesAvg > 0 && (
            <motion.div
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                <Flame className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Gasto calórico médio
                </p>
                <p className="mt-1 text-2xl font-black tabular-nums text-white">
                  ~{modality.caloriesAvg}
                  <span className="ml-1.5 text-sm font-normal text-white/50">kcal / hora</span>
                </p>
                <p className="mt-0.5 text-xs text-white/35">
                  Valor estimado para adulto de 70 kg em intensidade moderada.
                </p>
              </div>
            </motion.div>
          )}

          {/* Recommended for */}
          {modality.recommendedFor.length > 0 && (
            <motion.div
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Indicado para
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {modality.recommendedFor.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-sm text-primary/80"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Units count */}
          <motion.div
            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: 0.19, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Users className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Disponível em
              </p>
              <p className="mt-1 text-2xl font-black tabular-nums text-white">
                {modality.availableUnits.length}
                <span className="ml-1.5 text-sm font-normal text-white/50">
                  {modality.availableUnits.length === 1 ? "unidade" : "unidades"}
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
