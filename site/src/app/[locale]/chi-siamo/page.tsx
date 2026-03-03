import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { AboutPageClient } from "./client";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const path = locale === "it" ? "/chi-siamo" : "/en/chi-siamo";
  const url = `${SITE.url}${path}`;
  return {
    title: t("chiSiamo.title"),
    description: t("chiSiamo.description"),
    alternates: {
      canonical: url,
      languages: { it: `${SITE.url}/chi-siamo`, en: `${SITE.url}/en/chi-siamo` },
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

export default function ChiSiamoPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <AboutPageClient />;
}
