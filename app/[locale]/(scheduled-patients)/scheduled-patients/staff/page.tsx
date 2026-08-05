import { NoticeBox } from "@/components/ui/NoticeBox";

export default function StaffPage() {
  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl text-navy">サポートで同行するスタッフの紹介</h1>
      <p className="mb-8 text-sm text-navy/60">
        渡航にあたり、専任コンシェルジュとしてサポートするスタッフをご紹介します。
      </p>
      <NoticeBox title="準備中です">
        同行スタッフの情報は現在準備中です。確定次第、こちらに掲載します。
      </NoticeBox>
    </div>
  );
}
