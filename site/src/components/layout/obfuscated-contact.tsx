"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

export function ObfuscatedContact() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  const linkClass =
    "text-sm text-gray-100/60 transition-colors hover:text-orange-400";

  if (!visible) {
    return (
      <>
        <li><span className={linkClass}>info@...</span></li>
        <li><span className={linkClass}>+39 ...</span></li>
      </>
    );
  }

  return (
    <>
      <li>
        <a href={`mailto:${SITE.email}`} className={linkClass}>
          {SITE.email}
        </a>
      </li>
      <li>
        <a
          href={`tel:${SITE.phone.replace(/\s/g, "")}`}
          className={linkClass}
        >
          {SITE.phone}
        </a>
      </li>
    </>
  );
}
