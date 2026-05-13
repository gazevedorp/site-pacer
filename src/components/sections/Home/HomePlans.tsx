import { motion, useReducedMotion } from "framer-motion";
import { Check, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { homePlans, whatsappNumber } from "@/data/home";

export function HomePlans() {
  const reduced = useReducedMotion();
  return (
    <section
      id="planos"
      aria-label="Planos em destaque"
      className="relative py-24 sm:py-32"
    >
      {/* Top divider */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Heading ────────────────────────────────────────────── */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Planos
          </p>
          <h2 className="mt-3 text-fluid-xl font-bold tracking-tight">
            Invista em <span className="text-gradient-gold">você</span>
          </h2>
          <p className="mt-4 text-fluid-md leading-relaxed text-muted-foreground">
            Escolha o plano ideal. Todas as aulas coletivas já estão inclusas
            na mensalidade — sem surpresas.
          </p>
        </motion.div>

        {/* ── Cards — scroll-snap on mobile ──────────────────────── */}
        {/*
          Desktop: 3 colunas lado a lado.
          Mobile: scroll-snap horizontal (1 card visível por vez).
        */}
        <div
          className={cn(
            // Mobile: snap container
            "snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 pb-8 pt-10",
            "flex gap-5",
            // Tablet+: revert to normal grid
            "sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0 sm:grid sm:grid-cols-3 sm:flex-none sm:gap-6"
          )}
          role="list"
          aria-label="Opções de planos"
        >
          {homePlans.map((plan, idx) => {
            const waText = encodeURIComponent(
              plan.whatsappText ??
                `Olá! Tenho interesse no plano ${plan.name} da Pacer Academia.`
            );
            const waLink = `https://wa.me/${whatsappNumber}?text=${waText}`;

            return (
              <motion.div
                key={plan.id}
                role="listitem"
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  // Mobile: fixed-width snap card
                  "snap-start w-[80vw] shrink-0",
                  // Tablet+: auto width
                  "sm:w-auto sm:shrink",
                  // Base card styles
                  "relative flex flex-col rounded-2xl border p-6 transition-shadow duration-300",
                  plan.highlighted
                    ? "border-primary/50 bg-white shadow-glow-sm sm:scale-[1.03] origin-center"
                    : "border-border bg-white shadow-sm hover:shadow-md hover:border-primary/30"
                )}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="gap-1.5 border-primary/30 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold shadow-glow-sm">
                      <Star className="h-3 w-3 fill-current" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                {/* Plan name */}
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  {plan.name}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-xs text-muted-foreground">R$</span>
                  <span className={cn(
                    "text-4xl font-bold leading-none tracking-tight",
                    plan.highlighted ? "text-foreground" : "text-foreground"
                  )}>
                    {plan.price}
                  </span>
                  <span className="mb-0.5 text-sm text-muted-foreground">/{plan.period}</span>
                </div>

                {/* Features list */}
                <ul className="mt-6 flex flex-1 flex-col gap-2.5" aria-label={`Benefícios do plano ${plan.name}`}>
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-foreground/75">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  size="default"
                  variant={plan.highlighted ? "default" : "outline"}
                  className="mt-8 w-full justify-center gap-2"
                  asChild
                >
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Quero este plano
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="mt-8 text-center text-xs text-muted-foreground/60"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          * Valores ilustrativos. Consulte a unidade mais próxima para confirmar preços vigentes.
        </motion.p>
      </div>
    </section>
  );
}
