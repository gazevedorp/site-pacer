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

export function LenisProvider({
  children,
  lerp = 0.1,
  wheelMultiplier = 1,
}: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp, smoothWheel: true, wheelMultiplier });
    lenisRef.current = lenis;

    let rafHandle: number;
    const raf = (t: number) => {
      lenis.raf(t);
      rafHandle = requestAnimationFrame(raf);
    };
    rafHandle = requestAnimationFrame(raf);

    return () => {
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
