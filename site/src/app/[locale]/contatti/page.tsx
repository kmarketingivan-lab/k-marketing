import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { ContactPageClient } from "./client";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const path = locale === "it" ? "/contatti" : "/en/contatti";
  const url = `${SITE.url}${path}`;
  return {
    title: t("contatti.title"),
    description: t("contatti.description"),
    alternates: {
      canonical: url,
      languages: { it: `${SITE.url}/contatti`, en: `${SITE.url}/en/contatti` },
    },
    openGraph: {
      title: t("contatti.title"),
      description: t("contatti.description"),
      url,
      siteName: SITE.name,
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("contatti.title"),
      description: t("contatti.description"),
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
      { "@type": "ListItem", position: 2, name: locale === "it" ? "Contatti" : "Contact", item: `${SITE.url}${prefix}/contatti` },
    ],
  };
}

export default function ContattiPage({
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
      <ContactPageClient />
    </>
  );
}
