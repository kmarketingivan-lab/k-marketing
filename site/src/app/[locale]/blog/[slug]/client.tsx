"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/../../navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { blogPosts } from "@/lib/blog";

export function BlogArticleClient({ slug }: { slug: string }) {
  const t = useTranslations("blog");
  const post = blogPosts.find((p) => p.slug === slug)!;

  const body = t(`posts.${slug}.body`);

  return (
    <>
      {/* Header */}
      <section className="grain bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-24 md:px-12 md:py-32">
        <div className="relative z-[1] mx-auto max-w-3xl">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: t(`posts.${slug}.title`) },
          ]} />
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center text-sm font-medium text-gray-100/40 transition-colors hover:text-orange-400"
          >
            ← Blog
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="mb-4 flex items-center gap-3 text-xs text-gray-100/35">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
              </time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-gray-100">
              {t(`posts.${slug}.title`)}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <article className="grain-light bg-gray-50 px-6 py-16 dark:bg-navy-800 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          {body.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="mb-4 mt-10 text-[clamp(1.3rem,2.5vw,1.8rem)] font-semibold leading-tight tracking-tight text-navy-800 dark:text-gray-100"
                >
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3
                  key={i}
                  className="mb-3 mt-8 text-[clamp(1.1rem,2vw,1.4rem)] font-semibold leading-tight text-navy-800 dark:text-gray-100"
                >
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("**") && block.endsWith("**")) {
              return (
                <p key={i} className="mb-2 text-base font-semibold text-navy-800 dark:text-gray-100">
                  {block.replace(/\*\*/g, "")}
                </p>
              );
            }
            if (block.startsWith("- ")) {
              return (
                <ul key={i} className="mb-6 list-disc space-y-2 pl-6 text-[0.95rem] font-light leading-[1.75] text-navy-700/60 dark:text-gray-100/50">
                  {block.split("\n").map((li, j) => (
                    <li key={j}>{li.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={i}
                className="mb-6 text-[clamp(0.95rem,1.5vw,1.1rem)] font-light leading-[1.85] text-navy-700/60 dark:text-gray-100/50"
              >
                {block}
              </p>
            );
          })}
        </div>
      </article>
    </>
  );
}
