"use client";

import { Link } from "@/../../navigation";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-[0.75rem] text-gray-100/40">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-orange-400">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-100/60">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
