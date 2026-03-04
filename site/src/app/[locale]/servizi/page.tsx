import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { ServicesPageClient } from "./client";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const path = locale === "it" ? "/servizi" : "/en/servizi";
  const url = `${SITE.url}${path}`;
  return {
    title: t("servizi.title"),
    description: t("servizi.description"),
    alternates: {
      canonical: url,
      languages: { it: `${SITE.url}/servizi`, en: `${SITE.url}/en/servizi` },
    },
    openGraph: {
      title: t("servizi.title"),
      description: t("servizi.description"),
      url,
      siteName: SITE.name,
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("servizi.title"),
      description: t("servizi.description"),
    },
  };
}

function getJsonLd(locale: string) {
  const prefix = locale === "it" ? "" : "/en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE.url}${prefix}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "it" ? "Servizi" : "Services",
            item: `${SITE.url}${prefix}/servizi`,
          },
        ],
      },
      ...[
        { name: "SEO e Posizionamento Google", desc: "Strategia SEO tecnica e contenuti ottimizzati per posizionarsi su Google a Brescia e in Italia." },
        { name: "Social Media Marketing", desc: "Gestione social media professionale: piano editoriale, contenuti e community management." },
        { name: "Pubblicità Online (Google Ads, Meta Ads)", desc: "Campagne pubblicitarie con ROI misurabile su Google Ads e Meta Ads." },
        { name: "AI e Automazione Marketing", desc: "Chatbot AI, email automation, lead scoring e workflow automatizzati." },
        { name: "Content Marketing", desc: "Blog, newsletter, video e contenuti strategici che generano traffico e lead." },
        { name: "Siti Internet e Web Development", desc: "Siti web e applicazioni veloci, moderni e ottimizzati per convertire." },
      ].map((s) => ({
        "@type": "Service",
        serviceType: s.name,
        description: s.desc,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: { "@type": "City", name: "Brescia" },
      })),
    ],
  };
}

export default function ServiziPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(locale)) }}
      />
      <ServicesPageClient />
    </>
  );
}
