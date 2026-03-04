import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { CaseStudiesListClient } from "./client";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const path = locale === "it" ? "/casi-studio" : "/en/casi-studio";
  const url = `${SITE.url}${path}`;
  return {
    title: t("casiStudio.title"),
    description: t("casiStudio.description"),
    alternates: {
      canonical: url,
      languages: { it: `${SITE.url}/casi-studio`, en: `${SITE.url}/en/casi-studio` },
    },
    openGraph: {
      title: t("casiStudio.title"),
      description: t("casiStudio.description"),
      url,
      siteName: SITE.name,
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("casiStudio.title"),
      description: t("casiStudio.description"),
    },
  };
}

function getBreadcrumbJsonLd(locale: string) {
  const prefix = locale === "it" ? "" : "/en";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}${prefix}` },
      { "@type": "ListItem", position: 2, name: locale === "it" ? "Casi Studio" : "Case Studies", item: `${SITE.url}${prefix}/casi-studio` },
    ],
  };
}

export default function CasiStudioPage({
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
      <CaseStudiesListClient />
    </>
  );
}
