/**
 * 会社概要の実データ反映(https://sunsynergy.site/ourcompany より)。
 * 実行: npx sanity exec scripts/update-company-info.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

async function run() {
  await client
    .patch("companyInfo")
    .set({
      companyName: "株式会社サンシナジー(SUN SYNERGY Co., Ltd.)",
      representativeName: "代表取締役 木村慶子",
      foundedYear: "2006年3月28日",
      capital: "1,000万円",
      employeeCount: "38名(パート含)",
      address:
        "本社所在地: 東京都渋谷区初台二丁目26番1 セザール代々木公園B101号\nQSS事業部: 東京都千代田区永田町2-11-1 山王パークタワー3F",
      phoneNumber: "03-6383-3991",
      faxNumber: "03-6205-3100",
      businessDescription:
        "輸入貿易事業(医療系専門商社): 海外製剤・サプリメント・化粧品10ブランドの日本総販売代理店\n" +
        "メディカルリトリート事業: European Wellness Centerを拠点としたVIP向けメディカルリトリート事業\n" +
        "学会運営: 医師・歯科医師・獣医師向け3学会の運営\n" +
        "フィットネス事業: カーブスフィットネスクラブ都内3店舗運営\n" +
        "コンテンツ事業: 医学書の翻訳出版、医療従事者向けセミナー企画運営、医師向け教材販売\n" +
        "美容事業部: ドクターズコスメのEC及び卸売業\n" +
        "高圧酸素ボックス代理店業",
    })
    .commit();

  console.log("companyInfo を更新しました");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
