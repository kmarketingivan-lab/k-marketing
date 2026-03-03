"use client";

import { useTranslations } from "next-intl";

export function LegalPageClient({ pageKey }: { pageKey: "privacy" | "cookies" | "termini" }) {
  const t = useTranslations("legal");

  return (
    <section className="bg-gray-50 px-6 py-24 dark:bg-navy-800 md:px-12 md:py-32">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-10 text-3xl font-semibold tracking-tight text-navy-800 dark:text-gray-100 md:text-4xl">
          {t(`${pageKey}.title`)}
        </h1>
        <div className="space-y-6">
          {t(`${pageKey}.content`)
            .split("\n\n")
            .map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-[1.85] text-navy-700/70 dark:text-gray-100/50"
              >
                {paragraph}
              </p>
            ))}
        </div>
      </div>
    </section>
  );
}
