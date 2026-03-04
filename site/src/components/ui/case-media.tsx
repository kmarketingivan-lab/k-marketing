"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { MediaItem } from "@/lib/case-studies";
import { caseStudyColors } from "@/lib/case-studies";

/* ── Thumbnail for list page ── */
export function CaseMediaPreview({
  slug,
  media,
  fallbackTitle,
}: {
  slug: string;
  media: MediaItem[];
  fallbackTitle: string;
}) {
  const first = media[0];

  if (!first) {
    return (
      <GradientPlaceholder slug={slug} fallbackTitle={fallbackTitle} />
    );
  }

  if (first.type === "video") {
    return <VideoPlayer src={first.src} />;
  }

  return (
    <Image
      src={first.src}
      alt={fallbackTitle}
      width={1200}
      height={900}
      className="h-auto w-full rounded-[3px] transition-transform duration-500 ease-out group-hover:scale-105"
    />
  );
}

/* ── Full gallery / video player for detail page ── */
export function CaseMediaGallery({
  slug,
  media,
  fallbackTitle,
}: {
  slug: string;
  media: MediaItem[];
  fallbackTitle: string;
}) {
  if (media.length === 0) {
    return (
      <div className="bg-gray-50 px-6 py-16 dark:bg-navy-800 md:px-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className={`aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[3px] bg-gradient-to-br ${caseStudyColors[slug] || "from-gray-600 to-gray-800"} flex items-center justify-center`}
        >
          <span className="text-[clamp(2rem,8vw,6rem)] font-bold text-white/10 select-none">
            {fallbackTitle}
          </span>
        </motion.div>
      </div>
    );
  }

  const images = media.filter((m) => m.type === "image");
  const videos = media.filter((m) => m.type === "video");

  return (
    <div className="bg-gray-50 px-6 py-16 dark:bg-navy-800 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Videos */}
        {videos.map((v, i) => (
          <motion.div
            key={v.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <VideoPlayer src={v.src} />
          </motion.div>
        ))}

        {/* Images */}
        {images.length > 0 && (
          <div className={`grid gap-6 ${images.length === 1 ? "grid-cols-1" : images.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
            {images.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="overflow-hidden rounded-[3px]"
              >
                <Image
                  src={img.src}
                  alt={`${fallbackTitle} — ${i + 1}`}
                  width={1200}
                  height={900}
                  className="h-auto w-full"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Video player with loop + pause + lazy load ── */
function VideoPlayer({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Lazy load: only set src when video enters viewport
  const observerRef = useRef<IntersectionObserver | null>(null);
  const setupObserver = (node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!node) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoaded(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observerRef.current.observe(node);
  };

  const toggle = () => {
    if (!ref.current) return;
    if (ref.current.paused) {
      ref.current.play();
      setPaused(false);
    } else {
      ref.current.pause();
      setPaused(true);
    }
  };

  return (
    <div
      ref={setupObserver}
      className="group relative cursor-pointer overflow-hidden rounded-[3px]"
      onClick={toggle}
    >
      {loaded ? (
        <video
          ref={ref}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-auto w-full rounded-[3px]"
        />
      ) : (
        <div
          className="flex aspect-video w-full items-center justify-center rounded-[3px] bg-navy-900"
        >
          <svg className="h-12 w-12 animate-pulse text-white/20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}
      {/* Pause/play overlay */}
      {loaded && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity ${paused ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
            {paused ? (
              <svg className="ml-0.5 h-6 w-6 text-navy-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-navy-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Gradient fallback ── */
function GradientPlaceholder({
  slug,
  fallbackTitle,
}: {
  slug: string;
  fallbackTitle: string;
}) {
  return (
    <div
      className={`aspect-video w-full rounded-[3px] bg-gradient-to-br ${caseStudyColors[slug] || "from-gray-600 to-gray-800"} flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105`}
    >
      <span className="text-[4rem] font-bold text-white/20 select-none">
        {fallbackTitle.charAt(0)}
      </span>
    </div>
  );
}
