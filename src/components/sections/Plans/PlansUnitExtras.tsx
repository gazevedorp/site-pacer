import { motion } from "framer-motion";
import { usePlanosPorUnidade } from "@/hooks/cms/usePlanos";
import { PlanCard } from "@/components/sections/Plans/PlanCard";
import { CmsLoading } from "@/components/shared/CmsStates";
import type { Plano } from "@/types/cms";

function toPlanCardData(plan: Plano) {
  return {
    id: plan.slug,
    name: plan.name,
    tagline: plan.tagline,
    price: plan.price,
    priceLabel: plan.priceLabel,
    features: plan.features,
    whatsappText: plan.whatsappText,
    unitsLabel: plan.unitsLabel,
  };
}

export function PlansUnitExtras() {
  const { data: plans, isLoading } = usePlanosPorUnidade();

  if (isLoading) return <CmsLoading className="py-16" />;
  if (plans.length === 0) return null;

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
            Outros planos
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
              key={plan.slug}
              role="listitem"
              className="w-[82vw] shrink-0 snap-center sm:w-[360px] lg:w-auto"
            >
              <PlanCard
                plan={toPlanCardData(plan)}
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
