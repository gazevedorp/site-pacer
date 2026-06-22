/**
 * InfiniteMovingCards — horizontally auto-scrolling card carousel.
 * Uses CSS animation (no JS scroll, GPU-friendly).
 * Pauses on hover and respects prefers-reduced-motion.
 *
 * Usage:
 *   <InfiniteMovingCards items={[{ quote, name, title }]} speed="normal" />
 */
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
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
  expandable?: boolean;
  className?: string;
}

const speedMap = { fast: "20s", normal: "40s", slow: "60s" } as const;

const PREVIEW_CLAMP_LINES = 4;
const EXPAND_THRESHOLD = 180;

function QuoteParagraphs({ quote, className }: { quote: string; className?: string }) {
  return (
    <div className={className}>
      {quote.split("\n\n").map((paragraph, index) => (
        <p key={index} className={index > 0 ? "mt-3" : undefined}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  hideAvatar = false,
  italicQuote = false,
  attributionRight = false,
  expandable = false,
  className,
}: InfiniteMovingCardsProps) {
  const prefersReduced = useReducedMotion();
  const [selectedItem, setSelectedItem] = useState<MovingCardItem | null>(null);
  const duplicated = [...items, ...items];

  return (
    <>
      <div
        className={cn("relative overflow-hidden", className)}
        aria-label="Depoimentos"
      >
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
          {(prefersReduced ? items : duplicated).map((item, idx) => {
            const canExpand = expandable && item.quote.length > EXPAND_THRESHOLD;

            return (
              <figure
                key={idx}
                className="relative flex w-72 shrink-0 flex-col rounded-2xl border border-card-border bg-card p-6 shadow-card"
              >
                <blockquote className="flex-1">
                  <div
                    className={cn(
                      "text-sm leading-relaxed text-card-foreground/75",
                      italicQuote && "italic"
                    )}
                    style={
                      canExpand
                        ? {
                            display: "-webkit-box",
                            WebkitLineClamp: PREVIEW_CLAMP_LINES,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }
                        : undefined
                    }
                  >
                    <p>&ldquo;{item.quote.split("\n\n")[0]}&rdquo;</p>
                  </div>
                  {canExpand && (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="mt-2 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      Ler mais
                    </button>
                  )}
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
            );
          })}
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

      <Dialog.Root
        open={selectedItem !== null}
        onOpenChange={(next) => !next && setSelectedItem(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
          <Dialog.Content
            className={cn(
              "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2",
              "max-h-[min(85vh,520px)] overflow-y-auto rounded-2xl border border-border bg-background p-6 shadow-xl focus:outline-none sm:p-8"
            )}
            aria-describedby={selectedItem ? "testimonial-modal-quote" : undefined}
          >
            {selectedItem && (
              <>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                  aria-label="Fechar depoimento"
                >
                  <X className="h-4 w-4" />
                </button>

                <Dialog.Title className="pr-10 text-lg font-bold text-foreground">
                  {selectedItem.name}
                </Dialog.Title>
                {selectedItem.title && (
                  <p className="mt-1 text-sm text-primary">{selectedItem.title}</p>
                )}

                <Dialog.Description
                  id="testimonial-modal-quote"
                  className={cn(
                    "mt-5 text-sm leading-relaxed text-muted-foreground",
                    italicQuote && "italic"
                  )}
                  asChild
                >
                  <blockquote>
                    <QuoteParagraphs quote={selectedItem.quote} />
                  </blockquote>
                </Dialog.Description>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
