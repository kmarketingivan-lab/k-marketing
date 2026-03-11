"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SITE } from "@/lib/constants";

export function UrgencyBanner() {
  const t = useTranslations("urgencyBanner");
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative z-[51] bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 px-4 py-2 text-center">
      <div className="flex items-center justify-center gap-3">
        <p className="text-[0.8rem] font-semibold text-white">
          {t("text")}
          {" — "}
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            {t("cta")}
          </a>
        </p>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 flex h-5 w-5 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Chiudi"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
