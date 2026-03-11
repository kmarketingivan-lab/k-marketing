"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function LeadMagnetPopup() {
  const t = useTranslations("leadMagnet");
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Show on exit intent (mouse leaves viewport) after 10 seconds on page
    let enabled = false;
    const timer = setTimeout(() => { enabled = true; }, 10000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (enabled && e.clientY <= 0 && !sessionStorage.getItem("km-popup-shown")) {
        setShow(true);
        sessionStorage.setItem("km-popup-shown", "1");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  if (!show) return null;

  const benefits = t.raw("benefits") as string[];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setShow(false); }}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-orange-500/30 bg-navy-900 p-8 shadow-2xl">
        {/* Close */}
        <button
          onClick={() => setShow(false)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100/10 text-gray-100/60 transition-colors hover:bg-gray-100/20"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-100">{t("thanks")}</p>
          </div>
        ) : (
          <>
            <span className="mb-3 inline-block rounded-full bg-orange-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-400">
              {t("badge")}
            </span>
            <h3 className="mb-2 text-xl font-bold text-gray-100">{t("title")}</h3>
            <p className="mb-4 text-sm text-gray-100/50">{t("subtitle")}</p>

            <ul className="mb-6 space-y-2">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-100/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" className="flex-shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                required
                className="rounded-[3px] border border-gray-100/[0.12] bg-transparent px-4 py-3 text-sm text-gray-100 placeholder:text-gray-100/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                className="rounded-[3px] border border-gray-100/[0.12] bg-transparent px-4 py-3 text-sm text-gray-100 placeholder:text-gray-100/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="rounded-[3px] bg-orange-500 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-orange-400"
              >
                {t("cta")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
