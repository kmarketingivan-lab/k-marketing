"use client";

import { useTranslations } from "next-intl";

const clients = [
  { name: "I Peruvià", initials: "IP" },
  { name: "Charme Extensions", initials: "CE" },
  { name: "Nemesis", initials: "NM" },
  { name: "Bottega Matta", initials: "BM" },
  { name: "Villa Riviera", initials: "VR" },
  { name: "Auto Brescia", initials: "AB" },
];

export function ClientLogos() {
  const t = useTranslations("clientLogos");

  return (
    <div className="relative z-[1] border-b border-navy-800/[0.06] bg-gray-50 px-6 py-8 dark:border-gray-100/[0.06] dark:bg-navy-900">
      <div className="container-custom">
        <p className="mb-6 text-center text-[0.68rem] font-medium uppercase tracking-[0.2em] text-navy-800/30 dark:text-gray-100/25">
          {t("title")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center gap-2 opacity-30 grayscale transition-all duration-300 hover:opacity-60 hover:grayscale-0"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-800/10 text-[0.6rem] font-bold text-navy-800/50 dark:bg-gray-100/10 dark:text-gray-100/50">
                {client.initials}
              </div>
              <span className="text-sm font-semibold tracking-tight text-navy-800 dark:text-gray-100">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
