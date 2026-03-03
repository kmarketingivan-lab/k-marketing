"use client";

import { useEffect } from "react";

/** Sets document.documentElement.lang — safe because locale is validated server-side */
export function SetLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
