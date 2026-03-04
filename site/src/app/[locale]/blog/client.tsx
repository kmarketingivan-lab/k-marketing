"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/../../navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ParticleField } from "@/components/ui/particle-field";
import { blogPosts } from "@/lib/blog";

export function BlogListClient() {
  const t = useTranslations("blog");

  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-28 md:px-12 md:py-36">
        <ParticleField color="237,236,237" particleCount={250} maxConnectionDist={0} mouseRadius={300} />
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

      {/* Post list */}
      <section className="grain-light relative z-[1] bg-gray-50 px-6 py-24 dark:bg-navy-800 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl space-y-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl border border-navy-800/[0.06] bg-white p-8 transition-all duration-300 hover:border-orange-500/20 hover:shadow-lg dark:border-gray-100/[0.06] dark:bg-navy-900/50"
            >
              <div className="mb-3 flex items-center gap-3 text-xs text-navy-700/40 dark:text-gray-100/35">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mb-3 text-[clamp(1.2rem,2.5vw,1.5rem)] font-semibold leading-tight tracking-tight text-navy-800 transition-colors group-hover:text-orange-500 dark:text-gray-100">
                <Link href={`/blog/${post.slug}`}>
                  {t(`posts.${post.slug}.title`)}
                </Link>
              </h2>
              <p className="mb-4 text-sm font-light leading-[1.75] text-navy-700/60 dark:text-gray-100/50">
                {t(`posts.${post.slug}.excerpt`)}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-orange-500 transition-colors hover:text-orange-400"
              >
                {t("readMore")}
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
