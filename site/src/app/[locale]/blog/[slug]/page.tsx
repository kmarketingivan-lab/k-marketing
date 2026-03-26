import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE, localeBase } from "@/lib/constants";
import { blogPosts, BLOG_SLUGS } from "@/lib/blog";
import { BlogArticleClient } from "./client";

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!BLOG_SLUGS.includes(slug)) return { title: "Not Found" };
  const t = await getTranslations({ locale, namespace: "blog" });
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const url = `${SITE.url}${localeBase(locale)}/blog/${slug}`;
  const title = `${t(`posts.${slug}.title`)} | K-Marketing`;
  const description = t(`posts.${slug}.excerpt`);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        it: `${SITE.url}${localeBase("it")}/blog/${slug}`,
        en: `${SITE.url}${localeBase("en")}/blog/${slug}`,
        "x-default": `${SITE.url}${localeBase("it")}/blog/${slug}`,
      },
    },
    openGraph: { title, description, url, siteName: SITE.name, locale: ogLocale, type: "article" },
  };
}

function getJsonLd(locale: string, slug: string, title: string, description: string, date: string) {
  const base = localeBase(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}${base}` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}${base}/blog` },
          { "@type": "ListItem", position: 3, name: title, item: `${SITE.url}${base}/blog/${slug}` },
        ],
      },
      {
        "@type": "Article",
        headline: title,
        description,
        datePublished: date,
        author: { "@type": "Person", name: SITE.founder },
        publisher: { "@id": `${SITE.url}/#organization` },
        mainEntityOfPage: `${SITE.url}${base}/blog/${slug}`,
      },
    ],
  };
}

export default async function BlogPostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!BLOG_SLUGS.includes(slug)) notFound();
  setRequestLocale(locale);
  const post = blogPosts.find((p) => p.slug === slug)!;
  const t = await getTranslations({ locale, namespace: "blog" });
  const title = t(`posts.${slug}.title`);
  const description = t(`posts.${slug}.excerpt`);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(locale, slug, title, description, post.date)) }}
      />
      <BlogArticleClient slug={slug} />
    </>
  );
}
