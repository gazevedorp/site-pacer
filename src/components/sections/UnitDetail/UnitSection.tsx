import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionVariant = "default" | "inset" | "dark";

const variantClass: Record<SectionVariant, string> = {
  default: "bg-background py-14 sm:py-16 lg:py-20",
  inset: "border-y border-border/60 bg-muted/30 py-14 sm:py-16 lg:py-20",
  dark: "bg-linear-to-br from-surface via-card to-surface-raised py-14 sm:py-16 lg:py-20",
};

interface UnitSectionProps {
  id?: string;
  ariaLabel: string;
  variant?: SectionVariant;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function UnitSection({
  id,
  ariaLabel,
  variant = "default",
  eyebrow,
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: UnitSectionProps) {
  const reduced = useReducedMotion();
  const isDark = variant === "dark";

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(variantClass[variant], className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {eyebrow}
              </p>
            )}
            <h2
              className={cn(
                "text-fluid-xl font-bold",
                eyebrow ? "mt-2" : "",
                isDark ? "text-white" : "text-foreground"
              )}
            >
              {title}
            </h2>
            {description && (
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed",
                  isDark ? "text-white/50" : "text-muted-foreground"
                )}
              >
                {description}
              </p>
            )}
          </div>
          {action}
        </motion.header>

        <div className={cn("mt-10", contentClassName)}>{children}</div>
      </div>
    </section>
  );
}
