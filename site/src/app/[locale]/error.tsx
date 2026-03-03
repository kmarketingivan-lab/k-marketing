"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../../navigation";

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-navy-800">
      <div className="text-center">
        <p className="text-7xl font-extrabold text-orange-500">500</p>
        <h2 className="mt-4 text-heading-2 text-navy-800 dark:text-gray-100">{t("errorTitle")}</h2>
        <p className="mt-2 text-navy-700/60 dark:text-gray-100/60">{t("errorDesc")}</p>
        {process.env.NODE_ENV === "development" && (
          <p className="mt-2 text-xs text-red-500">{_error.message}</p>
        )}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-block rounded-md bg-orange-500 px-6 py-3 font-semibold text-white transition-all hover:bg-orange-400"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="inline-block rounded-md border border-navy-800/[0.12] px-6 py-3 font-semibold text-navy-800 transition-all hover:bg-navy-800/5 dark:border-gray-100/[0.12] dark:text-gray-100 dark:hover:bg-gray-100/5"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
