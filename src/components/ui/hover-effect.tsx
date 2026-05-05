/**
 * HoverEffect — card grid with animated gradient border on hover.
 * Usage:
 *   <HoverEffect items={[{ title, description, link }]} />
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HoverEffectItem {
  title: string;
  description: string;
  link?: string;
  icon?: React.ReactNode;
}

interface HoverEffectProps {
  items: HoverEffectItem[];
  className?: string;
}

export function HoverEffect({ items, className }: HoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, idx) => {
        const Wrapper = item.link ? "a" : "div";
        const wrapperProps = item.link
          ? { href: item.link, rel: "noopener noreferrer" }
          : {};

        return (
          <Wrapper
            key={idx}
            {...wrapperProps}
            className="group relative block rounded-2xl p-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Animated glow border */}
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 block rounded-2xl bg-primary/20"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.05 } }}
                />
              )}
            </AnimatePresence>

            {/* Card content */}
            <div className="relative z-10 h-full rounded-[15px] border border-card-border bg-card p-6 transition-shadow duration-300 group-hover:shadow-card-hover">
              {item.icon && (
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
              )}
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
