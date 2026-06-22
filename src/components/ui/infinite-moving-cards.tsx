/**
 * InfiniteMovingCards — horizontally auto-scrolling card carousel.
 * Supports manual horizontal scroll (drag, trackpad, scrollbar) alongside auto-scroll.
 * Pauses on hover and while the user is interacting. Respects prefers-reduced-motion.
 *
 * Usage:
 *   <InfiniteMovingCards items={[{ quote, name, title }]} speed="normal" />
 */
import { useState, useRef, useEffect } from "react";
import type { PointerEvent, WheelEvent } from "react";
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

const speedDurationSec = { fast: 20, normal: 40, slow: 60 } as const;

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

function TestimonialCard({
  item,
  idx,
  canExpand,
  hideAvatar,
  italicQuote,
  attributionRight,
  onExpand,
}: {
  item: MovingCardItem;
  idx: number;
  canExpand: boolean;
  hideAvatar: boolean;
  italicQuote: boolean;
  attributionRight: boolean;
  onExpand: (item: MovingCardItem) => void;
}) {
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
            onClick={() => onExpand(item)}
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
  const [isHovered, setIsHovered] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const duplicated = [...items, ...items];
  const displayItems = prefersReduced ? items : duplicated;

  useEffect(() => {
    if (prefersReduced) return;

    const el = scrollRef.current;
    if (!el) return;

    if (direction === "right" && el.scrollLeft === 0) {
      el.scrollLeft = el.scrollWidth / 2;
    }

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const paused = isUserScrolling || (pauseOnHover && isHovered);

      if (!paused && el.scrollWidth > el.clientWidth) {
        const half = el.scrollWidth / 2;
        const duration = speedDurationSec[speed];
        const pxPerSec = half / duration;
        const delta = (now - lastTime) / 1000;

        if (direction === "left") {
          el.scrollLeft += pxPerSec * delta;
          if (el.scrollLeft >= half) {
            el.scrollLeft -= half;
          }
        } else {
          el.scrollLeft -= pxPerSec * delta;
          if (el.scrollLeft <= 0) {
            el.scrollLeft += half;
          }
        }
      }

      lastTime = now;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReduced, isUserScrolling, isHovered, pauseOnHover, speed, direction]);

  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, []);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    setIsUserScrolling(true);
  }

  function handlePointerUp() {
    setIsUserScrolling(false);
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    const isHorizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
    if (!isHorizontal) return;

    setIsUserScrolling(true);
    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => setIsUserScrolling(false), 200);
  }

  return (
    <>
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-4 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:thin] sm:px-6",
          className
        )}
        aria-label="Depoimentos"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      >
        {displayItems.map((item, idx) => {
          const canExpand = expandable && item.quote.length > EXPAND_THRESHOLD;

          return (
            <TestimonialCard
              key={idx}
              item={item}
              idx={idx}
              canExpand={canExpand}
              hideAvatar={hideAvatar}
              italicQuote={italicQuote}
              attributionRight={attributionRight}
              onExpand={setSelectedItem}
            />
          );
        })}
      </div>

      <Dialog.Root
        open={selectedItem !== null}
        onOpenChange={(next) => !next && setSelectedItem(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
          <Dialog.Content
            className={cn(
              "fixed left-1/2 top-1/2 z-50 flex w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col",
              "max-h-[min(85vh,520px)] overflow-hidden rounded-2xl border border-border bg-background shadow-xl focus:outline-none"
            )}
            aria-describedby={selectedItem ? "testimonial-modal-quote" : undefined}
          >
            {selectedItem && (
              <>
                <div className="relative shrink-0 border-b border-border px-6 py-5 sm:px-8">
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
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-8">
                  <Dialog.Description
                    id="testimonial-modal-quote"
                    className={cn(
                      "text-sm leading-relaxed text-muted-foreground",
                      italicQuote && "italic"
                    )}
                    asChild
                  >
                    <blockquote>
                      <QuoteParagraphs quote={selectedItem.quote} />
                    </blockquote>
                  </Dialog.Description>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
