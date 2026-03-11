"use client";

import { useTranslations } from "next-intl";

export function TickerBand() {
  const t = useTranslations("ticker");
  const items = t.raw("items") as string[];
  const track = [...items, ...items];

  return (
    <div className="grain relative z-[1] overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 py-3.5 dark:from-navy-700 dark:via-navy-800 dark:to-navy-700">
      <div className="relative z-[1] flex animate-[tick_20s_linear_infinite] whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={i}
            className="flex flex-shrink-0 items-center gap-9 px-9 text-[1.1rem] font-semibold italic text-navy-800 dark:text-gray-100"
          >
            {item}
            <span className="text-navy-800/35 not-italic dark:text-orange-500/50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
