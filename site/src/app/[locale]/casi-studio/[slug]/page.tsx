import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
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
  const path = locale === "it" ? `/casi-studio/${slug}` : `/en/casi-studio/${slug}`;
  const url = `${SITE.url}${path}`;
  const title = `${t(`items.${slug}.title`)} | K-Marketing`;
  const description = t(`items.${slug}.desc`);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        it: `${SITE.url}/casi-studio/${slug}`,
        en: `${SITE.url}/en/casi-studio/${slug}`,
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

export default function CaseStudyPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();
  return <CaseStudyDetailClient slug={slug} />;
}
