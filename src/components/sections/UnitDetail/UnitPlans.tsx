import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, MessageCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppLink, CENTRAL_WHATSAPP } from "@/data/unitDetail";
import type { UnitPlan } from "@/types/unit";
import type { Unit } from "@/data/units";

// ─── Plan Card ───────────────────────────────────────────────────────────────

interface PlanCardProps {
  plan: UnitPlan;
  unit: Unit;
  index: number;
}

function PlanCard({ plan, unit, index }: PlanCardProps) {
  const reduced = useReducedMotion();
  const waNumber = unit.whatsapp ?? CENTRAL_WHATSAPP;
  const waHref = buildWhatsAppLink(plan.whatsappText ?? "", waNumber);

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 transition-all duration-300",
        plan.highlighted
          ? "sm:scale-[1.03] border-primary/50 bg-card shadow-xl shadow-primary/15"
          : "border-card-border bg-card hover:border-primary/40 hover:bg-surface-raised"
      )}
    >
      {/* Highlighted badge */}
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary px-3 py-1 text-xs font-bold text-black">
            <Star className="h-3 w-3" aria-hidden />
            Mais escolhido
          </span>
        </div>
      )}

      {/* Name */}
      <h3 className="text-base font-bold text-white">{plan.name}</h3>

      {/* Price */}
      <div className="my-5 flex items-end gap-1">
        <span className="text-xs text-white/40">R$</span>
        <span
          className={cn(
            "text-4xl font-black tabular-nums leading-none",
            plan.highlighted ? "text-primary" : "text-white"
          )}
        >
          {plan.price}
        </span>
        <span className="mb-1 text-sm text-white/50">/ mês</span>
      </div>

      {/* Features */}
      <ul className="mb-6 flex flex-1 flex-col gap-2.5" role="list">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-white/70">
            <CheckCircle2
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                plan.highlighted ? "text-primary" : "text-primary/60"
              )}
              aria-hidden
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          plan.highlighted
            ? "bg-primary text-black shadow-lg shadow-primary/30 hover:bg-primary/90"
            : "border border-white/20 bg-white/5 text-white hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        )}
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        Quero este plano
      </a>
    </motion.article>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

interface UnitPlansProps {
  plans: UnitPlan[];
  unit: Unit;
}

export function UnitPlans({ plans, unit }: UnitPlansProps) {
  return (
    <section
      id="planos"
      aria-label="Planos disponíveis nesta unidade"
      className="section-padding container mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h2 className="mb-2 text-fluid-xl font-bold text-foreground">
        Planos da Unidade
      </h2>
      <p className="mb-10 text-sm text-muted-foreground">
        Escolha o plano ideal e comece sua jornada na Pacer {unit.name}.
      </p>

      {/* Mobile: snap scroll — Desktop: 3-col grid */}
      <div className="snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 flex gap-4 px-4 pb-8 pt-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0">
        {plans.map((plan, i) => (
          <div
            key={plan.id}
            className="snap-start w-[min(300px,80vw)] shrink-0 sm:w-auto"
          >
            <PlanCard plan={plan} unit={unit} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
