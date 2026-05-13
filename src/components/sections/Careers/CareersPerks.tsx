import { motion, useReducedMotion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Gift,
  GraduationCap,
  type LucideProps,
} from "lucide-react";
import type { ElementType } from "react";
import { perks } from "@/data/careers";
import { cn } from "@/lib/utils";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, ElementType<LucideProps>> = {
  TrendingUp,
  Users,
  Gift,
  GraduationCap,
};

// ─── Perk card ────────────────────────────────────────────────────────────────

function PerkCard({
  perk,
  index,
}: {
  perk: (typeof perks)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  const Icon = iconMap[perk.icon] ?? TrendingUp;

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.55,
        delay: reduced ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-card-border",
        "bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:bg-surface-raised",
        perk.span === 2 ? "lg:col-span-2" : "lg:col-span-1"
      )}
      aria-label={perk.title}
    >
      {/* Background glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Icon */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10"
        aria-hidden
      >
        <Icon className="h-6 w-6 text-primary" />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-lg font-bold text-white">{perk.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/50">
          {perk.description}
        </p>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function CareersPerks() {
  return (
    <section
      aria-labelledby="perks-heading"
      className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-primary"
        >
          Por que a Pacer?
        </motion.p>
        <motion.h2
          id="perks-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="mt-2 text-fluid-2xl font-bold text-foreground"
        >
          Diferenciais que importam
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-3 max-w-md text-sm text-muted-foreground"
        >
          Não só mais um emprego — uma carreira com propósito, num ambiente que
          valoriza quem move o mundo.
        </motion.p>
      </div>

      {/* Bento grid: 2-col on desktop, 1-col on mobile */}
      <div
        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
        role="list"
        aria-label="Diferenciais de trabalhar na Pacer"
      >
        {perks.map((perk, i) => (
          <div key={perk.id} role="listitem">
            <PerkCard perk={perk} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
