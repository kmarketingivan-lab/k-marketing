import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, localeBase } from "@/lib/constants";
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
  const url = `${SITE.url}${localeBase(locale)}/servizi/${slug}`;
  return {
    title: t(`${key}.metaTitle`),
    description: t(`${key}.metaDesc`),
    alternates: {
      canonical: url,
      languages: {
        it: `${SITE.url}${localeBase("it")}/servizi/${slug}`,
        en: `${SITE.url}${localeBase("en")}/servizi/${slug}`,
        "x-default": `${SITE.url}${localeBase("it")}/servizi/${slug}`,
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

interface FaqItem { question: string; answer: string }

function getJsonLd(locale: string, slug: string, serviceName: string, faqs: FaqItem[]) {
  const base = localeBase(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}${base}` },
          { "@type": "ListItem", position: 2, name: locale === "it" ? "Servizi" : "Services", item: `${SITE.url}${base}/servizi` },
          { "@type": "ListItem", position: 3, name: serviceName, item: `${SITE.url}${base}/servizi/${slug}` },
        ],
      },
      {
        "@type": "Service",
        name: serviceName,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: { "@type": "City", name: "Brescia" },
        url: `${SITE.url}${base}/servizi/${slug}`,
      },
      // FAQPage schema — abilita rich results "Domande frequenti" in Google SERP
      // e aumenta la probabilità di citazione in Google AI Overviews e ChatGPT (AEO/GEO)
      ...(faqs.length > 0 ? [{
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }] : []),
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
  const faqs = t.raw(`${key}.faq`) as FaqItem[];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(locale, slug, serviceName, faqs)) }}
      />
      <ServiceDetailClient serviceKey={key} />
    </>
  );
}
