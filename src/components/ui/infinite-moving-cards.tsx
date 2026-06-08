/**
 * InfiniteMovingCards — horizontally auto-scrolling card carousel.
 * Uses CSS animation (no JS scroll, GPU-friendly).
 * Pauses on hover and respects prefers-reduced-motion.
 *
 * Usage:
 *   <InfiniteMovingCards items={[{ quote, name, title }]} speed="normal" />
 */
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface MovingCardItem {
  quote: string;
  name: string;
  title?: string;
  avatar?: string;
}

interface InfiniteMovingCardsProps {
  items: MovingCardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  hideAvatar?: boolean;
  italicQuote?: boolean;
  attributionRight?: boolean;
  className?: string;
}

const speedMap = { fast: "20s", normal: "40s", slow: "60s" } as const;

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  hideAvatar = false,
  italicQuote = false,
  attributionRight = false,
  className,
}: InfiniteMovingCardsProps) {
  const prefersReduced = useReducedMotion();
  // Duplicate items for seamless loop
  const duplicated = [...items, ...items];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-label="Depoimentos"
    >
      {/* Fade masks — subtle edge softening */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background/40 to-transparent sm:w-14"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background/40 to-transparent sm:w-14"
      />

      <div
        className={cn(
          "flex gap-4",
          !prefersReduced && "infinite-scroll",
          pauseOnHover && !prefersReduced && "hover:[animation-play-state:paused]"
        )}
        style={
          prefersReduced
            ? {}
            : {
                animation: `infinite-scroll-${direction} ${speedMap[speed]} linear infinite`,
                width: "max-content",
              }
        }
      >
        {(prefersReduced ? items : duplicated).map((item, idx) => (
          <figure
            key={idx}
            className="relative flex w-72 shrink-0 flex-col rounded-2xl border border-card-border bg-card p-6 shadow-card"
          >
            <blockquote className="flex-1">
              <p
                className={cn(
                  "text-sm leading-relaxed text-card-foreground/75",
                  italicQuote && "italic"
                )}
              >
                &ldquo;{item.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption
              className={cn(
                "mt-4",
                !hideAvatar && !attributionRight && "flex items-center gap-3",
                attributionRight && "text-right"
              )}
            >
              {!hideAvatar &&
                (item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                    {item.name.charAt(0)}
                  </div>
                ))}
              <div className={cn(attributionRight && "ml-auto")}>
                <p className="text-sm font-semibold text-card-foreground">{item.name}</p>
                {item.title && (
                  <p className="text-xs text-card-foreground/60">{item.title}</p>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <style>{`
        @keyframes infinite-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes infinite-scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
