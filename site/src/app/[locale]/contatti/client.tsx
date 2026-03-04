"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SITE } from "@/lib/constants";
import { ContactForm } from "@/components/forms/contact-form";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ParticleField } from "@/components/ui/particle-field";

export function ContactPageClient() {
  const t = useTranslations("contact");

  return (
    <div className="grid min-h-[calc(100vh-80px)] md:grid-cols-[1fr_1fr]">
      {/* Left — Navy info panel */}
      <div className="grain relative overflow-hidden bg-gradient-to-bl from-navy-700 via-navy-800 to-navy-900 px-6 py-16 md:px-14 md:py-24">
        <ParticleField color="237,236,237" particleCount={300} maxConnectionDist={0} mouseRadius={300} />

        {/* Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.06] blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-navy-400/[0.08] blur-[100px]" />
        </div>

        <div className="relative z-[1] flex h-full flex-col justify-center">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: t("overline") }]} />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="mb-5 flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-orange-500">
              <span className="inline-block h-[1.5px] w-5 bg-orange-500" />
              {t("overline")}
            </div>

            <h1 className="mb-6 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-gray-100">
              {t("title")}
            </h1>

            <p className="mb-12 max-w-md text-base font-light leading-[1.75] text-gray-100/50">
              {t("subtitle")}
            </p>

            {/* Contact details */}
            <div className="space-y-6">
              <a href={`mailto:${SITE.email}`} className="group flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-gray-100/[0.06]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-500">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-100 transition-colors group-hover:text-orange-400">{SITE.email}</div>
                </div>
              </a>

              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="group flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-gray-100/[0.06]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-500">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-100 transition-colors group-hover:text-orange-400">{SITE.phone}</div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-gray-100/[0.06]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-500">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-100">{SITE.address}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right — White form panel */}
      <div className="flex items-center justify-center bg-gray-50 px-6 py-16 dark:bg-navy-900 md:px-14 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="w-full max-w-lg"
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}
