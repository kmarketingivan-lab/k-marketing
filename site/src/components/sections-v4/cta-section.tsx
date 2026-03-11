"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ParticleField } from "@/components/ui/particle-field";
import { useTheme } from "@/components/theme-provider";
import { SITE } from "@/lib/constants";

export function CtaSection() {
  const t = useTranslations("ctaSection");
  const { theme } = useTheme();

  return (
    <section className="grain relative z-[1] flex min-h-[55vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 px-6 py-24 text-center dark:from-navy-900 dark:via-navy-800 dark:to-navy-700 md:px-12">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[400px] w-[500px] rounded-full bg-white/[0.08] blur-[120px] dark:bg-orange-500/[0.06]" />
        <div className="absolute bottom-0 right-1/4 h-[350px] w-[400px] rounded-full bg-orange-800/[0.15] blur-[100px] dark:bg-navy-400/[0.08]" />
      </div>

      <ParticleField
        color={theme === "dark" ? "237,236,237" : "6,7,36"}
        particleCount={500}
        maxConnectionDist={0}
        mouseRadius={300}
      />

      <div className="relative z-[1]">
        {/* Glow behind text */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-800/[0.25] blur-[100px] dark:bg-orange-500/[0.08]" />
        <div className="mb-6 flex items-center justify-center gap-3 text-[0.7rem] uppercase tracking-[0.25em] text-navy-800 dark:text-gray-100/40">
          <span className="inline-block h-px w-8 bg-navy-800/40 dark:bg-gray-100/20" />
          {t("overline")}
          <span className="inline-block h-px w-8 bg-navy-800/40 dark:bg-gray-100/20" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="mb-10 font-sans text-[clamp(2.5rem,7vw,7rem)] font-semibold leading-[0.95] tracking-tight text-white dark:text-gray-100"
        >
          {t("line1")}<br />
          {t("line2")}<br />
          <em className="font-light italic">
            <span className="text-navy-800 dark:text-orange-500">{t("line3")}</span>
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="mx-auto mb-12 max-w-md text-base font-light leading-[1.7] text-navy-800/70 dark:text-gray-100/50"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-[3px] bg-navy-800 px-8 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-xl dark:bg-orange-500 dark:text-navy-800 dark:hover:bg-orange-400"
          >
            {t("cta")}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white dark:text-gray-100/50 dark:hover:text-gray-100"
          >
            {t("ctaSecondary")} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
