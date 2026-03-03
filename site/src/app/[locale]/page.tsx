import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
// v4 — editorial magazine + sfondi alternati (navy → arancio → bianco → navy → arancio)
// backup v1 in: @/components/sections/
// backup v2 in: @/components/sections-v2/
// backup v3 in: @/components/sections-v3/
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections-v4/hero";
import { TickerBand } from "@/components/sections-v4/ticker";

const ServicesPreview = dynamic(
  () => import("@/components/sections-v4/services-preview").then((m) => m.ServicesPreview),
  { ssr: false },
);
const SplitPanel = dynamic(
  () => import("@/components/sections-v4/split-panel").then((m) => m.SplitPanel),
  { ssr: false },
);
const CtaSection = dynamic(
  () => import("@/components/sections-v4/cta-section").then((m) => m.CtaSection),
  { ssr: false },
);

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const url = locale === "it" ? SITE.url : `${SITE.url}/en`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: { it: SITE.url, en: `${SITE.url}/en` },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: SITE.name,
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/icon/large`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        email: SITE.email,
        contactType: "customer service",
        availableLanguage: ["Italian", "English"],
      },
      founder: {
        "@type": "Person",
        name: SITE.founder,
      },
      foundingDate: String(SITE.foundedYear),
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#localbusiness`,
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brescia",
        addressRegion: "Lombardia",
        addressCountry: "IT",
      },
      areaServed: {
        "@type": "Country",
        name: "Italy",
      },
      priceRange: "$$",
      image: `${SITE.url}/icon/large`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      inLanguage: ["it", "en"],
      publisher: { "@id": `${SITE.url}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE.url}/casi-studio?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <TickerBand />
      <ServicesPreview />
      <SplitPanel />
      <CtaSection />
    </>
  );
}