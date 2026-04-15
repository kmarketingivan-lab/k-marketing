"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { FaqSection, faqJsonLd, type FaqItem } from "@/components/ui/faq";
import { ParticleField } from "@/components/ui/particle-field";
import { SITE } from "@/lib/constants";

/** Renderizza testo con markdown minimo: ##, ###, - lista, **grassetto** */
function BodyRenderer({ text, className }: { text: string; className?: string }) {
  const blocks = text.split("\n\n").filter(Boolean);

  function parseInline(str: string): React.ReactNode[] {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={i} className="font-semibold text-navy-800 dark:text-gray-100">{part.slice(2, -2)}</strong>
        : part
    );
  }

  return (
    <div className={className}>
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="mb-4 mt-10 text-[clamp(1.2rem,2.5vw,1.5rem)] font-semibold leading-tight tracking-tight text-navy-800 first:mt-0 dark:text-gray-100">
              {block.slice(3)}
            </h2>
          );
        }
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="mb-3 mt-8 text-[clamp(1rem,2vw,1.2rem)] font-semibold leading-tight text-navy-800 dark:text-gray-100">
              {block.slice(4)}
            </h3>
          );
        }
        // Blocco lista: righe che iniziano con "- "
        const lines = block.split("\n");
        if (lines.every(l => l.trim().startsWith("- "))) {
          return (
            <ul key={i} className="mb-6 space-y-2 pl-4">
              {lines.map((line, j) => (
                <li key={j} className="flex gap-2 text-[clamp(0.9rem,1.4vw,1rem)] font-light leading-[1.8] text-navy-700/60 dark:text-gray-100/50">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>{parseInline(line.replace(/^- /, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mb-6 text-[clamp(0.95rem,1.5vw,1.1rem)] font-light leading-[1.85] text-navy-700/60 dark:text-gray-100/50">
            {parseInline(block)}
          </p>
        );
      })}
    </div>
  );
}

export function ServiceDetailClient({ serviceKey }: { serviceKey: string }) {
  const t = useTranslations("serviceDetail");
  const faqItems = t.raw(`${serviceKey}.faq`) as FaqItem[];

  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-28 md:px-12 md:py-36">
        <ParticleField color="237,236,237" particleCount={250} maxConnectionDist={0} mouseRadius={300} />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-1/3 h-[400px] w-[500px] rounded-full bg-orange-500/[0.06] blur-[120px]" />
        </div>
        <div className="relative z-[1] mx-auto max-w-3xl text-center">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: t("cta").includes("consulenza") ? "Servizi" : "Services", href: "/servizi" },
            { label: t(`${serviceKey}.heroTitle`) },
          ]} />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <h1 className="mb-6 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-gray-100">
              {t(`${serviceKey}.heroTitle`)}{" "}
              <em className="font-light italic text-gray-100/40">{t(`${serviceKey}.heroTitleItalic`)}</em>
            </h1>
            <p className="mx-auto max-w-xl text-base font-light leading-[1.75] text-gray-100/50">
              {t(`${serviceKey}.heroSub`)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="grain-light relative z-[1] bg-gray-50 px-6 py-24 dark:bg-navy-800 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <BodyRenderer text={t(`${serviceKey}.body`)} />
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />
      <FaqSection items={faqItems} title={t("faqTitle")} />

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
            <h2 className="mb-5 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-gray-100">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mb-10 max-w-md text-base font-light leading-[1.75] text-gray-100/50">
              {t("ctaSub")}
            </p>
            <Button variant="primary" size="lg" asChild>
              <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">{t("cta")}</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
