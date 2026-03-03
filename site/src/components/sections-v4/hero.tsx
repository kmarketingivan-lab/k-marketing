"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/../../navigation";
import { ParticleField } from "@/components/ui/particle-field";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="grain relative z-[1] flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 pb-16 pt-32 md:px-12 md:pb-16">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-[600px] w-[600px] rounded-full bg-orange-500/[0.06] blur-[120px]" />
        <div className="absolute -right-20 bottom-1/3 h-[500px] w-[500px] rounded-full bg-navy-400/[0.08] blur-[100px]" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-orange-500/[0.03] blur-[150px]" />
      </div>

      <ParticleField color="237,236,237" particleCount={600} maxConnectionDist={0} mouseRadius={300} />

      {/* Top bar info */}
      <div className="absolute left-0 right-0 top-0 z-[2] flex items-start justify-end px-6 pt-28 md:px-12">
        <div className="text-sm italic text-gray-100/40">{t("studioLabel")}</div>
      </div>

      {/* Scroll hint */}
      <div className="absolute right-6 top-1/2 z-[2] hidden -translate-y-1/2 flex-col items-center gap-3 opacity-35 md:right-12 md:flex">
        <div className="h-20 w-px animate-pulse bg-gradient-to-b from-transparent to-gray-100" />
        <span className="text-[0.62rem] uppercase tracking-[0.25em] text-gray-100/40 [writing-mode:vertical-rl]">{t("scroll")}</span>
      </div>

      {/* Main content */}
      <div className="relative z-[2]">
        <div className="-translate-y-8 md:-translate-y-14">
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-gray-100/40"
          >
            {t("overline")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-sans leading-[0.92]"
          >
            <span
              className="block text-[clamp(2.8rem,14vw,12rem)] font-extrabold tracking-tight text-transparent"
              style={{ WebkitTextStroke: "1.5px #edeced" }}
            >
              {t("line1")}
            </span>
            <span className="block text-[clamp(2.8rem,14vw,12rem)] font-extrabold tracking-tight text-orange-500">
              {t("line2")}
            </span>
            <span className="block text-[clamp(2.8rem,14vw,12rem)] font-light italic tracking-tight text-gray-100/40">
              {t("line3")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 max-w-md text-lg font-light leading-[1.75] text-gray-100/40"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-4 flex flex-shrink-0 items-center gap-4 md:ml-[50%] md:w-[50%] md:justify-center"
        >
          <Link
            href="/contatti"
            className="inline-block rounded-[3px] bg-orange-500 px-8 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-navy-800 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-85"
          >
            {t("cta")}
          </Link>
          <a
            href="#servizi"
            className="flex items-center gap-2 text-sm text-gray-100/40 transition-colors hover:text-gray-100"
          >
            {t("ctaSecondary")} <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
