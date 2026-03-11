import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { LegalPageClient } from "@/components/legal-page";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: `${t("termini.title")} | ${SITE.name}`,
    robots: { index: false, follow: false },
  };
}

export default function TerminiPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <LegalPageClient pageKey="termini" />;
}
