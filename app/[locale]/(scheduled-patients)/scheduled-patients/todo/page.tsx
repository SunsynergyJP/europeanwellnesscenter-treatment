import { NoticeBox } from "@/components/ui/NoticeBox";

/**
 * NOTE: 一般的な海外医療渡航の準備項目をもとにしたドラフトです。
 * 実際の期限・要否は貴社にてご確認・確定の上、差し替えてください。
 */
const todoGroups = [
  {
    title: "書類準備",
    items: ["パスポートの有効期限を確認する(残存期間の要件は渡航先の規定による)", "提出書類一覧の内容を確認する"],
  },
  {
    title: "健康管理",
    items: ["治療前の注意事項を確認し、体調を整える", "常用薬・お薬手帳を準備する"],
  },
  {
    title: "持ち物",
    items: ["変換プラグ・変圧器を準備する(BFタイプ/220V)", "海外旅行保険への加入を検討する"],
  },
];

export default function TodoPage() {
  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl text-navy">TO-DOリスト</h1>
      <p className="mb-8 text-sm text-navy/60">渡航前にご確認いただきたい項目です。</p>

      <NoticeBox title="パスポート・ビザ等について" className="mb-8">
        パスポートの有効期限やビザ要件等は、渡航者ご自身の責任でご確認・ご手配ください。弊社は情報提供のみを行うものであり、これらの情報の正確性を保証するものではなく、有効期限切れ等に起因するいかなる結果についても責任を負いかねます。
      </NoticeBox>

      <div className="space-y-8">
        {todoGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-3 font-serif text-lg text-navy">{group.title}</h2>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy/80">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded-sm border-navy/30 text-gold focus:ring-gold/40"
                    aria-label={item}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
