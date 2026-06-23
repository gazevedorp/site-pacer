import { motion, useReducedMotion } from "framer-motion";
import { perks } from "@/data/careers";
import { cn } from "@/lib/utils";

function PerkCard({
  perk,
  index,
}: {
  perk: (typeof perks)[number];
  index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.08]",
        "bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-black/20"
      )}
      aria-label={perk.title}
    >
      <span
        aria-hidden
        className="text-[11px] font-bold tracking-widest text-primary/70"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        aria-hidden
        className="mt-3 h-px w-8 bg-primary/40 transition-all duration-300 group-hover:w-12 group-hover:bg-primary/70"
      />
      <h3 className="mt-3 text-base font-semibold leading-snug text-white">
        {perk.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
        {perk.description}
      </p>
    </motion.article>
  );
}

export function CareersPerks() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="perks-heading"
      className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-3xl border border-card-border bg-linear-to-br from-surface via-card to-surface-raised px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/8 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/6 blur-3xl"
        />

        <div className="relative z-10">
          <div className="mb-8 text-center sm:mb-10">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-widest text-primary"
            >
              Por que a Pacer?
            </motion.p>
            <motion.h2
              id="perks-heading"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-2 text-fluid-2xl font-bold text-white"
            >
              Diferenciais que importam
            </motion.h2>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/50"
            >
              Não só mais um emprego, uma carreira com propósito, em um ambiente
              que valoriza quem move o mundo.
            </motion.p>
          </div>

          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
            role="list"
            aria-label="Diferenciais de trabalhar na Pacer"
          >
            {perks.map((perk, i) => (
              <div key={perk.id} role="listitem" className="h-full">
                <PerkCard perk={perk} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
