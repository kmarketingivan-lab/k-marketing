import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE, localeBase } from "@/lib/constants";
import { fetchNewsArticles } from "@/lib/news-feed";
import { BlogListClient } from "./client";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "blog" });
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const url = `${SITE.url}${localeBase(locale)}/blog`;
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: {
      canonical: url,
      languages: {
        it: `${SITE.url}${localeBase("it")}/blog`,
        en: `${SITE.url}${localeBase("en")}/blog`,
        "x-default": `${SITE.url}${localeBase("it")}/blog`,
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
      url,
      siteName: SITE.name,
      locale: ogLocale,
      type: "website",
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
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}${prefix}/blog` },
    ],
  };
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const newsArticles = await fetchNewsArticles(locale as "it" | "en");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(locale)) }}
      />
      <BlogListClient newsArticles={newsArticles} locale={locale} />
    </>
  );
}
