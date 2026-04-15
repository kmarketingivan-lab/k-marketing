import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE, localeBase } from "@/lib/constants";
import { AboutPageClient } from "./client";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const url = `${SITE.url}${localeBase(locale)}/chi-siamo`;
  return {
    title: t("chiSiamo.title"),
    description: t("chiSiamo.description"),
    alternates: {
      canonical: url,
      languages: {
        it: `${SITE.url}${localeBase("it")}/chi-siamo`,
        en: `${SITE.url}${localeBase("en")}/chi-siamo`,
        "x-default": `${SITE.url}${localeBase("it")}/chi-siamo`,
      },
    },
    openGraph: {
      title: t("chiSiamo.title"),
      description: t("chiSiamo.description"),
      url,
      siteName: SITE.name,
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("chiSiamo.title"),
      description: t("chiSiamo.description"),
    },
  };
}

function getBreadcrumbJsonLd(locale: string) {
  const prefix = locale === "it" ? "" : "/en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}${prefix}` },
          { "@type": "ListItem", position: 2, name: locale === "it" ? "Chi Siamo" : "About", item: `${SITE.url}${prefix}/chi-siamo` },
        ],
      },
      // Person schema per Ivan Crescini — segnale E-E-A-T per Google e AI Search
      // Collega il fondatore all'organizzazione e alle sue presenze esterne verificabili
      {
        "@type": "Person",
        "@id": `${SITE.url}/#founder`,
        name: SITE.founder,
        jobTitle: locale === "it" ? "Fondatore e Direttore Creativo" : "Founder and Creative Director",
        worksFor: { "@id": `${SITE.url}/#organization` },
        url: `${SITE.url}${prefix}/chi-siamo`,
        sameAs: [
          "https://www.linkedin.com/in/ivan-crescini-358a87248/",
        ],
        knowsAbout: locale === "it"
          ? ["SEO", "Google Ads", "Meta Ads", "Social Media Marketing", "Automazione AI", "Web Development", "Marketing Digitale"]
          : ["SEO", "Google Ads", "Meta Ads", "Social Media Marketing", "AI Automation", "Web Development", "Digital Marketing"],
      },
    ],
  };
}

export default function ChiSiamoPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(locale)) }}
      />
      <AboutPageClient />
    </>
  );
}
