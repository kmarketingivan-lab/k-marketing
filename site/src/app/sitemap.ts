import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";

const SITE_URL = "https://k-marketing.it";

const staticRoutes = [
  "",
  "/servizi",
  "/casi-studio",
  "/chi-siamo",
  "/contatti",
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

  return [...itPages, ...enPages, ...itCaseStudies, ...enCaseStudies];
}
