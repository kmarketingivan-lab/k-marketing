"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  initials: string;
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Testimonial[];

  return (
    <section className="grain-light relative z-[1] overflow-hidden bg-gray-50 px-6 py-24 dark:bg-navy-800 md:px-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="mb-14 text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-orange-500">
            <span className="inline-block h-[1.5px] w-5 bg-orange-500" />
            {t("overline")}
            <span className="inline-block h-[1.5px] w-5 bg-orange-500" />
          </div>
          <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tight text-navy-800 dark:text-gray-100">
            {t("title")}{" "}
            <em className="font-light italic text-navy-800/40 dark:text-gray-100/40">
              {t("titleItalic")}
            </em>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: i * 0.1 }}
              className="relative rounded-2xl border border-navy-800/[0.08] bg-white p-8 dark:border-gray-100/[0.08] dark:bg-navy-700/50"
            >
              {/* Quote mark */}
              <div className="absolute left-6 top-4 text-[3rem] font-serif leading-none text-orange-500/20">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="mb-4 flex gap-1 text-orange-400">
                {[...Array(5)].map((_, si) => (
                  <svg key={si} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="mb-6 text-sm font-light italic leading-[1.8] text-navy-700/70 dark:text-gray-100/60">
                {item.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white">
                  {item.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy-800 dark:text-gray-100">
                    {item.name}
                  </div>
                  <div className="text-xs text-navy-800/40 dark:text-gray-100/40">
                    {item.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
