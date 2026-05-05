/**
 * BentoGrid — responsive bento-style layout grid.
 * BentoGrid is the container; BentoCard is an individual cell.
 *
 * Usage:
 *   <BentoGrid>
 *     <BentoCard className="col-span-2" title="..." description="..." icon={<X />} />
 *   </BentoGrid>
 */
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(10rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  background?: ReactNode;
  className?: string;
  /** Index used for stagger animation */
  index?: number;
}

export function BentoCard({
  title,
  description,
  icon,
  background,
  className,
  index = 0,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-card-border bg-card p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover",
        className
      )}
    >
      {background && (
        <div className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-60">
          {background}
        </div>
      )}

      <div className="relative z-10">
        {icon && (
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
