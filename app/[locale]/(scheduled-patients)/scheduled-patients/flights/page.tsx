import { NoticeBox } from "@/components/ui/NoticeBox";

export default function FlightsPage() {
  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl text-navy">便のご案内</h1>
      <p className="mb-8 text-sm text-navy/60">
        推奨フライト情報は渡航バッチごとに確定次第、こちらにご案内します。
      </p>

      <NoticeBox title="フライト情報についてのご注意">
        ご案内するフライト情報はあくまで参考情報であり、実際のご予約・搭乗手続きは参加者様ご自身の責任で行っていただきます。弊社は情報提供のみを行うものであり、乗り遅れ・スケジュール変更等に起因するいかなる結果についても責任を負いかねます。航空便情報は必ずご自身で航空会社の公式情報をご確認ください。
      </NoticeBox>
    </div>
  );
}
