import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
// v4 — editorial magazine + sfondi alternati (navy → arancio → bianco → navy → arancio)
// backup v1 in: @/components/sections/
// backup v2 in: @/components/sections-v2/
// backup v3 in: @/components/sections-v3/
import { HeroSection } from "@/components/sections-v4/hero";
import { TickerBand } from "@/components/sections-v4/ticker";
import { ServicesPreview } from "@/components/sections-v4/services-preview";
import { SplitPanel } from "@/components/sections-v4/split-panel";
import { CtaSection } from "@/components/sections-v4/cta-section";

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
      description:
        "Agenzia di marketing digitale a Brescia. SEO, pubblicità, siti internet, social media e automazione AI per PMI.",
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Brescia",
        addressLocality: "Brescia",
        postalCode: "25121",
        addressRegion: "Lombardia",
        addressCountry: "IT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 45.5416,
        longitude: 10.2118,
      },
      areaServed: [
        { "@type": "City", name: "Brescia" },
        { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
        { "@type": "Country", name: "Italy" },
      ],
      priceRange: "$$",
      image: `${SITE.url}/icon/large`,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servizi di Marketing Digitale",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO e Posizionamento Google" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Marketing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pubblicità Online (Google Ads, Meta Ads)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI e Automazione Marketing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Marketing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Siti Internet e Web Development" } },
        ],
      },
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