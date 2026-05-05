import { useEffect } from "react";

interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
  /** Pre-serialized JSON-LD string */
  jsonLd?: string;
}

export function useSeoMeta({ title, description, ogImage, jsonLd }: SeoMeta) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

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

    const cleanups: (() => void)[] = [
      upsertMeta('meta[name="description"]', "name", "description", description),
      upsertMeta('meta[property="og:title"]', "property", "og:title", title),
      upsertMeta('meta[property="og:description"]', "property", "og:description", description),
    ];

    if (ogImage) {
      cleanups.push(
        upsertMeta('meta[property="og:image"]', "property", "og:image", ogImage)
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
  }, [title, description, ogImage, jsonLd]);
}
