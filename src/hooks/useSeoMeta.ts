import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/config/site";

interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
  /** Absolute or path-only canonical URL for this page */
  canonical?: string;
  /** Set to true for soft 404 / utility pages */
  noIndex?: boolean;
  /** Pre-serialized JSON-LD string */
  jsonLd?: string;
}

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${path}`;
}

export function useSeoMeta({
  title,
  description,
  ogImage,
  canonical,
  noIndex,
  jsonLd,
}: SeoMeta) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const image = absoluteUrl(ogImage ?? DEFAULT_OG_IMAGE);
    const canonicalHref = absoluteUrl(
      canonical ?? `${window.location.pathname}${window.location.search}`
    );

    function upsertMeta(
      selector: string,
      attr: string,
      attrValue: string,
      content: string
    ) {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      let created = false;
      let prevContent: string | null = null;

      if (el) {
        prevContent = el.content;
        el.content = content;
      } else {
        el = document.createElement("meta");
        el.setAttribute(attr, attrValue);
        el.content = content;
        document.head.appendChild(el);
        created = true;
      }

      const captured = el;
      return () => {
        if (created) captured.remove();
        else if (prevContent !== null) captured.content = prevContent;
      };
    }

    function upsertLink(rel: string, href: string) {
      let el = document.querySelector(
        `link[rel="${rel}"]`
      ) as HTMLLinkElement | null;
      let created = false;
      let prevHref: string | null = null;

      if (el) {
        prevHref = el.href;
        el.href = href;
      } else {
        el = document.createElement("link");
        el.rel = rel;
        el.href = href;
        document.head.appendChild(el);
        created = true;
      }

      const captured = el;
      return () => {
        if (created) captured.remove();
        else if (prevHref !== null) captured.href = prevHref;
      };
    }

    const cleanups: (() => void)[] = [
      upsertMeta('meta[name="description"]', "name", "description", description),
      upsertMeta('meta[property="og:title"]', "property", "og:title", title),
      upsertMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        description
      ),
      upsertMeta('meta[property="og:image"]', "property", "og:image", image),
      upsertMeta('meta[property="og:type"]', "property", "og:type", "website"),
      upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalHref),
      upsertMeta(
        'meta[property="og:locale"]',
        "property",
        "og:locale",
        "pt_BR"
      ),
      upsertMeta(
        'meta[property="og:site_name"]',
        "property",
        "og:site_name",
        SITE_NAME
      ),
      upsertMeta(
        'meta[name="twitter:card"]',
        "name",
        "twitter:card",
        "summary_large_image"
      ),
      upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title),
      upsertMeta(
        'meta[name="twitter:description"]',
        "name",
        "twitter:description",
        description
      ),
      upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", image),
      upsertLink("canonical", canonicalHref),
    ];

    if (noIndex) {
      cleanups.push(
        upsertMeta('meta[name="robots"]', "name", "robots", "noindex, follow")
      );
    }

    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.textContent = jsonLd;
      document.head.appendChild(scriptEl);
    }

    return () => {
      document.title = prevTitle;
      cleanups.forEach((fn) => fn());
      scriptEl?.remove();
    };
  }, [title, description, ogImage, canonical, noIndex, jsonLd]);
}
