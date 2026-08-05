import { Link } from "@/lib/i18n/navigation";
import { NoticeBox } from "@/components/ui/NoticeBox";

export default function ScheduledPatientsDashboardPage() {
  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl text-navy">ダッシュボード</h1>
      <p className="mb-8 text-sm text-navy/60">
        渡航に向けた各種ご案内をまとめています。左のメニューからご確認ください。
      </p>

      <NoticeBox title="渡航日程(準備中)">
        渡航バッチ情報(出発日・帰国日等)は現在準備中です。確定次第、こちらに表示されます。
      </NoticeBox>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {[
          { href: "/scheduled-patients/before-departure", label: "出発前の注意事項をまず確認する" },
          { href: "/scheduled-patients/todo", label: "TO-DOリストを確認する" },
          { href: "/scheduled-patients/documents", label: "提出書類を確認する" },
          { href: "/scheduled-patients/treatment-care", label: "治療前後の注意事項を確認する" },
        ].map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-sm border border-navy/10 bg-white p-4 text-sm text-navy hover:border-gold/50"
            >
              {item.label} →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
