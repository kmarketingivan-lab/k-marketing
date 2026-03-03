"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { submitContactForm, type ContactFormData } from "@/lib/contact";
import { Button } from "@/components/ui/button";

const industryKeys = [
  "dental", "aesthetics", "realestate", "automotive",
  "legal", "hotel", "restaurant", "beauty", "veterinary", "other",
] as const;

const budgetKeys = ["500-1000", "1000-3000", "3000+"] as const;

/** Build zod schema with translated error messages */
function createSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(1, t("form.errors.nameRequired")),
    email: z
      .string()
      .min(1, t("form.errors.emailRequired"))
      .email(t("form.errors.emailInvalid")),
    company: z.string(),
    industry: z.string(),
    budget: z.string(),
    message: z
      .string()
      .min(1, t("form.errors.messageRequired"))
      .min(20, t("form.errors.messageMin")),
  });
}

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState<ContactFormData>({
    name: "", email: "", company: "", industry: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});

  // Anti-spam: honeypot
  const [honeypot, setHoneypot] = useState("");
  // Anti-spam: page load timestamp
  const loadTimestamp = useRef(Date.now());
  // Anti-spam: rate limit (last submit timestamp)
  const lastSubmitRef = useRef(0);

  const schema = createSchema(t);

  const validateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      const result = schema.shape[field].safeParse(value);
      if (!result.success) {
        return result.error.errors[0]?.message ?? "";
      }
      return "";
    },
    [schema],
  );

  const update = (key: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error on change if field was touched
    if (touched[key]) {
      const err = validateField(key, value);
      setErrors((prev) => ({ ...prev, [key]: err || undefined }));
    }
  };

  const handleBlur = (key: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const err = validateField(key, form[key]);
    setErrors((prev) => ({ ...prev, [key]: err || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam: honeypot check
    if (honeypot) return;

    // Anti-spam: minimum time on page (3 seconds)
    if (Date.now() - loadTimestamp.current < 3000) return;

    // Anti-spam: rate limit (30 seconds)
    if (Date.now() - lastSubmitRef.current < 30000 && lastSubmitRef.current > 0) return;

    // Validate all fields
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      // Mark all errored fields as touched
      setTouched((prev) => {
        const next = { ...prev };
        for (const field of Object.keys(fieldErrors) as Array<keyof ContactFormData>) {
          next[field] = true;
        }
        return next;
      });
      return;
    }

    lastSubmitRef.current = Date.now();
    setStatus("sending");
    const submitResult = await submitContactForm(form);
    setStatus(submitResult.success ? "success" : "error");
  };

  const resetForm = () => {
    setForm({ name: "", email: "", company: "", industry: "", budget: "", message: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const inputBase =
    "w-full rounded-[3px] border bg-transparent px-4 py-3 text-sm outline-none transition-colors dark:text-gray-100";
  const inputNormal =
    "border-navy-800/[0.12] text-navy-800 placeholder:text-navy-800/30 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:border-gray-100/[0.12] dark:placeholder:text-gray-100/30";
  const inputError =
    "border-red-400 text-navy-800 placeholder:text-navy-800/30 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-red-400 dark:placeholder:text-gray-100/30";
  const selectBase =
    "w-full appearance-none rounded-[3px] border bg-transparent px-4 py-3 text-sm outline-none transition-colors dark:text-gray-100";

  const inputClass = (field: keyof ContactFormData) =>
    `${inputBase} ${errors[field] ? inputError : inputNormal}`;
  const selectClass = (field: keyof ContactFormData) =>
    `${selectBase} ${errors[field] ? inputError : inputNormal}`;

  const FieldError = ({ field }: { field: keyof ContactFormData }) =>
    errors[field] ? (
      <p id={`err-${field}`} role="alert" className="mt-1 text-xs text-red-500">{errors[field]}</p>
    ) : null;

  // Success state
  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-navy-800 dark:text-gray-100">
          {t("success")}
        </p>
        <p className="mt-1 text-sm text-navy-700/60 dark:text-gray-100/50">
          {t("successSub")}
        </p>
        <button
          onClick={resetForm}
          className="mt-6 text-sm font-medium text-orange-500 transition-colors hover:text-orange-400"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  const isDisabled = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users */}
      <div className="absolute left-[-9999px]" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name + Email row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <input
            type="text"
            placeholder={t("name")}
            aria-label={t("name")}
            aria-describedby={errors.name ? "err-name" : undefined}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            disabled={isDisabled}
            className={inputClass("name")}
          />
          <FieldError field="name" />
        </div>
        <div>
          <input
            type="email"
            placeholder={t("email")}
            aria-label={t("email")}
            aria-describedby={errors.email ? "err-email" : undefined}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            disabled={isDisabled}
            className={inputClass("email")}
          />
          <FieldError field="email" />
        </div>
      </div>

      {/* Company */}
      <input
        type="text"
        placeholder={t("company")}
        aria-label={t("company")}
        value={form.company}
        onChange={(e) => update("company", e.target.value)}
        disabled={isDisabled}
        className={inputClass("company")}
      />

      {/* Industry + Budget row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="relative">
          <select
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
            disabled={isDisabled}
            aria-label={t("industry")}
            className={`${selectClass("industry")} ${!form.industry ? "text-navy-800/30 dark:text-gray-100/30" : ""}`}
          >
            <option value="" disabled>{t("industry")}</option>
            {industryKeys.map((key) => (
              <option key={key} value={key}>{t(`industries.${key}`)}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-800/30 dark:text-gray-100/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        <div className="relative">
          <select
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            disabled={isDisabled}
            aria-label={t("budget")}
            className={`${selectClass("budget")} ${!form.budget ? "text-navy-800/30 dark:text-gray-100/30" : ""}`}
          >
            <option value="" disabled>{t("budget")}</option>
            {budgetKeys.map((key) => (
              <option key={key} value={key}>{t(`budgets.${key}`)}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-800/30 dark:text-gray-100/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Message */}
      <div>
        <textarea
          rows={5}
          placeholder={t("message")}
          aria-label={t("message")}
          aria-describedby={errors.message ? "err-message" : undefined}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          disabled={isDisabled}
          className={`${inputClass("message")} resize-none`}
        />
        <FieldError field="message" />
      </div>

      {/* Error message */}
      {status === "error" && (
        <div role="alert" className="flex items-center gap-2 rounded-md bg-red-50 px-4 py-3 dark:bg-red-900/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm text-red-600 dark:text-red-400">{t("error")}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isDisabled}
      >
        {isDisabled ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t("sending")}
          </span>
        ) : (
          t("submit")
        )}
      </Button>
    </form>
  );
}
