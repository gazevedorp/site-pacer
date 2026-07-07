import { motion, useReducedMotion } from "framer-motion";
import { Bell, CalendarDays, Dumbbell, Smartphone } from "lucide-react";
import { appFeatures } from "@/data/app";
import { StoreBadges } from "@/components/sections/App/StoreBadges";
import { cn } from "@/lib/utils";

const featureIcons = [Dumbbell, CalendarDays, Bell, Smartphone] as const;

function FeatureCard({
  feature,
  index,
  Icon,
}: {
  feature: (typeof appFeatures)[number];
  index: number;
  Icon: (typeof featureIcons)[number];
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
        "group relative flex h-full gap-4 overflow-hidden rounded-xl border border-white/[0.08]",
        "flex-row items-start sm:flex-col sm:gap-0",
        "bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-300 sm:p-5",
        "hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-black/20"
      )}
    >
      <div
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-all group-hover:border-primary/40 group-hover:shadow-md group-hover:shadow-primary/10 sm:mb-4 sm:h-11 sm:w-11"
      >
        <Icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold leading-snug text-white sm:text-base">
          {feature.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-white/55 sm:mt-2 sm:text-sm">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

export function AppDownload() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="app-download-heading"
      className="container mx-auto px-4 pb-14 pt-4 sm:px-6 sm:pb-20 sm:pt-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-2xl border border-card-border bg-linear-to-br from-surface via-card to-surface-raised px-4 py-8 sm:rounded-3xl sm:px-6 sm:py-10 lg:px-12 lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/8 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/6 blur-3xl"
        />

        <div className="relative z-10">
          <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex w-full max-w-md flex-col items-center text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left"
            >
              <div
                aria-hidden
                className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-primary/25 bg-black/40 shadow-glow-md sm:mb-6 sm:h-24 sm:w-24 sm:rounded-[2rem] lg:h-28 lg:w-28"
              >
                <div className="absolute inset-0 rounded-[1.75rem] bg-linear-to-br from-primary/15 to-transparent sm:rounded-[2rem]" />
                <img
                  src="/logo-sem-fundo.png"
                  alt=""
                  width={80}
                  height={80}
                  className="relative h-12 w-auto sm:h-14 lg:h-16"
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Grátis para alunos
              </p>
              <h2
                id="app-download-heading"
                className="mt-2 max-w-xs text-fluid-xl font-bold text-white sm:max-w-sm sm:text-fluid-2xl lg:max-w-md"
              >
                Baixe agora e treine no seu ritmo
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50 sm:max-w-md">
                Com o app Pacer Academia, todos os alunos das academias que usam
                o EVO conseguem levar a experiência do treino para onde
                estiverem.
              </p>

              <StoreBadges className="mt-6 w-full sm:mt-8 lg:justify-start" />
            </motion.div>

            <div
              className="grid grid-cols-1 gap-3 border-t border-white/10 pt-8 sm:gap-4 md:grid-cols-2 lg:border-t-0 lg:pt-0"
              role="list"
              aria-label="Recursos do aplicativo"
            >
              {appFeatures.map((feature, i) => (
                <div key={feature.id} role="listitem" className="h-full">
                  <FeatureCard
                    feature={feature}
                    index={i}
                    Icon={featureIcons[i] ?? Smartphone}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
