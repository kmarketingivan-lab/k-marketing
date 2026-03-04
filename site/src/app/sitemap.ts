import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { SITE } from "@/lib/constants";
import { SERVICE_SLUGS } from "@/lib/services";
import { BLOG_SLUGS } from "@/lib/blog";

const SITE_URL = SITE.url;

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
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" : isLegal ? "yearly" : "monthly",
      priority: route === "" ? 1 : isLegal ? 0.3 : 0.8,
      alternates: {
        languages: {
          it: `${SITE_URL}${route}`,
          en: `${SITE_URL}/en${route}`,
        },
      },
    };
  });

  const enPages: MetadataRoute.Sitemap = staticRoutes.map((route) => {
    const isLegal = legalRoutes.has(route);
    return {
      url: `${SITE_URL}/en${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" : isLegal ? "yearly" : "monthly",
      priority: route === "" ? 0.9 : isLegal ? 0.2 : 0.7,
      alternates: {
        languages: {
          it: `${SITE_URL}${route}`,
          en: `${SITE_URL}/en${route}`,
        },
      },
    };
  });

  const itCaseStudies: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}/casi-studio/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        it: `${SITE_URL}/casi-studio/${cs.slug}`,
        en: `${SITE_URL}/en/casi-studio/${cs.slug}`,
      },
    },
  }));

  const enCaseStudies: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}/en/casi-studio/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        it: `${SITE_URL}/casi-studio/${cs.slug}`,
        en: `${SITE_URL}/en/casi-studio/${cs.slug}`,
      },
    },
  }));

  const itServices: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/servizi/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
    alternates: {
      languages: {
        it: `${SITE_URL}/servizi/${slug}`,
        en: `${SITE_URL}/en/servizi/${slug}`,
      },
    },
  }));

  const enServices: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/en/servizi/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    alternates: {
      languages: {
        it: `${SITE_URL}/servizi/${slug}`,
        en: `${SITE_URL}/en/servizi/${slug}`,
      },
    },
  }));

  const itBlog: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        it: `${SITE_URL}/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
      },
    },
  }));

  const enBlog: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/en/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        it: `${SITE_URL}/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
      },
    },
  }));

  return [...itPages, ...enPages, ...itServices, ...enServices, ...itBlog, ...enBlog, ...itCaseStudies, ...enCaseStudies];
}
