"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ParticleField } from "@/components/ui/particle-field";
import { SITE } from "@/lib/constants";

const valueKeys = ["automation", "noSmoke", "modern", "personal"] as const;

const valueIcons: Record<string, React.ReactNode> = {
  automation: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 7.27 19H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h-1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
      <circle cx="10" cy="13" r="1" /><circle cx="14" cy="13" r="1" />
    </svg>
  ),
  noSmoke: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="m18.7 8-5.1 5.2-2.8-2.7L7 14.3" />
    </svg>
  ),
  modern: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="m11 8v6" /><path d="m8 11h6" />
    </svg>
  ),
  personal: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export function AboutPageClient() {
  const t = useTranslations("aboutPage");

  return (
    <>
      {/* Hero — navy, immersive */}
      <section className="grain relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-32 md:px-12 md:py-44">
        <ParticleField color="237,236,237" particleCount={350} maxConnectionDist={0} mouseRadius={300} />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-1/4 h-[500px] w-[600px] rounded-full bg-orange-500/[0.05] blur-[140px]" />
          <div className="absolute -left-20 bottom-1/4 h-[300px] w-[400px] rounded-full bg-navy-400/[0.06] blur-[100px]" />
        </div>
        <div className="relative z-[1] mx-auto max-w-3xl text-center">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: t("overline") }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-5 inline-flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-orange-500">
              <span className="inline-block h-[1.5px] w-5 bg-orange-500" />
              {t("overline")}
              <span className="inline-block h-[1.5px] w-5 bg-orange-500" />
            </div>
            <h1 className="mb-6 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1] tracking-tight text-gray-100">
              {t("heroTitle")}
              <br />
              <em className="font-light italic text-gray-100/40">{t("heroTitleItalic")}</em>
            </h1>
            <p className="mx-auto max-w-xl text-lg font-light leading-[1.75] text-gray-100/50">
              {t("heroSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story — white, editorial */}
      <section className="grain-light relative overflow-hidden bg-gray-50 px-6 py-24 dark:bg-navy-800 md:px-12 md:py-36">
        <ParticleField color="30,41,59" particleCount={60} maxConnectionDist={0} mouseRadius={200} />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-[300px] w-[400px] rounded-full bg-orange-500/[0.03] blur-[120px]" />
        </div>
        <div className="relative z-[1] mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-orange-500">
              {t("storyOverline")}
            </div>
            <h2 className="mb-12 text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-navy-800 dark:text-gray-100">
              {t("storyTitle")}
            </h2>
          </motion.div>

          <div className="space-y-8">
            {(["storyP1", "storyP2", "storyP3"] as const).map((key, i) => (
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-[clamp(1rem,1.8vw,1.2rem)] font-light leading-[1.85] text-navy-700/60 dark:text-gray-100/50"
              >
                {t(key)}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Founder — E-E-A-T: chi sono, foto, ruolo, LinkedIn */}
      <section className="grain-light relative overflow-hidden bg-gray-50 px-6 py-24 dark:bg-navy-800 md:px-12 md:py-32">
        <div className="relative z-[1] mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16"
          >
            {/* Foto */}
            <div className="shrink-0">
              <div className="relative h-48 w-48 overflow-hidden rounded-2xl md:h-56 md:w-56">
                <Image
                  src={t("founderPhoto")}
                  alt={t("founderPhotoAlt")}
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <div className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-orange-500">
                Il fondatore
              </div>
              <h2 className="mb-1 text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-[1.1] tracking-tight text-navy-800 dark:text-gray-100">
                {t("founderName")}
              </h2>
              <p className="mb-4 text-sm font-medium text-navy-700/50 dark:text-gray-100/40">
                {t("founderRole")}
              </p>
              <p className="mb-6 text-[clamp(0.95rem,1.6vw,1.1rem)] font-light leading-[1.85] text-navy-700/60 dark:text-gray-100/50">
                {t("founderBio")}
              </p>
              <a
                href={t("founderLinkedIn")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 transition-colors hover:text-orange-400"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Profilo LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Stats — numeri reali dai casi studio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 gap-6 border-t border-navy-800/[0.08] pt-12 dark:border-gray-100/[0.08] md:grid-cols-4"
          >
            {(t.raw("statsItems") as Array<{value: string; label: string}>).map((stat, i) => (
              <div key={i} className="text-center">
                <div className="mb-1 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-tight text-orange-500">
                  {stat.value}
                </div>
                <div className="text-[0.75rem] font-medium uppercase tracking-wider text-navy-700/40 dark:text-gray-100/30">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dove siamo — segnale E-E-A-T locality + SEO locale */}
      <section className="grain relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-20 dark:px-12 md:py-28">
        <ParticleField color="237,236,237" particleCount={60} maxConnectionDist={0} mouseRadius={200} />
        <div className="relative z-[1] mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-orange-500">
              {t("locationOverline")}
            </div>
            <h2 className="mb-6 text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-gray-100">
              {t("locationTitle")}
            </h2>
            <p className="text-[clamp(0.95rem,1.6vw,1.1rem)] font-light leading-[1.85] text-gray-100/50">
              {t("locationBody")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Approach header — orange */}
      <section className="grain relative overflow-hidden bg-orange-500 px-6 py-20 md:px-12 md:py-28">
        <ParticleField color="255,255,255" particleCount={60} maxConnectionDist={0} mouseRadius={250} />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-1/3 h-[350px] w-[400px] rounded-full bg-white/[0.08] blur-[120px]" />
        </div>
        <div className="relative z-[1] mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-white/70">
              {t("approachOverline")}
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white">
              {t("approachTitle")}
              <br />
              <em className="font-light italic text-white/50">{t("approachTitleItalic")}</em>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Values — alternating navy / white */}
      {valueKeys.map((key, i) => {
        const isNavy = i % 2 === 0;
        return (
          <section
            key={key}
            className={`${isNavy ? "grain bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700" : "grain-light bg-gray-50 dark:bg-navy-800"} relative overflow-hidden px-6 py-20 md:px-12 md:py-28`}
          >
            <ParticleField
              color={isNavy ? "237,236,237" : "30,41,59"}
              particleCount={40}
              maxConnectionDist={0}
              mouseRadius={200}
            />
            <div className="pointer-events-none absolute inset-0">
              <div className={`absolute ${i % 2 === 0 ? "-right-20 top-1/4" : "-left-20 bottom-1/4"} h-[300px] w-[400px] rounded-full ${isNavy ? "bg-orange-500/[0.05]" : "bg-orange-500/[0.03]"} blur-[120px]`} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="relative z-[1] grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-20"
            >
              {/* Icon */}
              <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${isNavy ? "bg-orange-500/10 text-orange-500" : "bg-orange-500/10 text-orange-500"}`}>
                {valueIcons[key]}
              </div>

              {/* Text */}
              <div>
                <h3 className={`mb-4 text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.15] tracking-tight ${isNavy ? "text-gray-100" : "text-navy-800 dark:text-gray-100"}`}>
                  {t(`values.${key}.title`)}
                </h3>
                <p className={`max-w-2xl text-[clamp(0.9rem,1.5vw,1.05rem)] font-light leading-[1.85] ${isNavy ? "text-gray-100/50" : "text-navy-700/60 dark:text-gray-100/50"}`}>
                  {t(`values.${key}.desc`)}
                </p>
              </div>
            </motion.div>
          </section>
        );
      })}

      {/* CTA — navy */}
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
            <h2 className="mb-5 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-gray-100">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mb-10 max-w-md text-base font-light leading-[1.75] text-gray-100/50">
              {t("ctaSubtitle")}
            </p>
            <Button variant="primary" size="lg" asChild>
              <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">{t("ctaCta")}</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
