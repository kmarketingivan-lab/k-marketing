"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/ui/particle-field";
import { SERVICE_KEYS, serviceIcons } from "@/components/ui/service-icons";
import { SITE } from "@/lib/constants";

export function ServicesPageClient() {
  const t = useTranslations("servicesPage");

  return (
    <>
      {/* Hero — navy */}
      <section className="grain relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-28 md:px-12 md:py-36">
        <ParticleField color="237,236,237" particleCount={300} maxConnectionDist={0} mouseRadius={300} />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-1/3 h-[400px] w-[500px] rounded-full bg-orange-500/[0.06] blur-[120px]" />
        </div>
        <div className="relative z-[1] mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="mb-5 inline-flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-orange-500">
              <span className="inline-block h-[1.5px] w-5 bg-orange-500" />
              {t("overline")}
              <span className="inline-block h-[1.5px] w-5 bg-orange-500" />
            </div>
            <h1 className="mb-6 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-gray-100">
              {t("title")}{" "}
              <em className="font-light italic text-gray-100/40">{t("titleItalic")}</em>
            </h1>
            <p className="mx-auto max-w-xl text-base font-light leading-[1.75] text-gray-100/50">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid — white */}
      <section className="grain-light relative z-[1] bg-gray-50 px-6 py-24 dark:bg-navy-800 md:px-12 md:py-32">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_KEYS.map((key, i) => {
            const features = t.raw(`items.${key}.features`) as Array<{ title: string; desc: string }>;
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
                className="group rounded-2xl border border-navy-800/[0.06] bg-white p-8 transition-all duration-300 hover:border-orange-500/20 hover:shadow-lg dark:border-gray-100/[0.06] dark:bg-navy-900/50 dark:hover:border-orange-500/30 md:p-10"
              >
                {/* Icon + Title */}
                <div className="mb-2 text-orange-500">{serviceIcons[key]}</div>
                <h2 className="mb-3 text-[clamp(1.3rem,2.5vw,1.7rem)] font-semibold leading-tight tracking-tight text-navy-800 dark:text-gray-100">
                  {t(`items.${key}.title`)}
                </h2>
                <p className="mb-8 text-sm font-light leading-[1.75] text-navy-700/60 dark:text-gray-100/50">
                  {t(`items.${key}.desc`)}
                </p>

                {/* Features */}
                <div className="space-y-5">
                  {features.map((feat, fi) => (
                    <div key={fi} className="flex gap-3.5">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ff6700" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy-800 dark:text-gray-100">{feat.title}</div>
                        <div className="text-[0.8rem] font-light leading-[1.65] text-navy-700/50 dark:text-gray-100/40">{feat.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CTA bottom — navy */}
      <section className="grain relative z-[1] overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-24 md:px-12 md:py-32">
        <ParticleField color="237,236,237" particleCount={200} maxConnectionDist={0} mouseRadius={250} />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[350px] w-[400px] rounded-full bg-orange-500/[0.05] blur-[120px]" />
        </div>
        <div className="relative z-[1] mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <h2 className="mb-6 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-gray-100">
              {t("title")}{" "}
              <em className="font-light italic text-gray-100/40">{t("titleItalic")}</em>
            </h2>
            <p className="mx-auto mb-10 max-w-md text-base font-light leading-[1.75] text-gray-100/50">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">{t("cta")}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
