import { motion } from "framer-motion";
import { getUnitSpecificPlanCards } from "@/data/plans";
import { PlanCard } from "@/components/sections/Plans/PlanCard";

export function PlansUnitExtras() {
  const plans = getUnitSpecificPlanCards();

  return (
    <section
      aria-labelledby="unit-plans-heading"
      className="relative border-t border-border bg-muted/30"
    >
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-primary"
          >
            Por unidade
          </motion.p>
          <motion.h2
            id="unit-plans-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-2 text-fluid-2xl font-bold text-foreground"
          >
            Disponíveis em unidades selecionadas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground"
          >
            Pilates, setor aquático e natação infantil não fazem parte dos planos
            gerais da rede. Consulte a unidade para valores e vagas.
          </motion.p>
        </div>

        <div
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible lg:grid lg:grid-cols-3 lg:items-stretch"
          role="list"
          aria-label="Planos e serviços por unidade"
        >
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              role="listitem"
              className="w-[82vw] shrink-0 snap-center sm:w-[360px] lg:w-auto"
            >
              <PlanCard
                plan={{
                  id: plan.id,
                  name: plan.name,
                  tagline: plan.tagline,
                  priceLabel: plan.priceLabel,
                  features: plan.features,
                  unitsLabel: plan.unitsLabel,
                  whatsappText: plan.whatsappText,
                }}
                index={i}
                variant="secondary"
              />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/80">
          * Setor aquático incluso no Multi e Família apenas nas unidades com piscina.
        </p>
      </div>
    </section>
  );
}
