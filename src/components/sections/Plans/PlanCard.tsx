import { motion, useReducedMotion } from "framer-motion";
import { Check, X, MessageCircle, Star, MapPin } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export interface PlanCardData {
  id: string;
  name: string;
  tagline: string;
  price?: number;
  priceLabel?: string;
  features: string[];
  notIncluded?: string[];
  highlighted?: boolean;
  badge?: string;
  whatsappText: string;
  unitsLabel?: string;
}

interface PlanCardProps {
  plan: PlanCardData;
  index: number;
  variant?: "default" | "secondary";
}

export function PlanCard({ plan, index, variant = "default" }: PlanCardProps) {
  const reduced = useReducedMotion();
  const isSecondary = variant === "secondary";

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
        "relative flex h-full flex-col rounded-2xl border p-6 transition-shadow duration-300 sm:p-8",
        plan.highlighted && !isSecondary
          ? "border-primary/50 bg-white shadow-glow-sm sm:scale-[1.03] origin-center z-10"
          : "border-border bg-white shadow-sm hover:border-primary/30 hover:shadow-md"
      )}
      aria-label={`Plano ${plan.name}`}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow-sm">
            <Star className="h-3 w-3 fill-current" aria-hidden />
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

        {plan.unitsLabel && (
          <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" aria-hidden />
            {plan.unitsLabel}
          </p>
        )}

        <div className="mt-5">
          {plan.price != null ? (
            <div className="flex items-end gap-1">
              <span className="text-xs text-muted-foreground">R$</span>
              <span className="text-4xl font-bold tabular-nums leading-none text-foreground sm:text-5xl">
                {plan.price}
              </span>
              <span className="mb-1 text-sm text-muted-foreground">/mês</span>
            </div>
          ) : (
            <p className="text-sm font-semibold text-foreground">{plan.priceLabel}</p>
          )}
          {plan.price != null && (
            <p className="mt-1 text-xs text-muted-foreground/70">
              Sem fidelidade · Cancele quando quiser
            </p>
          )}
        </div>
      </div>

      <ul className="mb-6 flex flex-1 flex-col gap-2.5" role="list">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-foreground/75">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            {feature}
          </li>
        ))}
        {plan.notIncluded?.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground/60">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <a
          href={buildWhatsAppLink(plan.whatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            plan.highlighted && !isSecondary
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary-hover hover:-translate-y-0.5"
              : "border border-border bg-background text-foreground hover:border-primary/40 hover:text-primary"
          )}
          aria-label={`Solicitar ${plan.name} via WhatsApp`}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          {isSecondary ? "Consultar disponibilidade" : "Quero este plano"}
        </a>
      </div>
    </motion.div>
  );
}
