/**
 * BackgroundBeams — animated diagonal SVG beams emanating from bottom-center.
 * Decorative only; hidden from screen readers.
 * Usage: <BackgroundBeams className="absolute inset-0 z-0" />
 */
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface BackgroundBeamsProps {
  className?: string;
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient-1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E9B51D" stopOpacity="0" />
            <stop offset="50%" stopColor="#E9B51D" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E9B51D" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F9DE07" stopOpacity="0" />
            <stop offset="50%" stopColor="#F9DE07" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F9DE07" stopOpacity="0" />
          </linearGradient>
          <filter id="beam-blur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Beam cluster */}
        {[
          { x1: 720, y1: 900, x2: 0,    y2: 0,   w: 2,   g: "beam-gradient-1", d: "0s",   r: prefersReduced ? "0" : "4" },
          { x1: 720, y1: 900, x2: 200,  y2: 0,   w: 1.5, g: "beam-gradient-1", d: "0.5s", r: prefersReduced ? "0" : "3.5" },
          { x1: 720, y1: 900, x2: 400,  y2: 0,   w: 3,   g: "beam-gradient-2", d: "1s",   r: prefersReduced ? "0" : "3" },
          { x1: 720, y1: 900, x2: 600,  y2: 0,   w: 1,   g: "beam-gradient-1", d: "1.5s", r: prefersReduced ? "0" : "4.5" },
          { x1: 720, y1: 900, x2: 720,  y2: 0,   w: 4,   g: "beam-gradient-2", d: "0.2s", r: prefersReduced ? "0" : "5" },
          { x1: 720, y1: 900, x2: 900,  y2: 0,   w: 1,   g: "beam-gradient-1", d: "0.8s", r: prefersReduced ? "0" : "4" },
          { x1: 720, y1: 900, x2: 1100, y2: 0,   w: 2.5, g: "beam-gradient-2", d: "1.2s", r: prefersReduced ? "0" : "3" },
          { x1: 720, y1: 900, x2: 1300, y2: 0,   w: 1.5, g: "beam-gradient-1", d: "0.6s", r: prefersReduced ? "0" : "4" },
          { x1: 720, y1: 900, x2: 1440, y2: 0,   w: 2,   g: "beam-gradient-2", d: "0.3s", r: prefersReduced ? "0" : "3.5" },
        ].map((beam, i) => (
          <line
            key={i}
            x1={beam.x1}
            y1={beam.y1}
            x2={beam.x2}
            y2={beam.y2}
            stroke={`url(#${beam.g})`}
            strokeWidth={beam.w}
            filter="url(#beam-blur)"
            style={
              prefersReduced
                ? {}
                : {
                    animation: `beam-pulse 3s ease-in-out infinite alternate`,
                    animationDelay: beam.d,
                  }
            }
          />
        ))}
      </svg>

      <style>{`
        @keyframes beam-pulse {
          from { opacity: 0.4; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          line { animation: none !important; opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
