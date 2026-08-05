import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const linkGroups: { title: string; links: { href: string; label: string }[] }[] = [
    {
      title: t("nav.treatment"),
      links: [
        { href: "/treatment/about", label: t("nav.treatment") },
        { href: "/treatment/flow", label: t("nav.flow") },
        { href: "/conditions", label: "対象となる症状" },
      ],
    },
    {
      title: "コンテンツ",
      links: [
        { href: "/cases", label: t("nav.cases") },
        { href: "/doctors", label: t("nav.doctors") },
        { href: "/voices", label: t("nav.voices") },
        { href: "/faq", label: t("nav.faq") },
        { href: "/blog", label: t("nav.blog") },
      ],
    },
    {
      title: "運営会社",
      links: [
        { href: "/company", label: t("nav.company") },
        { href: "/privacy", label: t("nav.privacy") },
        { href: "/legal", label: t("nav.legal") },
        { href: "/contact", label: t("nav.contact") },
      ],
    },
  ];

  return (
    <footer className="mt-auto bg-navy-dark text-offwhite">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-serif text-lg">{t("common.siteName")}</p>
            <p className="mt-3 text-xs leading-relaxed text-offwhite/60">
              運営: SUN SYNERGY Co., Ltd.(株式会社サンシナジー)
            </p>
          </div>
          {linkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-xs tracking-[0.15em] text-gold-light/80">
                {group.title}
              </p>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-offwhite/70 hover:text-gold-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-offwhite/10 pt-6 text-xs text-offwhite/50">
          {t("footer.copyright", { year })}
        </div>
      </div>
    </footer>
  );
}
