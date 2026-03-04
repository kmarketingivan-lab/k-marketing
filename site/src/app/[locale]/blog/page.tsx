import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { BlogListClient } from "./client";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "blog" });
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const prefix = locale === "it" ? "" : "/en";
  const url = `${SITE.url}${prefix}/blog`;
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: {
      canonical: url,
      languages: { it: `${SITE.url}/blog`, en: `${SITE.url}/en/blog`, "x-default": `${SITE.url}/blog` },
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

export default function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(locale)) }}
      />
      <BlogListClient />
    </>
  );
}
