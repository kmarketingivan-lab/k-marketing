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

export default function ServiziPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <ServicesPageClient />;
}
