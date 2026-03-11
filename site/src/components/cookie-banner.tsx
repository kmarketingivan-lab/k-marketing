"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useCookieConsent } from "@/components/cookie-consent-provider";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

type View = "simple" | "customize";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const { theme } = useTheme();
  const { consent, showBanner, acceptAll, rejectAll, updateConsent } =
    useCookieConsent();
  const [view, setView] = useState<View>("simple");
  const [analyticsToggle, setAnalyticsToggle] = useState(consent.analytics);

  // Sync toggle with actual consent when banner opens
  useEffect(() => {
    if (showBanner) {
      setAnalyticsToggle(consent.analytics);
      setView("simple");
    }
  }, [showBanner, consent.analytics]);

  // Close customization panel on Escape
  useEffect(() => {
    if (!showBanner) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && view === "customize") {
        setView("simple");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showBanner, view]);

  const handleSavePreferences = useCallback(() => {
    updateConsent({ analytics: analyticsToggle });
  }, [analyticsToggle, updateConsent]);

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          role="dialog"
          aria-label={t("title")}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-[60] p-4"
        >
          <div
            className={`mx-auto max-w-5xl rounded-xl border p-6 shadow-xl backdrop-blur-xl ${
              isDark
                ? "border-gray-100/[0.08] bg-navy-900/90 text-gray-100"
                : "border-navy-800/[0.08] bg-white/90 text-navy-800"
            }`}
          >
            <AnimatePresence mode="wait">
              {view === "simple" ? (
                <motion.div
                  key="simple"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <SimpleView
                    t={t}
                    isDark={isDark}
                    onAccept={acceptAll}
                    onReject={rejectAll}
                    onCustomize={() => setView("customize")}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="customize"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <CustomizeView
                    t={t}
                    isDark={isDark}
                    analyticsOn={analyticsToggle}
                    onToggleAnalytics={() => setAnalyticsToggle((p) => !p)}
                    onSave={handleSavePreferences}
                    onBack={() => setView("simple")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Simple view ──────────────────────────────────────────────── */

function SimpleView({
  t,
  isDark,
  onAccept,
  onReject,
  onCustomize,
}: {
  t: (key: string) => string;
  isDark: boolean;
  onAccept: () => void;
  onReject: () => void;
  onCustomize: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 space-y-1">
        <h2 className="text-base font-semibold">{t("title")}</h2>
        <p
          className={`text-sm leading-relaxed ${isDark ? "text-gray-100/60" : "text-navy-800/60"}`}
        >
          {t("description")}{" "}
          <a
            href="/cookies"
            className="text-orange-500 underline underline-offset-2 hover:text-orange-400"
          >
            {t("learnMore")}
          </a>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
        <Button
          variant={isDark ? "ghost" : "ghost-light"}
          size="sm"
          onClick={onCustomize}
        >
          {t("customize")}
        </Button>
        <Button
          variant={isDark ? "secondary" : "secondary-light"}
          size="sm"
          onClick={onReject}
        >
          {t("rejectAll")}
        </Button>
        <Button variant="primary" size="sm" onClick={onAccept}>
          {t("acceptAll")}
        </Button>
      </div>
    </div>
  );
}

/* ── Customize view ───────────────────────────────────────────── */

function CustomizeView({
  t,
  isDark,
  analyticsOn,
  onToggleAnalytics,
  onSave,
  onBack,
}: {
  t: (key: string) => string;
  isDark: boolean;
  analyticsOn: boolean;
  onToggleAnalytics: () => void;
  onSave: () => void;
  onBack: () => void;
}) {
  const muted = isDark ? "text-gray-100/50" : "text-navy-800/50";
  const border = isDark ? "border-gray-100/[0.08]" : "border-navy-800/[0.08]";

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">{t("title")}</h2>

      {/* Necessary — always on */}
      <div className={`flex items-start justify-between gap-4 rounded-lg border p-4 ${border}`}>
        <div className="flex-1">
          <p className="text-sm font-medium">{t("categories.necessary.title")}</p>
          <p className={`mt-1 text-xs leading-relaxed ${muted}`}>
            {t("categories.necessary.description")}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Toggle checked disabled />
          <span className={`text-[11px] ${muted}`}>
            {t("categories.necessary.alwaysOn")}
          </span>
        </div>
      </div>

      {/* Analytics — opt-in */}
      <div className={`flex items-start justify-between gap-4 rounded-lg border p-4 ${border}`}>
        <div className="flex-1">
          <p className="text-sm font-medium">{t("categories.analytics.title")}</p>
          <p className={`mt-1 text-xs leading-relaxed ${muted}`}>
            {t("categories.analytics.description")}
          </p>
        </div>
        <Toggle checked={analyticsOn} onChange={onToggleAnalytics} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className={`text-sm font-medium transition-colors ${isDark ? "text-gray-100/50 hover:text-gray-100" : "text-navy-800/50 hover:text-navy-800"}`}
        >
          &larr; {t("back")}
        </button>
        <Button variant="primary" size="sm" onClick={onSave}>
          {t("savePreferences")}
        </Button>
      </div>
    </div>
  );
}

/* ── Toggle switch ────────────────────────────────────────────── */

function Toggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
}) {
  return (
    <button
      role="switch"
      type="button"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
        disabled ? "cursor-default opacity-60" : ""
      } ${checked ? "bg-orange-500" : "bg-gray-400/40"}`}
    >
      <span
        className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
