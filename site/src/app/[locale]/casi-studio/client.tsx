"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/../../navigation";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/ui/particle-field";
import { caseStudies, sectionThemes } from "@/lib/case-studies";
import { SITE } from "@/lib/constants";
import { CaseMediaPreview } from "@/components/ui/case-media";

export function CaseStudiesListClient() {
  const t = useTranslations("caseStudiesPage");
  const tServices = useTranslations("services");

  return (
    <>
      {/* Hero — navy */}
      <section className="grain relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-28 md:px-12 md:py-36">
        <ParticleField color="237,236,237" particleCount={300} maxConnectionDist={0} mouseRadius={300} />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-1/4 h-[400px] w-[500px] rounded-full bg-orange-500/[0.06] blur-[120px]" />
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

      {/* Editorial list — each section themed */}
      {caseStudies.map((cs, i) => {
        const isEven = i % 2 === 0;
        const theme = sectionThemes[i % 3]!;
        return (
          <section
            key={cs.slug}
            className={`${theme.grain} relative overflow-hidden ${theme.bg} px-6 py-20 md:px-12 md:py-28`}
          >
            <ParticleField
              color={theme.particles}
              particleCount={150}
              maxConnectionDist={0}
              mouseRadius={250}
            />
            <div className="pointer-events-none absolute inset-0">
              <div className={`absolute ${isEven ? "-right-20 top-1/4" : "-left-20 bottom-1/4"} h-[350px] w-[450px] rounded-full ${theme.glow} blur-[120px]`} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="group relative z-[1]"
            >
              <div className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${isEven ? "" : "md:[direction:rtl]"}`}>
                {/* Media */}
                <div className={`${isEven ? "" : "md:[direction:ltr]"}`}>
                  <div className="flex items-center justify-center overflow-hidden rounded-[3px]">
                    <CaseMediaPreview
                      slug={cs.slug}
                      media={cs.media}
                      fallbackTitle={t(`items.${cs.slug}.title`)}
                    />
                  </div>
                </div>

                {/* Text */}
                <div className={`${isEven ? "" : "md:[direction:ltr]"}`}>
                  <div className={`mb-3 text-[0.65rem] font-medium uppercase tracking-[0.18em] ${theme.subtitle}`}>
                    {t(`items.${cs.slug}.subtitle`)}
                  </div>
                  <h2 className={`mb-4 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-tight ${theme.title}`}>
                    {t(`items.${cs.slug}.title`)}
                  </h2>
                  <p className={`mb-8 text-sm font-light leading-[1.75] ${theme.desc}`}>
                    {t(`items.${cs.slug}.desc`)}
                  </p>

                  {/* Stats */}
                  <div className="mb-8 flex flex-wrap gap-8">
                    {cs.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className={`text-2xl font-bold tracking-tight ${theme.statValue}`}>{stat.value}</div>
                        <div className={`text-[0.7rem] font-medium uppercase tracking-[0.12em] ${theme.statLabel}`}>
                          {t(`stats.${stat.label}`)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Services tags */}
                  <div className="mb-8 flex flex-wrap gap-2">
                    {cs.services.map((svc) => (
                      <span
                        key={svc}
                        className={`rounded-[3px] border px-3 py-1 text-[0.65rem] uppercase tracking-[0.1em] ${theme.tag}`}
                      >
                        {tServices(`items.${svc}.title`)}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/casi-studio/${cs.slug}`}
                    className={`inline-flex items-center text-sm font-semibold transition-colors ${theme.link}`}
                  >
                    {t("viewProject")}
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>
        );
      })}

      {/* CTA bottom — navy */}
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
              <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">{t("cta")}</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
