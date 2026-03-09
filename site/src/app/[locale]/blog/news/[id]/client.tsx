"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/../../navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { type NewsArticle, NEWS_CATEGORIES } from "@/lib/news-feed";

interface Props {
  article: NewsArticle;
  locale: string;
}

export function NewsArticleClient({ article, locale }: Props) {
  const t = useTranslations("blog");
  const catLabel =
    NEWS_CATEGORIES[article.category]?.[locale as "it" | "en"] ??
    article.category;

  return (
    <>
      {/* Header */}
      <section className="grain bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-24 md:px-12 md:py-32">
        <div className="relative z-[1] mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: article.title },
            ]}
          />
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center text-sm font-medium text-gray-100/40 transition-colors hover:text-orange-400"
          >
            &larr; Blog
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="mb-4 flex items-center gap-3 text-xs text-gray-100/35">
              <span className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-orange-400">
                {catLabel}
              </span>
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString(
                  locale === "it" ? "it-IT" : "en-US",
                  { day: "numeric", month: "long", year: "numeric" }
                )}
              </time>
              <span>·</span>
              <span>{article.source_name}</span>
            </div>
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-gray-100">
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <article className="grain-light bg-gray-50 px-6 py-16 dark:bg-navy-800 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          {article.image && (
            <div className="mb-10 overflow-hidden rounded-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full object-cover"
              />
            </div>
          )}

          <p className="mb-8 text-lg font-medium leading-[1.7] text-navy-800/80 dark:text-gray-100/70">
            {article.excerpt}
          </p>

          {article.content.split("\n\n").map((block, i) => (
            <p
              key={i}
              className="mb-6 text-[clamp(0.95rem,1.5vw,1.1rem)] font-light leading-[1.85] text-navy-700/60 dark:text-gray-100/50"
            >
              {block}
            </p>
          ))}

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
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
          <div className="mt-10 border-t border-navy-800/[0.06] pt-8 dark:border-gray-100/[0.06]">
            <a
              href={article.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-orange-500 transition-colors hover:text-orange-400"
            >
              {t("readOriginal")} &rarr;
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
