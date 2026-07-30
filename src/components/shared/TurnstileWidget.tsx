import { useEffect, useRef, useCallback } from "react";

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  onToken: (token: string | null) => void;
}

/** Renders Cloudflare Turnstile when VITE_TURNSTILE_SITE_KEY is configured. */
export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  const renderWidget = useCallback(() => {
    if (!SITE_KEY || !containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      theme: "light",
      callback: (token) => onTokenRef.current(token),
      "expired-callback": () => onTokenRef.current(null),
      "error-callback": () => onTokenRef.current(null),
    });
  }, []);

  useEffect(() => {
    if (!SITE_KEY) return;

    const existing = document.querySelector(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]'
    );

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const script =
      (existing as HTMLScriptElement | null) ??
      (() => {
        const s = document.createElement("script");
        s.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true;
        document.head.appendChild(s);
        return s;
      })();

    script.addEventListener("load", renderWidget);
    return () => {
      script.removeEventListener("load", renderWidget);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  if (!SITE_KEY) return null;

  return <div ref={containerRef} className="flex justify-start" />;
}

export function isTurnstileRequired(): boolean {
  return Boolean(SITE_KEY);
}
