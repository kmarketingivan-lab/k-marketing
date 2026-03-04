"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({
  items,
  title,
  overline,
}: {
  items: FaqItem[];
  title?: string;
  overline?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="grain-light relative z-[1] bg-gray-50 px-6 py-24 dark:bg-navy-800 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        {overline && (
          <div className="mb-4 text-center text-[0.65rem] font-medium uppercase tracking-[0.22em] text-orange-500">
            {overline}
          </div>
        )}
        {title && (
          <h2 className="mb-12 text-center text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-navy-800 dark:text-gray-100">
            {title}
          </h2>
        )}
        <div className="divide-y divide-navy-800/[0.08] border-y border-navy-800/[0.08] dark:divide-gray-100/[0.08] dark:border-gray-100/[0.08]">
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-orange-500"
              >
                <span className="text-[clamp(0.95rem,1.5vw,1.1rem)] font-semibold text-navy-800 dark:text-gray-100">
                  {item.question}
                </span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center text-lg text-navy-800/40 dark:text-gray-100/40">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-[0.9rem] font-light leading-[1.75] text-navy-700/60 dark:text-gray-100/50">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Generate FAQPage JSON-LD schema */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
