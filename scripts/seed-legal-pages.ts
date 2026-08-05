/**
 * プライバシーポリシー・特定商取引法に基づく表記のドラフト投入。
 * 実行: npx sanity exec scripts/seed-legal-pages.ts --with-user-token
 *
 * 一般的な医療サービスサイトとして必要な内容の草案であり、最終的な法務確認前。
 * isDraft: true の間は各ページ上部に確認中である旨のNoticeBoxが表示される。
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

type Node =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "li"; text: string };

function toBlocks(nodes: Node[]) {
  return nodes.map((node, i) => ({
    _type: "block" as const,
    _key: `b${i}`,
    style: node.type === "h2" || node.type === "h3" ? node.type : "normal",
    listItem: node.type === "li" ? ("bullet" as const) : undefined,
    markDefs: [],
    children: [{ _type: "span" as const, _key: `s${i}`, text: node.text, marks: [] }],
  }));
}

const COMPANY = "株式会社サンシナジー(SUN SYNERGY Co., Ltd.)";
const CONTACT_EMAIL = "ewc@mfplusjapan.jp";

const privacyPolicyNodes: Node[] = [
  {
    type: "p",
    text: `${COMPANY}(以下「当社」といいます)は、当社が運営する European Wellness Center コタキナバル 幹細胞治療のご案内サイト(以下「本サイト」といいます)における個人情報の取り扱いについて、以下のとおりプライバシーポリシー(以下「本ポリシー」といいます)を定めます。`,
  },
  { type: "h2", text: "1. 取得する個人情報" },
  { type: "p", text: "当社は、本サイトのお問い合わせフォームおよび参加者専用エリアを通じて、以下の情報を取得します。" },
  { type: "li", text: "氏名、メールアドレス、電話番号などの連絡先情報" },
  { type: "li", text: "お問い合わせ内容、ご相談内容" },
  { type: "li", text: "治療・健康状態に関する情報(既往歴等、個人情報保護法上の要配慮個人情報を含みます)" },
  { type: "li", text: "渡航に関する情報(パスポート情報等、参加者専用エリアでのご案内に付随して取得する場合があります)" },
  {
    type: "p",
    text: "要配慮個人情報(病歴等)を取得する場合は、法令に基づき、あらかじめご本人の同意を得た上で取得します。",
  },
  { type: "h2", text: "2. 利用目的" },
  { type: "p", text: "取得した個人情報は、以下の目的で利用します。" },
  { type: "li", text: "お問い合わせ・ご相談への回答、ご案内のため" },
  { type: "li", text: "治療コーディネート(現地医療機関との連絡調整を含む)のため" },
  { type: "li", text: "渡航手配・現地サポートに関するご案内のため" },
  { type: "li", text: "参加者専用エリアのアカウント管理のため" },
  { type: "li", text: "本サイトおよびサービスの改善、統計データの作成のため" },
  { type: "li", text: "法令等に基づく対応のため" },
  { type: "h2", text: "3. 第三者提供・海外への提供" },
  {
    type: "p",
    text: "当社は、以下の場合を除き、ご本人の同意なく個人情報を第三者に提供しません。",
  },
  { type: "li", text: "治療コーディネートに必要な範囲で、現地医療機関(European Wellness Center等、マレーシア国内の事業者を含みます)へ提供する場合" },
  { type: "li", text: "法令に基づく場合" },
  {
    type: "p",
    text: "上記のとおり、当社は治療コーディネートの目的で、個人情報(健康情報を含む)をマレーシア国内の事業者へ提供する場合があります。提供先の国の個人情報保護制度は日本の制度と異なる場合がありますが、当社は契約等を通じて適切な安全管理措置が講じられるよう努めます。海外への情報提供に同意いただけない場合、本サービスの一部をご利用いただけないことがあります。",
  },
  { type: "h2", text: "4. 業務委託" },
  {
    type: "p",
    text: "当社は、本サイトの運営に関して、サーバー運営・システム管理等の業務を外部委託する場合があります。委託先には、個人情報保護に関する契約を締結し、適切な監督を行います。",
  },
  { type: "h2", text: "5. Cookie等の利用" },
  {
    type: "p",
    text: "本サイトでは、利便性向上・アクセス解析等の目的でCookieを利用する場合があります。Cookieの利用を望まれない場合は、ブラウザの設定により無効化することが可能です。",
  },
  { type: "h2", text: "6. 安全管理措置" },
  {
    type: "p",
    text: "当社は、取得した個人情報の漏えい、滅失またはき損の防止その他の安全管理のために、必要かつ適切な措置を講じます。",
  },
  { type: "h2", text: "7. 未成年者の情報について" },
  {
    type: "p",
    text: "20歳未満の方がサービスをご利用になる場合、保護者の方の同意のもとご対応いただくものとします。",
  },
  { type: "h2", text: "8. 開示等の請求" },
  {
    type: "p",
    text: "ご本人からの個人情報の開示、訂正、利用停止等のご請求については、下記お問い合わせ窓口まで、ご本人であることを確認の上、法令に従って対応いたします。",
  },
  { type: "h2", text: "9. お問い合わせ窓口" },
  { type: "p", text: `${COMPANY}\nメールアドレス: ${CONTACT_EMAIL}` },
  { type: "h2", text: "10. 本ポリシーの改定" },
  {
    type: "p",
    text: "当社は、必要に応じて本ポリシーを改定することがあります。重要な変更を行う場合は、本サイト上で告知します。",
  },
  { type: "p", text: "制定日: 2026年8月" },
];

const legalPageNodes: Node[] = [
  {
    type: "p",
    text: "本ページは、特定商取引法第11条(通信販売についての広告)に基づく表記です。適用の要否については貴社にてご確認ください。",
  },
  { type: "h2", text: "販売事業者" },
  { type: "p", text: COMPANY },
  { type: "h2", text: "運営統括責任者" },
  { type: "p", text: "【要確認】代表取締役 木村慶子" },
  { type: "h2", text: "所在地" },
  { type: "p", text: "東京都千代田区永田町2丁目11-1 山王パークタワー3階" },
  { type: "h2", text: "電話番号" },
  { type: "p", text: "03-6383-3991(お問い合わせはメールを推奨しております)" },
  { type: "h2", text: "メールアドレス" },
  { type: "p", text: CONTACT_EMAIL },
  { type: "h2", text: "サービス価格" },
  {
    type: "p",
    text: "【要確認】治療内容・渡航プランにより異なるため、個別のご相談・お見積りとなります。詳細は事前コンサルテーションにてご案内いたします。",
  },
  { type: "h2", text: "価格に含まれないもの" },
  { type: "p", text: "【要確認】渡航費(航空券)、延泊費用、個人的な購入品等、パッケージに含まれない実費。" },
  { type: "h2", text: "お支払い方法・時期" },
  { type: "p", text: "【要確認】お支払い方法(銀行振込等)および時期をご記載ください。" },
  { type: "h2", text: "サービス提供時期" },
  { type: "p", text: "事前コンサルテーションおよびEWCとの治療ご契約後、確定した日程にてご案内いたします。" },
  { type: "h2", text: "キャンセル・返金について" },
  {
    type: "p",
    text: "【要確認】キャンセル・返金に関する規定(キャンセル料の発生時期・割合等)をご記載ください。医療の性質上、特別な規定が必要な場合があります。",
  },
];

async function upsertStaticPage(pageKey: "privacy" | "legal", title: string, nodes: Node[]) {
  const id = `staticPage-${pageKey}`;
  await client.createOrReplace({
    _id: id,
    _type: "staticPage",
    pageKey,
    title,
    body: toBlocks(nodes),
    isDraft: true,
    language: "ja",
  });
  console.log(`upserted: ${id}`);
}

async function run() {
  await upsertStaticPage("privacy", "プライバシーポリシー", privacyPolicyNodes);
  await upsertStaticPage("legal", "特定商取引法に基づく表記", legalPageNodes);
  console.log("完了");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
