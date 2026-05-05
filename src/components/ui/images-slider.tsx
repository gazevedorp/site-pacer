/**
 * ImagesSlider — full-bleed image slider with overlay content.
 * Keyboard navigable, respects reduced motion.
 *
 * Usage:
 *   <ImagesSlider images={["/img1.jpg", "/img2.jpg"]} autoPlay>
 *     <div className="text-white">Overlay content</div>
 *   </ImagesSlider>
 */
import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagesSliderProps {
  images: string[];
  children?: ReactNode;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  overlay?: boolean;
  /** Alt text array aligned with images */
  alts?: string[];
}

export function ImagesSlider({
  images,
  children,
  className,
  autoPlay = true,
  interval = 5000,
  overlay = true,
  alts = [],
}: ImagesSliderProps) {
  const [current, setCurrent] = useState(0);
  const prefersReduced = useReducedMotion();

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!autoPlay || prefersReduced || images.length <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, next, prefersReduced, images.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Galeria de imagens"
      tabIndex={0}
    >
      {/* Images */}
      <AnimatePresence initial={false}>
        <motion.img
          key={current}
          src={images[current]}
          alt={alts[current] ?? `Imagem ${current + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          width={1440}
          height={900}
          loading={current === 0 ? "eager" : "lazy"}
          decoding="async"
          initial={prefersReduced ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* Overlay */}
      {overlay && (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent"
        />
      )}

      {/* Slot for content */}
      {children && (
        <div className="relative z-10 flex h-full items-end">{children}</div>
      )}

      {/* Nav buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Imagem anterior"
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Próxima imagem"
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div
            role="tablist"
            aria-label="Navegação da galeria"
            className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2"
          >
            {images.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Ir para imagem ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  i === current
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-foreground/40 hover:bg-foreground/60"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
