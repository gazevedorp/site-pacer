import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MovingBorder } from "@/components/ui/moving-border";
import { useActiveUnits } from "@/hooks/cms/useUnidades";
import { formatUnidadesCount } from "@/lib/cms/mappers/unidade";

const PERKS = [
  {
    label: "Visibilidade",
    description: "Perfil destacado no nosso site.",
  },
  {
    label: "Estrutura premium",
    description: "Equipamentos de alto padrão e espaços dedicados.",
  },
] as const;

export function TrainersB2BCTA() {
  const reduced = useReducedMotion();
  const { count: activeUnitsCount, isLoading } = useActiveUnits();

  const perks = useMemo(() => {
    const basePerk = {
      label: "Base de alunos",
      description: isLoading
        ? "Acesso a milhares de alunos ativos em nossas unidades."
        : `Acesso a milhares de alunos ativos em ${formatUnidadesCount(activeUnitsCount)}.`,
    };

    return [basePerk, ...PERKS];
  }, [activeUnitsCount, isLoading]);

  return (
    <section
      aria-labelledby="b2b-heading"
      className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8"
    >
      <MovingBorder
        containerClassName="w-full"
        className="bg-background"
        borderRadius="1.25rem"
        duration={reduced ? "9999s" : "5s"}
        borderWidth={1}
      >
        <div className="relative overflow-hidden rounded-[calc(1.25rem-1px)] bg-linear-to-br from-surface-raised via-card to-card px-6 py-12 sm:px-10 lg:px-16">
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Left: copy */}
            <div className="max-w-lg flex-1">
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary"
              >
                Para personais externos
              </motion.p>

              <motion.h2
                id="b2b-heading"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="text-fluid-2xl font-bold leading-tight text-white"
              >
                Quer ser{" "}
                <span className="text-primary">Personal Parceiro</span>{" "}
                Pacer?
              </motion.h2>

              <motion.p
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 text-sm leading-relaxed text-white/55"
              >
                Amplie sua carteira de clientes, trabalhe em
                estrutura de ponta e construa uma carreira sólida.
              </motion.p>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <Link
                  to="/trabalhe-conosco"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label="Candidatar-se como Personal Parceiro"
                >
                  Quero ser parceiro
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.div>
            </div>

            {/* Right: perks grid */}
            <div className="grid w-full grid-cols-2 gap-3 lg:max-w-sm">
              {perks.map((perk, i) => (
                  <motion.div
                    key={perk.label}
                    initial={reduced ? false : { opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{
                      duration: 0.4,
                      delay: reduced ? 0 : 0.1 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col gap-2 rounded-xl border border-white/[0.07] bg-white/[0.04] p-4"
                  >
                    <p className="text-xs font-semibold text-white/80">
                      {perk.label}
                    </p>
                    <p className="text-[13px] leading-relaxed text-white/40">
                      {perk.description}
                    </p>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </MovingBorder>
    </section>
  );
}
