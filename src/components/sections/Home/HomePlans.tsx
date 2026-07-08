import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  MessageCircle,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { buildWhatsAppLink, CENTRAL_WHATSAPP } from "@/lib/whatsapp";
import { usePlanosTerrestres } from "@/hooks/cms/usePlanos";
import { CmsLoading } from "@/components/shared/CmsStates";
import {
  plansCarouselItemClass,
  plansCarouselNavButtonClass,
  plansCarouselTrackClass,
  plansSectionContainerClass,
} from "@/components/sections/Plans/plansCarouselLayout";

export function HomePlans() {
  const reduced = useReducedMotion();
  const { data: plans, isLoading } = usePlanosTerrestres();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;

    const children = Array.from(el.children) as HTMLElement[];
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(center - childCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;

      const child = el.children[index] as HTMLElement | undefined;
      if (!child) return;

      const left = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
      el.scrollTo({
        left: Math.max(0, left),
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [reduced]
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [plans.length, updateScrollState]);

  if (isLoading) return <CmsLoading className="py-24" />;
  if (plans.length === 0) return null;

  return (
    <section
      id="planos"
      aria-label="Planos em destaque"
      className="relative py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className={plansSectionContainerClass}>
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Planos feitos para você
          </p>
          <h2 className="mt-3 text-fluid-xl font-bold tracking-tight">
            Invista em <span className="text-gradient-gold">você</span>
          </h2>
          <p className="mt-4 text-fluid-md leading-relaxed text-muted-foreground">
            Uma mensalidade com acesso a todas as unidades.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/70">
            * Exceto setor aquático
          </p>
        </motion.div>

        <div className="relative mt-10">
          {plans.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={!canScrollPrev}
                aria-label="Plano anterior"
                className={cn(
                  plansCarouselNavButtonClass,
                  "left-0 -translate-x-1/2"
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={!canScrollNext}
                aria-label="Próximo plano"
                className={cn(
                  plansCarouselNavButtonClass,
                  "right-0 translate-x-1/2"
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div
            ref={trackRef}
            className={plansCarouselTrackClass}
            role="list"
            aria-label="Opções de planos"
          >
            {plans.map((plan, idx) => {
              const waLink = buildWhatsAppLink(
                plan.whatsappText ??
                  `Olá! Tenho interesse no plano ${plan.name} da Pacer Academia.`,
                CENTRAL_WHATSAPP
              );

              return (
                <motion.div
                  key={plan.slug}
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
                    plansCarouselItemClass,
                    "relative flex flex-col rounded-2xl border p-6 transition-shadow duration-300",
                    plan.highlighted
                      ? "border-primary/50 bg-white shadow-glow-sm"
                      : "border-border bg-white shadow-sm hover:border-primary/30 hover:shadow-md"
                  )}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="gap-1.5 border-primary/30 bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow-sm">
                        <Star className="h-3 w-3 fill-current" />
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    {plan.name}
                  </p>

                  <div className="mt-4 flex items-end gap-1">
                    {plan.price != null ? (
                      <>
                        <span className="text-xs text-muted-foreground">R$</span>
                        <span className="text-4xl font-bold leading-none tracking-tight">
                          {plan.price}
                        </span>
                        <span className="mb-0.5 text-sm text-muted-foreground">/mês</span>
                      </>
                    ) : (
                      <span className="text-sm font-semibold">{plan.priceLabel}</span>
                    )}
                  </div>

                  <ul
                    className="mt-6 flex flex-1 flex-col gap-2.5"
                    aria-label={`Benefícios do plano ${plan.name}`}
                  >
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm text-foreground/75"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        {feat}
                      </li>
                    ))}
                  </ul>

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

          {plans.length > 1 && (
            <div
              role="tablist"
              aria-label="Navegação dos planos"
              className="flex justify-center gap-2"
            >
              {plans.map((plan, i) => (
                <button
                  key={plan.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Ir para o plano ${plan.name}`}
                  onClick={() => scrollToIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    i === activeIndex
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/planos" className="gap-2">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
