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
const USER_PAUSE_MS = 3000;
const DRAG_THRESHOLD_PX = 6;

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const userPausedUntilRef = useRef(0);
  const dragStateRef = useRef({ pointerId: -1, startX: 0, startScrollLeft: 0, moved: false });
  const duplicated = [...items, ...items];
  const displayItems = prefersReduced ? items : duplicated;

  function pauseForUser(ms = USER_PAUSE_MS) {
    userPausedUntilRef.current = Date.now() + ms;
  }

  function shouldPauseAutoScroll() {
    return (
      isDraggingRef.current ||
      Date.now() < userPausedUntilRef.current ||
      (pauseOnHover && isHoveredRef.current)
    );
  }

  useEffect(() => {
    if (prefersReduced) return;

    const el = scrollRef.current;
    if (!el) return;

    if (direction === "right" && el.scrollLeft === 0) {
      el.scrollLeft = el.scrollWidth / 2;
    }

    const onScroll = () => {
      if (!isAutoScrollingRef.current) {
        pauseForUser();
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      if (!shouldPauseAutoScroll() && el.scrollWidth > el.clientWidth) {
        const half = el.scrollWidth / 2;
        const duration = speedDurationSec[speed];
        const pxPerSec = half / duration;
        const delta = (now - lastTime) / 1000;

        isAutoScrollingRef.current = true;

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

        isAutoScrollingRef.current = false;
      }

      lastTime = now;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReduced, pauseOnHover, speed, direction]);

  function isInteractiveTarget(target: EventTarget | null) {
    return Boolean(
      target instanceof Element && target.closest("button, a, input, textarea, select, label")
    );
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isInteractiveTarget(event.target)) return;

    const el = scrollRef.current;
    if (!el) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
    pauseForUser();
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    const drag = dragStateRef.current;
    if (!el || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;

    if (!drag.moved) {
      drag.moved = true;
      isDraggingRef.current = true;
      el.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    el.scrollLeft = drag.startScrollLeft - deltaX;
    pauseForUser();
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    const drag = dragStateRef.current;
    if (!el || drag.pointerId !== event.pointerId) return;

    if (drag.moved) {
      try {
        el.releasePointerCapture(event.pointerId);
      } catch {
        // pointer may already be released
      }
      pauseForUser();
    }

    isDraggingRef.current = false;
    dragStateRef.current = { pointerId: -1, startX: 0, startScrollLeft: 0, moved: false };
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;

    const horizontalDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.shiftKey
          ? event.deltaY
          : 0;

    if (horizontalDelta === 0) return;

    event.preventDefault();
    event.stopPropagation();
    el.scrollLeft += horizontalDelta;
    pauseForUser();
  }

  return (
    <>
      <div
        ref={scrollRef}
        data-lenis-prevent
        className={cn(
          "flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 [scrollbar-width:thin] active:cursor-grabbing sm:px-6",
          className
        )}
        style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
        aria-label="Depoimentos"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onWheel={handleWheel}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
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
