import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/constants";
import { SERVICE_SLUGS, slugToServiceKey, type ServiceSlug } from "@/lib/services";
import { ServiceDetailClient } from "./client";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) return { title: "Not Found" };
  const key = slugToServiceKey[slug as ServiceSlug];
  const t = await getTranslations({ locale, namespace: "serviceDetail" });
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const prefix = locale === "it" ? "" : "/en";
  const url = `${SITE.url}${prefix}/servizi/${slug}`;
  return {
    title: t(`${key}.metaTitle`),
    description: t(`${key}.metaDesc`),
    alternates: {
      canonical: url,
      languages: {
        it: `${SITE.url}/servizi/${slug}`,
        en: `${SITE.url}/en/servizi/${slug}`,
        "x-default": `${SITE.url}/servizi/${slug}`,
      },
    },
    openGraph: {
      title: t(`${key}.metaTitle`),
      description: t(`${key}.metaDesc`),
      url,
      siteName: SITE.name,
      locale: ogLocale,
      type: "website",
    },
  };
}

function getJsonLd(locale: string, slug: string, serviceName: string) {
  const prefix = locale === "it" ? "" : "/en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}${prefix}` },
          { "@type": "ListItem", position: 2, name: locale === "it" ? "Servizi" : "Services", item: `${SITE.url}${prefix}/servizi` },
          { "@type": "ListItem", position: 3, name: serviceName, item: `${SITE.url}${prefix}/servizi/${slug}` },
        ],
      },
      {
        "@type": "Service",
        name: serviceName,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: { "@type": "City", name: "Brescia" },
        url: `${SITE.url}${prefix}/servizi/${slug}`,
      },
    ],
  };
}

export default async function ServiceDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) notFound();
  setRequestLocale(locale);
  const key = slugToServiceKey[slug as ServiceSlug];
  const t = await getTranslations({ locale, namespace: "serviceDetail" });
  const serviceName = t(`${key}.heroTitle`);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(locale, slug, serviceName)) }}
      />
      <ServiceDetailClient serviceKey={key} />
    </>
  );
}
