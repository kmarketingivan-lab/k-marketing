"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/../../navigation";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/ui/particle-field";
import { caseStudies } from "@/lib/case-studies";
import { CaseMediaGallery } from "@/components/ui/case-media";

export function CaseStudyDetailClient({ slug }: { slug: string }) {
  const t = useTranslations("caseStudiesPage");
  const tServices = useTranslations("services");
  const cs = caseStudies.find((c) => c.slug === slug)!;

  const sections = [
    { key: "challenge", icon: "🎯" },
    { key: "solution", icon: "⚙️" },
    { key: "results", icon: "📈" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-24 md:px-12 md:py-32">
        <ParticleField color="237,236,237" particleCount={300} maxConnectionDist={0} mouseRadius={300} />
        <div className="relative z-[1]">
          <Link
            href="/casi-studio"
            className="mb-8 inline-flex items-center text-sm font-medium text-gray-100/40 transition-colors hover:text-orange-400"
          >
            {t("backToList")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-orange-500">
              {t("detailOverline")} — {t(`items.${slug}.subtitle`)}
            </div>
            <h1 className="mb-6 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-gray-100">
              {t(`items.${slug}.title`)}
            </h1>
            <p className="max-w-2xl text-lg font-light leading-[1.75] text-gray-100/50">
              {t(`items.${slug}.desc`)}
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mt-12 flex flex-wrap gap-6 md:gap-12"
          >
            {cs.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-orange-500">{stat.value}</div>
                <div className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-gray-100/35">
                  {t(`stats.${stat.label}`)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Media */}
      <CaseMediaGallery
        slug={slug}
        media={cs.media}
        fallbackTitle={t(`items.${slug}.title`)}
      />

      {/* Challenge / Solution / Results */}
      <section className="bg-gray-50 px-6 pb-24 dark:bg-navy-800 md:px-12 md:pb-32">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-16">
          {sections.map((sec, i) => (
            <motion.div
              key={sec.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="rounded-2xl border border-navy-800/[0.06] bg-white p-8 dark:border-gray-100/[0.06] dark:bg-navy-900/50 md:p-10"
            >
              <div className="mb-4 text-3xl">{sec.icon}</div>
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-navy-800 dark:text-gray-100">
                {t(sec.key)}
              </h2>
              <p className="text-sm font-light leading-[1.8] text-navy-700/60 dark:text-gray-100/50">
                {t(`items.${slug}.${sec.key}`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Services used */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-navy-800/40 dark:text-gray-100/35">
            {t("servicesUsed")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {cs.services.map((svc) => (
              <span
                key={svc}
                className="rounded-[3px] border border-navy-800/[0.1] px-4 py-2 text-sm font-medium text-navy-800/60 dark:border-gray-100/[0.1] dark:text-gray-100/50"
              >
                {tServices(`items.${svc}.title`)}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="grain relative z-[1] overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-24 md:px-12 md:py-32">
        <ParticleField color="237,236,237" particleCount={200} maxConnectionDist={0} mouseRadius={250} />
        <div className="relative z-[1] mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <h2 className="mb-6 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-gray-100">
              {t("cta")}
            </h2>
            <Button variant="primary" size="lg" asChild>
              <Link href="/contatti">{t("cta")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
