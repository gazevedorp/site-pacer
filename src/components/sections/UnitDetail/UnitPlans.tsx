import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, MessageCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppLink, CENTRAL_WHATSAPP } from "@/lib/whatsapp";
import type { Plano, Unidade } from "@/types/cms";
import { UnitSection } from "@/components/sections/UnitDetail/UnitSection";

function PlanCard({
  plan,
  unit,
  index,
}: {
  plan: Plano;
  unit: Unidade;
  index: number;
}) {
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
        "relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300",
        plan.highlighted
          ? "border-primary/50 bg-white shadow-xl shadow-primary/10 sm:scale-[1.02]"
          : "border-border bg-white/95 shadow-sm hover:border-primary/30 hover:shadow-md"
      )}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary px-3 py-1 text-xs font-bold text-black">
            <Star className="h-3 w-3" aria-hidden />
            {plan.badge}
          </span>
        </div>
      )}

      <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
      {plan.tagline && (
        <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
      )}

      <div className="my-5">
        {plan.price != null ? (
          <div className="flex items-end gap-1">
            <span className="text-xs text-muted-foreground">R$</span>
            <span
              className={cn(
                "text-4xl font-black tabular-nums leading-none",
                plan.highlighted ? "text-primary" : "text-foreground"
              )}
            >
              {plan.price}
            </span>
            <span className="mb-1 text-sm text-muted-foreground">/ mês</span>
          </div>
        ) : (
          <p className="text-sm font-semibold text-foreground">
            {plan.priceLabel}
          </p>
        )}
      </div>

      <ul className="mb-6 flex flex-1 flex-col gap-2.5" role="list">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <CheckCircle2
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                plan.highlighted ? "text-primary" : "text-primary/70"
              )}
              aria-hidden
            />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          plan.highlighted
            ? "bg-primary text-black shadow-lg shadow-primary/25 hover:bg-primary-hover"
            : "border border-border bg-background text-foreground hover:border-primary/40 hover:text-primary"
        )}
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        Quero este plano
      </a>
    </motion.article>
  );
}

interface UnitPlansProps {
  plans: Plano[];
  unit: Unidade;
}

export function UnitPlans({ plans, unit }: UnitPlansProps) {
  return (
    <UnitSection
      id="planos"
      ariaLabel="Planos disponíveis nesta unidade"
      variant="default"
      eyebrow="Planos"
      title={`Planos da Pacer ${unit.name}`}
      description="Escolha o plano ideal e comece sua jornada conosco."
      contentClassName="mt-12"
    >
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 [&::-webkit-scrollbar]:hidden">
        {plans.map((plan, i) => (
          <div
            key={plan.slug}
            className="w-[min(300px,82vw)] shrink-0 snap-start sm:w-auto"
          >
            <PlanCard plan={plan} unit={unit} index={i} />
          </div>
        ))}
      </div>
    </UnitSection>
  );
}
