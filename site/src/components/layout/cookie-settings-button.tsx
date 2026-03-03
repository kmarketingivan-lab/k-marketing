"use client";

import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/components/cookie-consent-provider";

export function CookieSettingsButton() {
  const t = useTranslations("footer");
  const { openBanner } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openBanner}
      className="text-xs text-gray-100/30 transition-colors hover:text-gray-100/50"
    >
      {t("manageCookies")}
    </button>
  );
}
