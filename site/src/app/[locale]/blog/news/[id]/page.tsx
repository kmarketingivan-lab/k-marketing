import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { fetchNewsArticleById, fetchNewsArticleIds } from "@/lib/news-feed";
import { NewsArticleClient } from "./client";

export async function generateStaticParams() {
  const locales = ["it", "en"] as const;
  const params: { locale: string; id: string }[] = [];
  for (const locale of locales) {
    const ids = await fetchNewsArticleIds(locale);
    for (const id of ids) {
      params.push({ locale, id });
    }
  }
  return params;
}

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const article = await fetchNewsArticleById(locale as "it" | "en", id);
  if (!article) return { title: "Not Found" };
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const prefix = locale === "it" ? "" : "/en";
  const url = `${SITE.url}${prefix}/blog/news/${id}`;
  const title = `${article.title} | K-Marketing`;
  return {
    title,
    description: article.excerpt,
    alternates: {
      canonical: url,
      languages: {
        it: `${SITE.url}/blog/news/${id}`,
        en: `${SITE.url}/en/blog/news/${id}`,
        "x-default": `${SITE.url}/blog/news/${id}`,
      },
    },
    openGraph: { title, description: article.excerpt, url, siteName: SITE.name, locale: ogLocale, type: "article" },
  };
}

function getJsonLd(locale: string, id: string, title: string, description: string, date: string) {
  const prefix = locale === "it" ? "" : "/en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}${prefix}` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}${prefix}/blog` },
          { "@type": "ListItem", position: 3, name: title, item: `${SITE.url}${prefix}/blog/news/${id}` },
        ],
      },
      {
        "@type": "Article",
        headline: title,
        description,
        datePublished: date,
        publisher: { "@id": `${SITE.url}/#organization` },
        mainEntityOfPage: `${SITE.url}${prefix}/blog/news/${id}`,
      },
    ],
  };
}

export default async function NewsArticlePage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(locale);
  const article = await fetchNewsArticleById(locale as "it" | "en", id);
  if (!article) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(locale, id, article.title, article.excerpt, article.date)) }}
      />
      <NewsArticleClient article={article} locale={locale} />
    </>
  );
}
