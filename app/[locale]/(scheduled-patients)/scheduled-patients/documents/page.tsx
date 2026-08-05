import { NoticeBox } from "@/components/ui/NoticeBox";

/**
 * Phase2/4方針: 機密書類はサイト内に保持せず、外部の安全な提出先へ誘導する。
 * 提出先URLは実際のフォームサービス確定後、環境変数またはCMSから注入する想定。
 */
const documents = [
  { name: "パスポートコピー(顔写真ページ)", required: true },
  { name: "既往歴・お薬手帳の写し", required: true },
  { name: "同意書(EWC提供)", required: true },
  { name: "海外旅行保険証券の写し", required: false },
];

export default function DocumentsPage() {
  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl text-navy">提出書類一覧</h1>
      <p className="mb-8 text-sm text-navy/60">
        渡航・治療にあたり、以下の書類のご提出をお願いしております。
      </p>

      <ul className="divide-y divide-navy/10 border-y border-navy/10">
        {documents.map((doc) => (
          <li key={doc.name} className="flex items-center justify-between py-3 text-sm">
            <span className="text-navy">{doc.name}</span>
            <span className={doc.required ? "text-error" : "text-navy/50"}>
              {doc.required ? "必須" : "任意"}
            </span>
          </li>
        ))}
      </ul>

      <NoticeBox title="提出方法について" className="mt-8">
        機密性の高い書類のため、本サイト内ではアップロードを受け付けておりません。安全な提出先のご案内は、担当者より別途メールにてお送りいたします。
      </NoticeBox>
    </div>
  );
}
