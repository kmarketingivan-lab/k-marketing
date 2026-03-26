import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE, localeBase } from "@/lib/constants";
import { caseStudies } from "@/lib/case-studies";
import { CaseStudyDetailClient } from "./client";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Not Found" };
  const t = await getTranslations({ locale, namespace: "caseStudiesPage" });
  const ogLocale = locale === "it" ? "it_IT" : "en_US";
  const url = `${SITE.url}${localeBase(locale)}/casi-studio/${slug}`;
  const title = `${t(`items.${slug}.title`)} | K-Marketing`;
  const description = t(`items.${slug}.desc`);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        it: `${SITE.url}${localeBase("it")}/casi-studio/${slug}`,
        en: `${SITE.url}${localeBase("en")}/casi-studio/${slug}`,
        "x-default": `${SITE.url}${localeBase("it")}/casi-studio/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: ogLocale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function getBreadcrumbJsonLd(locale: string, slug: string, title: string) {
  const base = localeBase(locale);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}${base}` },
      { "@type": "ListItem", position: 2, name: locale === "it" ? "Casi Studio" : "Case Studies", item: `${SITE.url}${base}/casi-studio` },
      { "@type": "ListItem", position: 3, name: title, item: `${SITE.url}${base}/casi-studio/${slug}` },
    ],
  };
}

export default async function CaseStudyPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();
  const t = await getTranslations({ locale, namespace: "caseStudiesPage" });
  const title = t(`items.${slug}.title`);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(locale, slug, title)) }}
      />
      <CaseStudyDetailClient slug={slug} />
    </>
  );
}
