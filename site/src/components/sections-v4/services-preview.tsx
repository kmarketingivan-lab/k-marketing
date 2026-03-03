"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SERVICE_KEYS } from "@/components/ui/service-icons";

export function ServicesPreview() {
  const t = useTranslations("services");

  return (
    <section
      id="servizi"
      className="grain-light relative z-[1] grid gap-12 overflow-hidden bg-gray-50 px-6 py-24 dark:bg-navy-800 md:grid-cols-[280px_1fr] md:gap-20 md:px-12 md:py-30"
    >
      {/* Left sticky sidebar */}
      <div className="relative z-[1] md:sticky md:top-28 md:h-fit">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <div className="mb-5 flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-orange-500">
            <span className="inline-block h-[1.5px] w-5 bg-orange-500" />
            {t("overline")}
          </div>
          <h2 className="mb-7 text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tight text-navy-800 dark:text-gray-100">
            {t("title")}<br />{t("titleBreak")}<br />
            <em className="font-light italic text-navy-800/40 dark:text-gray-100/40">{t("titleItalic")}</em>
          </h2>
        </motion.div>
      </div>

      {/* Right — service items */}
      <div className="relative z-[1]">
        {SERVICE_KEYS.map((key, i) => {
          const tags = t.raw(`items.${key}.tags`) as string[];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.75, delay: (i % 3) * 0.1 }}
              className="group grid cursor-default grid-cols-[36px_1fr] items-start gap-5 border-b border-navy-800/[0.08] py-9 transition-all duration-300 hover:pl-4 dark:border-gray-100/[0.08] md:grid-cols-[52px_1fr_auto]"
              style={i === 0 ? { borderTop: "1px solid rgba(6,7,36,0.08)" } : {}}
            >
              <div className="pt-1.5 text-base italic text-navy-800/35 dark:text-gray-100/35">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="mb-2.5 text-[clamp(1.4rem,3vw,2.2rem)] font-semibold leading-[1.1] tracking-tight text-navy-800 transition-colors duration-300 group-hover:text-orange-500 dark:text-gray-100">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="max-w-md text-sm font-light leading-[1.7] text-navy-700/60 dark:text-gray-100/50">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
              <div className="hidden flex-col items-end gap-1.5 pt-2 md:flex">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="w-[120px] rounded-[3px] border border-navy-800/[0.12] px-3 py-1 text-center text-[0.65rem] uppercase tracking-[0.12em] text-navy-800/40 dark:border-gray-100/[0.12] dark:text-gray-100/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
