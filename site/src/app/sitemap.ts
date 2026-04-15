import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { SITE, localeBase } from "@/lib/constants";
import { SERVICE_SLUGS } from "@/lib/services";
import { BLOG_SLUGS } from "@/lib/blog";

const SITE_URL = SITE.url;
const IT = localeBase("it"); // "/it" in static export, "" in SSR
const EN = localeBase("en"); // always "/en"

// Solo le route IT indicizzabili — escluse le pagine legali (non portano valore SEO)
const indexableRoutes = [
  "",
  "/servizi",
  "/casi-studio",
  "/chi-siamo",
  "/contatti",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Pagine statiche IT
  const itPages: MetadataRoute.Sitemap = indexableRoutes.map((route) => ({
    url: `${SITE_URL}${IT}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/servizi" ? 0.9 : 0.8,
    alternates: {
      languages: {
        it: `${SITE_URL}${IT}${route}`,
        en: `${SITE_URL}${EN}${route}`,
      },
    },
  }));

  // Servizi IT (alta priorità — pagine target per keyword locali)
  const itServices: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}${IT}/servizi/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
    alternates: {
      languages: {
        it: `${SITE_URL}${IT}/servizi/${slug}`,
        en: `${SITE_URL}${EN}/servizi/${slug}`,
      },
    },
  }));

  // Blog IT
  const itBlog: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}${IT}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        it: `${SITE_URL}${IT}/blog/${slug}`,
        en: `${SITE_URL}${EN}/blog/${slug}`,
      },
    },
  }));

  // Casi Studio IT
  const itCaseStudies: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}${IT}/casi-studio/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    alternates: {
      languages: {
        it: `${SITE_URL}${IT}/casi-studio/${cs.slug}`,
        en: `${SITE_URL}${EN}/casi-studio/${cs.slug}`,
      },
    },
  }));

  // Nota: versioni EN escluse dalla sitemap nella fase attuale.
  // Il sito è primariamente italiano e il target è locale (Brescia).
  // Le versioni EN verranno reintrodotte quando il dominio avrà più autorità.
  return [...itPages, ...itServices, ...itBlog, ...itCaseStudies];
}
