"use client";

import { Link, usePathname } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/scheduled-patients", label: "ダッシュボード" },
  { href: "/scheduled-patients/before-departure", label: "出発前の注意事項" },
  { href: "/scheduled-patients/local-info", label: "現地お役立ち情報" },
  { href: "/scheduled-patients/todo", label: "TO-DOリスト" },
  { href: "/scheduled-patients/treatment-care", label: "治療前後の注意事項" },
  { href: "/scheduled-patients/treatment-menu", label: "施術メニュー" },
  { href: "/scheduled-patients/documents", label: "提出書類一覧" },
  { href: "/scheduled-patients/flights", label: "便のご案内" },
  { href: "/scheduled-patients/staff", label: "サポートスタッフ紹介" },
  { href: "/scheduled-patients/account", label: "アカウント設定" },
];

export function ScheduledPatientsSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="参加者専用メニュー" className="space-y-1">
      {navItems.map((item) => {
        // localeプレフィックスを許容した部分一致判定
        const isActive = pathname?.endsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-sm px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-navy text-offwhite"
                : "text-navy/70 hover:bg-navy/5 hover:text-navy",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
