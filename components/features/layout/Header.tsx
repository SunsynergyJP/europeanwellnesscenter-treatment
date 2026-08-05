"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";

/**
 * Phase3で確定したグローバルナビゲーション(5項目+CTA)。
 * スクロール量に応じて背景の透過度を変えるため、Client Componentとする。
 */
export function Header() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/treatment/about", label: t("nav.treatment") },
    { href: "/cases", label: t("nav.cases") },
    { href: "/doctors", label: t("nav.doctors") },
    { href: "/voices", label: t("nav.voices") },
    { href: "/faq", label: t("nav.faq") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-navy/10 bg-offwhite/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex flex-col leading-none">
            <span className="font-serif text-base text-navy md:text-lg">
              {t("common.siteNameShort")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-navy/80 hover:text-gold-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>
          <Button href="/contact" size="md" className="hidden sm:inline-flex">
            {t("common.ctaSecondary")}
          </Button>
          <button
            type="button"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="-mr-2 p-2 text-navy lg:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav className="border-t border-navy/10 bg-offwhite px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 text-navy/85"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <LocaleSwitcher />
            <Button href="/contact" size="md">
              {t("common.ctaSecondary")}
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
