import { motion, useReducedMotion } from "framer-motion";
import { Check, X, MessageCircle, Star } from "lucide-react";
import { networkPlans, buildWhatsAppLink } from "@/data/plans";
import { cn } from "@/lib/utils";

function PlanCard({
  plan,
  index,
}: {
  plan: (typeof networkPlans)[number];
  index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.55,
        delay: reduced ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 transition-shadow duration-300 sm:p-8",
        plan.highlighted
          ? "border-primary/50 bg-primary/[0.06] shadow-2xl shadow-primary/15 sm:scale-[1.02] lg:scale-[1.05] z-10"
          : "border-card-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-black/30"
      )}
      aria-label={`Plano ${plan.name}`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30">
            <Star className="h-3 w-3" aria-hidden />
            {plan.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3
          className={cn(
            "text-xl font-bold",
            plan.highlighted ? "text-primary" : "text-white"
          )}
        >
          {plan.name}
        </h3>
        <p className="mt-1 text-sm text-white/45">{plan.tagline}</p>

        <div className="mt-5 flex items-end gap-1">
          <span className="text-4xl font-bold tabular-nums text-white sm:text-5xl">
            R$ {plan.price}
          </span>
          <span className="mb-1.5 text-sm text-white/40">/mês</span>
        </div>
        <p className="mt-1 text-xs text-white/30">Sem fidelidade · Cancele quando quiser</p>
      </div>

      {/* Features */}
      <ul className="mb-6 flex flex-col gap-2.5" role="list">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
            <Check
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                plan.highlighted ? "text-primary" : "text-green-400"
              )}
              aria-hidden
            />
            {feature}
          </li>
        ))}
        {plan.notIncluded?.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-white/30">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-white/20" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto">
        <a
          href={buildWhatsAppLink(plan.whatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            plan.highlighted
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              : "border border-white/15 bg-white/[0.04] text-white hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          )}
          aria-label={`Assinar Plano ${plan.name} via WhatsApp`}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Quero este plano
        </a>
      </div>
    </motion.div>
  );
}

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
          Sem letra miúda
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
          Todos os planos dão acesso ao melhor equipamento e à equipe mais
          qualificada de Ribeirão Preto e Sertãozinho.
        </motion.p>
      </div>

      {/* Cards — mobile: scroll-snap; desktop: grid */}
      <div
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible sm:pb-0 sm:pt-0 lg:grid lg:grid-cols-3 lg:items-center"
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

      {/* Footnote */}
      <p className="mt-8 text-center text-xs text-muted-foreground/80">
        * Valores sujeitos a alteração. Consulte a recepção da unidade para
        promoções e condições especiais.
      </p>
    </section>
  );
}
