import { NoticeBox } from "@/components/ui/NoticeBox";

export default function TreatmentMenuPage() {
  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl text-navy">施術メニューの紹介</h1>
      <p className="mb-8 text-sm text-navy/60">
        ご渡航中に受けられる施術メニューをご案内します。
      </p>
      <NoticeBox title="準備中です">
        施術メニューの詳細は現在準備中です。確定次第、こちらに掲載します。
      </NoticeBox>
    </div>
  );
}
