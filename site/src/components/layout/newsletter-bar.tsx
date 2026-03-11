"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function NewsletterBar() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else if (res.status === 429) {
        setStatus("error");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="border-b border-gray-100/[0.06] bg-navy-800/50 px-6 py-10 md:px-12">
      <div className="container-custom flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <div className="flex-1">
          <h4 className="mb-1 text-base font-semibold text-gray-100">
            {t("title")}
          </h4>
          <p className="text-sm text-gray-100/40">{t("subtitle")}</p>
        </div>
        {status === "success" ? (
          <p className="text-sm font-semibold text-orange-400">{t("thanks")}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              required
              className="flex-1 rounded-[3px] border border-gray-100/[0.12] bg-transparent px-4 py-2.5 text-sm text-gray-100 placeholder:text-gray-100/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-[3px] bg-orange-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-orange-400 disabled:opacity-60"
            >
              {status === "loading" ? "..." : t("cta")}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400">{t("error")}</p>
        )}
      </div>
    </div>
  );
}
