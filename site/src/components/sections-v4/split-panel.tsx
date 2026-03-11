"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ParticleField } from "@/components/ui/particle-field";

const processSteps = [
  { n: "1", titleKey: "1", descKey: "1" },
  { n: "2", titleKey: "2", descKey: "2" },
  { n: "3", titleKey: "3", descKey: "3" },
  { n: "4", titleKey: "4", descKey: "4" },
];

const statKeys = ["projects", "experience", "growth", "automations"] as const;

export function SplitPanel() {
  const t = useTranslations("process");

  return (
    <div className="grain relative z-[1] grid overflow-hidden border-y border-gray-100/[0.08] bg-gradient-to-bl from-navy-700 via-navy-800 to-navy-900 md:grid-cols-2">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[350px] w-[500px] rounded-full bg-navy-400/[0.06] blur-[100px]" />
      </div>

      <ParticleField color="237,236,237" particleCount={500} maxConnectionDist={0} mouseRadius={300} />

      {/* Left — Process */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
        className="relative z-[1] border-b border-gray-100/[0.08] px-6 py-20 md:border-b-0 md:border-r md:px-14 md:py-20"
      >
        <div className="mb-8 text-[0.68rem] uppercase tracking-[0.2em] text-gray-100/40">
          {t("overline")}
        </div>
        <h2 className="mb-8 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-gray-100">
          {t("title")}<br />
          <em className="font-light italic text-gray-100/40">{t("titleItalic")}</em>
        </h2>

        <div className="flex flex-col">
          {processSteps.map((step, i) => (
            <div
              key={step.n}
              className="flex gap-5 border-b border-gray-100/[0.08] py-5"
              style={i === 0 ? { borderTop: "1px solid rgba(255,255,255,0.08)" } : {}}
            >
              <div className="w-9 flex-shrink-0 text-[1.8rem] font-light italic leading-none text-orange-500">
                {step.n}
              </div>
              <div>
                <div className="mb-1 text-sm font-semibold text-gray-100">
                  {t(`steps.${step.titleKey}.title`)}
                </div>
                <p className="text-[0.82rem] font-light leading-[1.6] text-gray-100/40">
                  {t(`steps.${step.descKey}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right — Manifesto + Stats */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.1 }}
        className="relative z-[1] px-6 py-20 md:px-14 md:py-20"
      >
        <div className="mb-8 text-[0.68rem] uppercase tracking-[0.2em] text-gray-100/40">
          {t("studioLabel")}
        </div>

        <p className="mb-10 text-[clamp(1.2rem,2.2vw,1.8rem)] font-light italic leading-[1.65] text-gray-100">
          {t("manifesto1start")}{" "}
          <strong className="font-semibold not-italic text-orange-500">
            {t("manifesto1bold")}
          </strong>{" "}
          {t("manifesto1end")}
        </p>

        <p className="mb-0 text-[clamp(1rem,1.6vw,1.4rem)] font-light italic leading-[1.65] text-gray-100">
          {t("manifesto2start")}{" "}
          <strong className="font-semibold not-italic text-orange-500">
            {t("manifesto2bold")}
          </strong>
          {t("manifesto2end")}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-5 md:gap-8">
          {statKeys.map((key) => (
            <div key={key}>
              <div className="text-[clamp(2.5rem,6vw,3.5rem)] font-bold leading-none tracking-tight text-gray-100">
                {t(`stats.${key}.value`)}
                <span className="text-orange-500">{t(`stats.${key}.suffix`)}</span>
              </div>
              <div className="mt-1.5 text-[0.75rem] uppercase tracking-[0.1em] text-gray-100/40">
                {t(`stats.${key}.label`)}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
