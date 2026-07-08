import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PlanCard, type PlanCardData } from "@/components/sections/Plans/PlanCard";
import { cn } from "@/lib/utils";
import type { Plano } from "@/types/cms";

function toPlanCardData(plan: Plano): PlanCardData {
  return {
    id: plan.slug,
    name: plan.name,
    tagline: plan.tagline,
    price: plan.price,
    priceLabel: plan.priceLabel,
    features: plan.features,
    notIncluded: plan.notIncluded,
    highlighted: plan.highlighted,
    badge: plan.badge,
    whatsappText: plan.whatsappText,
    unitsLabel: plan.unitsLabel,
  };
}

interface PlansCarouselProps {
  plans: Plano[];
  variant?: "default" | "secondary";
  ariaLabel: string;
}

export function PlansCarousel({
  plans,
  variant = "default",
  ariaLabel,
}: PlansCarouselProps) {
  const reduced = useReducedMotion();
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

  if (plans.length === 0) return null;

  return (
    <div className="relative">
      {plans.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={!canScrollPrev}
            aria-label="Plano anterior"
            className={cn(
              "absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:flex",
              "h-10 w-10 items-center justify-center rounded-full border border-border bg-white shadow-md transition",
              "hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "disabled:pointer-events-none disabled:opacity-40"
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
              "absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 sm:flex",
              "h-10 w-10 items-center justify-center rounded-full border border-border bg-white shadow-md transition",
              "hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "disabled:pointer-events-none disabled:opacity-40"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <div
        ref={trackRef}
        className={cn(
          "flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pt-10",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "-mx-4 px-4 sm:mx-0 sm:px-0"
        )}
        role="list"
        aria-label={ariaLabel}
      >
        {plans.map((plan, i) => (
          <div
            key={plan.slug}
            role="listitem"
            className="w-[85vw] max-w-[360px] shrink-0 snap-center"
          >
            <PlanCard plan={toPlanCardData(plan)} index={i} variant={variant} />
          </div>
        ))}
      </div>

      {plans.length > 1 && (
        <div
          role="tablist"
          aria-label={`Navegação dos planos — ${ariaLabel}`}
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
  );
}
