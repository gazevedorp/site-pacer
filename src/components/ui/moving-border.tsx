/**
 * MovingBorder — gradient border that animates around the element perimeter.
 * Uses CSS conic-gradient animated via @keyframes (no JS, GPU-friendly).
 *
 * Usage:
 *   <MovingBorder>
 *     <div className="...">Content</div>
 *   </MovingBorder>
 */
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MovingBorderProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** Border thickness in pixels */
  borderWidth?: number;
  /** Animation duration */
  duration?: string;
  /** Gradient colors */
  gradientColors?: string;
  borderRadius?: string;
}

export function MovingBorder({
  children,
  className,
  containerClassName,
  borderWidth = 1,
  duration = "4s",
  gradientColors = "#E9B51D, #F9DE07, transparent, transparent",
  borderRadius = "1rem",
}: MovingBorderProps) {

  return (
    <div
      className={cn("relative", containerClassName)}
      style={{ borderRadius }}
    >
      {/* Animated conic-gradient border */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius, padding: borderWidth }}
      >
        <div
          className="h-full w-full"
          style={{
            borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
            background: `conic-gradient(${gradientColors})`,
            animation: `moving-border-spin ${duration} linear infinite`,
          }}
        />
      </div>

      {/* Inner content */}
      <div
        className={cn("relative z-10", className)}
        style={{ borderRadius: `calc(${borderRadius} - ${borderWidth}px)` }}
      >
        {children}
      </div>

      <style>{`
        @keyframes moving-border-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="moving-border-spin"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
