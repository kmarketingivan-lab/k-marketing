"use client";

import { useTranslations } from "next-intl";
import { FaqSection, faqJsonLd, type FaqItem } from "@/components/ui/faq";

export function HomeFaq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
      />
      <FaqSection items={items} overline={t("overline")} title={t("title")} />
    </>
  );
}
