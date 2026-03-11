"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/../../navigation";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ParticleField } from "@/components/ui/particle-field";
import { caseStudies } from "@/lib/case-studies";
import { serviceKeyToSlug } from "@/lib/services";
import { SITE } from "@/lib/constants";
import { CaseMediaGallery } from "@/components/ui/case-media";

export function CaseStudyDetailClient({ slug }: { slug: string }) {
  const t = useTranslations("caseStudiesPage");
  const tServices = useTranslations("services");
  const cs = caseStudies.find((c) => c.slug === slug)!;

  const sections = [
    {
      key: "challenge",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      key: "solution",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      key: "results",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-24 md:px-12 md:py-32">
        <ParticleField color="237,236,237" particleCount={300} maxConnectionDist={0} mouseRadius={300} />
        <div className="relative z-[1]">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: t("overline"), href: "/casi-studio" },
            { label: t(`items.${slug}.title`) },
          ]} />
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
              <div className="mb-4 text-orange-500">{sec.icon}</div>
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
              <Link
                key={svc}
                href={`/servizi/${serviceKeyToSlug[svc] ?? svc}`}
                className="rounded-[3px] border border-navy-800/[0.1] px-4 py-2 text-sm font-medium text-navy-800/60 transition-colors hover:border-orange-500/30 hover:text-orange-500 dark:border-gray-100/[0.1] dark:text-gray-100/50"
              >
                {tServices(`items.${svc}.title`)}
              </Link>
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
              <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="h-auto whitespace-normal py-3 text-sm md:text-[17px]">{t("cta")}</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
