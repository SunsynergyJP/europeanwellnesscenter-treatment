"use client";

import { useLocale } from "next-intl";
import { routing } from "@/lib/i18n/routing";
import { usePathname, useRouter } from "@/lib/i18n/navigation";

const localeLabels: Record<string, string> = {
  ja: "JA",
  en: "EN",
  zh: "中文",
};

export function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 text-xs text-navy/60">
      {routing.locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 ? <span aria-hidden>/</span> : null}
          <button
            type="button"
            aria-current={locale === activeLocale}
            onClick={() => router.replace(pathname, { locale })}
            className={
              locale === activeLocale
                ? "font-semibold text-gold-dark"
                : "hover:text-gold-dark"
            }
          >
            {localeLabels[locale] ?? locale}
          </button>
        </span>
      ))}
    </div>
  );
}
