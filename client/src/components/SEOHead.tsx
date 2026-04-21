import { useEffect } from "react";
import { SITE_URL, SITE_NAME } from "@/lib/schema";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: unknown[] | unknown;
  noindex?: boolean;
}

function upsertMeta(
  selector: string,
  attrs: Record<string, string>
): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
  return el;
}

function upsertLink(rel: string, href: string): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
}

const JSONLD_ATTR = "data-seohead-jsonld";

export function SEOHead({
  title,
  description,
  path,
  image,
  type = "website",
  jsonLd,
  noindex = false,
}: SEOHeadProps) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;
    const ogImage = image ?? `${SITE_URL}/logo-dark.svg`;
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large",
    });
    upsertLink("canonical", canonical);

    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonical,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE_NAME,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: ogImage,
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: fullTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: ogImage,
    });

    document.head
      .querySelectorAll(`script[${JSONLD_ATTR}]`)
      .forEach((n) => n.remove());

    if (jsonLd) {
      const payload = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      payload.forEach((obj, i) => {
        const tag = document.createElement("script");
        tag.type = "application/ld+json";
        tag.setAttribute(JSONLD_ATTR, String(i));
        tag.textContent = JSON.stringify(obj);
        document.head.appendChild(tag);
      });
    }
  }, [title, description, path, image, type, jsonLd, noindex]);

  return null;
}
