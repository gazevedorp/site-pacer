import { motion } from "framer-motion";
import { networkPlans } from "@/data/plans";
import { PlanCard } from "@/components/sections/Plans/PlanCard";

export function PlansShowcase() {
  return (
    <section
      aria-labelledby="plans-heading"
      className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-primary"
        >
          Planos da rede
        </motion.p>
        <motion.h2
          id="plans-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="mt-2 text-fluid-2xl font-bold text-foreground"
        >
          Escolha seu plano
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-3 max-w-md text-sm text-muted-foreground"
        >
          Uma mensalidade com acesso a todas as unidades.{" "}
          <span className="text-muted-foreground/70">* Exceto setor aquático</span>
        </motion.p>
      </div>

      <div
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible sm:pb-0 sm:pt-0 lg:grid lg:grid-cols-3 lg:items-stretch"
        role="list"
        aria-label="Opções de planos"
      >
        {networkPlans.map((plan, i) => (
          <div
            key={plan.id}
            role="listitem"
            className="w-[82vw] shrink-0 snap-center sm:w-[360px] lg:w-auto"
          >
            <PlanCard plan={plan} index={i} />
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground/80">
        * Valores sujeitos a alteração. Consulte a recepção da unidade para
        promoções e condições especiais.
      </p>
    </section>
  );
}
