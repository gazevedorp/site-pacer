/**
 * Spotlight — radial gradient highlight, optionally mouse-tracking.
 * Usage: <Spotlight className="top-0 left-1/2 -translate-x-1/2" fill="#E9B51D" />
 */
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  fill?: string;
  /** Enable mouse-tracking mode (default: false — static gradient) */
  trackMouse?: boolean;
  size?: number;
}

export function Spotlight({
  className,
  fill = "#E9B51D",
  trackMouse = false,
  size = 900,
}: SpotlightProps) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!trackMouse || prefersReduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left - size / 2);
    rawY.set(e.clientY - rect.top - size / 2);
  };

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute rounded-full"
        style={
          trackMouse && !prefersReduced
            ? {
                width: size,
                height: size,
                left: springX,
                top: springY,
                background: `radial-gradient(circle, ${fill}22 0%, ${fill}08 40%, transparent 70%)`,
              }
            : {
                width: size,
                height: size,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle, ${fill}18 0%, ${fill}06 45%, transparent 70%)`,
              }
        }
      />
    </div>
  );
}
