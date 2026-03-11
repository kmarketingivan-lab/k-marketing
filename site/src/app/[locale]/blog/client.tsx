"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { type NewsArticle, NEWS_CATEGORIES } from "@/lib/news-feed";

interface Props {
  newsArticles: NewsArticle[];
  locale: string;
}

export function BlogListClient({ newsArticles, locale }: Props) {
  const t = useTranslations("blog");
  const [selected, setSelected] = useState<NewsArticle | null>(null);

  // Close on Escape
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelected(null);
  }, []);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selected, handleKey]);

  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-28 md:px-12 md:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-1/3 h-[400px] w-[500px] rounded-full bg-orange-500/[0.06] blur-[120px]" />
        </div>
        <div className="relative z-[1] mx-auto max-w-3xl text-center">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
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

      {/* News feed grid */}
      {newsArticles.length > 0 && (
        <section className="grain-light relative z-[1] bg-gray-50 px-6 py-24 dark:bg-navy-800 md:px-12 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newsArticles.slice(0, 12).map((article, i) => {
                const catLabel =
                  NEWS_CATEGORIES[article.category]?.[locale as "it" | "en"] ??
                  article.category;

                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    onClick={() => setSelected(article)}
                    className="group flex cursor-pointer flex-col rounded-2xl border border-navy-800/[0.06] bg-white p-6 transition-all duration-300 hover:border-orange-500/20 hover:shadow-lg dark:border-gray-100/[0.06] dark:bg-navy-900/50"
                  >
                    {article.image && (
                      <div className="mb-4 aspect-[16/9] overflow-hidden rounded-lg bg-navy-800/5 dark:bg-gray-100/5">
                        <img
                          src={article.image}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-orange-500">
                        {catLabel}
                      </span>
                      <time
                        dateTime={article.date}
                        className="text-[0.65rem] text-navy-700/35 dark:text-gray-100/30"
                      >
                        {new Date(article.date).toLocaleDateString(
                          locale === "it" ? "it-IT" : "en-US",
                          { day: "numeric", month: "short" }
                        )}
                      </time>
                    </div>
                    <h3 className="mb-2 text-[0.95rem] font-semibold leading-snug tracking-tight text-navy-800 transition-colors group-hover:text-orange-500 dark:text-gray-100">
                      {article.title}
                    </h3>
                    <p className="mb-4 flex-1 text-[0.8rem] font-light leading-[1.7] text-navy-700/50 dark:text-gray-100/40">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs font-medium text-orange-500 transition-colors group-hover:text-orange-400">
                        {t("readMore")}
                      </span>
                      <span className="text-[0.6rem] text-navy-700/30 dark:text-gray-100/25">
                        {article.source_name}
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Article modal overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-navy-900/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative mx-4 my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl dark:bg-navy-900 md:my-16"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-navy-800/10 text-navy-800/60 transition-colors hover:bg-navy-800/20 dark:bg-gray-100/10 dark:text-gray-100/60 dark:hover:bg-gray-100/20"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>

              {/* Image */}
              {selected.image && (
                <div className="aspect-[16/9] overflow-hidden rounded-t-2xl">
                  <img
                    src={selected.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Meta */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-orange-500">
                    {NEWS_CATEGORIES[selected.category]?.[locale as "it" | "en"] ?? selected.category}
                  </span>
                  <time
                    dateTime={selected.date}
                    className="text-xs text-navy-700/40 dark:text-gray-100/35"
                  >
                    {new Date(selected.date).toLocaleDateString(
                      locale === "it" ? "it-IT" : "en-US",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </time>
                  <span className="text-xs text-navy-700/30 dark:text-gray-100/25">
                    · {selected.source_name}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mb-4 text-[clamp(1.3rem,3vw,1.8rem)] font-semibold leading-tight tracking-tight text-navy-800 dark:text-gray-100">
                  {selected.title}
                </h2>

                {/* Excerpt */}
                <p className="mb-6 text-sm font-medium leading-[1.7] text-navy-800/70 dark:text-gray-100/60">
                  {selected.excerpt}
                </p>

                {/* Body */}
                {selected.content.split("\n\n").map((block, i) => (
                  <p
                    key={i}
                    className="mb-5 text-[0.95rem] font-light leading-[1.85] text-navy-700/60 dark:text-gray-100/50"
                  >
                    {block}
                  </p>
                ))}

                {/* Tags */}
                {selected.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-navy-800/[0.08] px-3 py-1 text-[0.7rem] font-medium text-navy-700/50 dark:border-gray-100/[0.08] dark:text-gray-100/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Source link */}
                <div className="mt-6 border-t border-navy-800/[0.06] pt-6 dark:border-gray-100/[0.06]">
                  <a
                    href={selected.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-orange-500 transition-colors hover:text-orange-400"
                  >
                    {t("readOriginal")} &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
