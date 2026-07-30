import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  createElement,
} from "react";

// ─── Context ────────────────────────────────────────────────────────────────

const LenisContext = createContext<React.MutableRefObject<Lenis | null> | null>(
  null
);

// ─── Provider ───────────────────────────────────────────────────────────────

interface LenisProviderProps {
  children: ReactNode;
  lerp?: number;
  wheelMultiplier?: number;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LenisProvider({
  children,
  lerp = 0.1,
  wheelMultiplier = 1,
}: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({ lerp, smoothWheel: true, wheelMultiplier });
    lenisRef.current = lenis;

    let rafHandle: number;
    const raf = (t: number) => {
      lenis.raf(t);
      rafHandle = requestAnimationFrame(raf);
    };
    rafHandle = requestAnimationFrame(raf);

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      if (media.matches) {
        cancelAnimationFrame(rafHandle);
        lenis.destroy();
        lenisRef.current = null;
      }
    };
    media.addEventListener("change", onMotionChange);

    return () => {
      media.removeEventListener("change", onMotionChange);
      cancelAnimationFrame(rafHandle);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [lerp, wheelMultiplier]);

  return createElement(LenisContext.Provider, { value: lenisRef }, children);
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * Access the global Lenis instance.
 * Use lenis.scrollTo(target, options) to programmatically scroll.
 */
export function useLenis() {
  return useContext(LenisContext);
}
