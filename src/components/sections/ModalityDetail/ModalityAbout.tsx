import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { modalities } from "@/data/modalities";

type ModalityItem = (typeof modalities)[number];

interface ModalityAboutProps {
  modality: ModalityItem;
}

export function ModalityAbout({ modality }: ModalityAboutProps) {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label={`Benefícios de ${modality.title}`}
      className="relative py-16 sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-fluid-xl font-bold text-foreground">Benefícios</h2>

          <ul className="mt-6 max-w-2xl space-y-3" role="list">
            {modality.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden
                />
                {benefit}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
