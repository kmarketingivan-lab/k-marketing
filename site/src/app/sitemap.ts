import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { SITE, localeBase } from "@/lib/constants";
import { SERVICE_SLUGS } from "@/lib/services";
import { BLOG_SLUGS } from "@/lib/blog";

const SITE_URL = SITE.url;
const IT = localeBase("it"); // "/it" in static export, "" in SSR
const EN = localeBase("en"); // always "/en"

const staticRoutes = [
  "",
  "/servizi",
  "/casi-studio",
  "/chi-siamo",
  "/contatti",
  "/blog",
  "/privacy",
  "/cookies",
  "/termini",
];

const legalRoutes = new Set(["/privacy", "/cookies", "/termini"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const itPages: MetadataRoute.Sitemap = staticRoutes.map((route) => {
    const isLegal = legalRoutes.has(route);
    return {
      url: `${SITE_URL}${IT}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" : isLegal ? "yearly" : "monthly",
      priority: route === "" ? 1 : isLegal ? 0.3 : 0.8,
      alternates: {
        languages: {
          it: `${SITE_URL}${IT}${route}`,
          en: `${SITE_URL}${EN}${route}`,
        },
      },
    };
  });

  const enPages: MetadataRoute.Sitemap = staticRoutes.map((route) => {
    const isLegal = legalRoutes.has(route);
    return {
      url: `${SITE_URL}${EN}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" : isLegal ? "yearly" : "monthly",
      priority: route === "" ? 0.9 : isLegal ? 0.2 : 0.7,
      alternates: {
        languages: {
          it: `${SITE_URL}${IT}${route}`,
          en: `${SITE_URL}${EN}${route}`,
        },
      },
    };
  });

  const itCaseStudies: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}${IT}/casi-studio/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        it: `${SITE_URL}${IT}/casi-studio/${cs.slug}`,
        en: `${SITE_URL}${EN}/casi-studio/${cs.slug}`,
      },
    },
  }));

  const enCaseStudies: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}${EN}/casi-studio/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        it: `${SITE_URL}${IT}/casi-studio/${cs.slug}`,
        en: `${SITE_URL}${EN}/casi-studio/${cs.slug}`,
      },
    },
  }));

  const itServices: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}${IT}/servizi/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
    alternates: {
      languages: {
        it: `${SITE_URL}${IT}/servizi/${slug}`,
        en: `${SITE_URL}${EN}/servizi/${slug}`,
      },
    },
  }));

  const enServices: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}${EN}/servizi/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    alternates: {
      languages: {
        it: `${SITE_URL}${IT}/servizi/${slug}`,
        en: `${SITE_URL}${EN}/servizi/${slug}`,
      },
    },
  }));

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

  const enBlog: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}${EN}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        it: `${SITE_URL}${IT}/blog/${slug}`,
        en: `${SITE_URL}${EN}/blog/${slug}`,
      },
    },
  }));

  return [...itPages, ...enPages, ...itServices, ...enServices, ...itBlog, ...enBlog, ...itCaseStudies, ...enCaseStudies];
}
