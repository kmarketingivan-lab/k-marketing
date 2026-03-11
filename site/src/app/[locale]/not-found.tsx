import { useTranslations } from "next-intl";
import { Link } from "../../../navigation";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-navy-800">
      <div className="text-center">
        <p className="text-7xl font-extrabold text-orange-500">404</p>
        <h1 className="mt-4 text-heading-2 text-navy-800 dark:text-gray-100">{t("notFoundTitle")}</h1>
        <p className="mt-2 text-navy-700/60 dark:text-gray-100/60">{t("notFoundDesc")}</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-orange-500 px-6 py-3 font-semibold text-white transition-all hover:bg-orange-400"
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
