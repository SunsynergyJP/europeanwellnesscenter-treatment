/**
 * 初期コンテンツ投入スクリプト。
 * 実行: npx sanity exec scripts/seed.ts --with-user-token
 *
 * これまでハードコードしていたプレースホルダー内容をSanityへ投入し、
 * 「実データ接続」の動作確認をできる状態にする。本番コンテンツではない。
 */
import { getCliClient } from "sanity/cli";
import fs from "node:fs";
import path from "node:path";

const client = getCliClient({ apiVersion: "2025-01-01" });

function imagePath(name: string) {
  return path.join(process.cwd(), "public", "images", name);
}

async function uploadImage(name: string) {
  const filePath = imagePath(name);
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: name,
  });
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function createIfMissing(doc: Record<string, unknown> & { _id: string; _type: string }) {
  const exists = await client.getDocument(doc._id);
  if (exists) {
    console.log(`skip (exists): ${doc._id}`);
    return;
  }
  await client.createOrReplace(doc);
  console.log(`created: ${doc._id}`);
}

async function run() {
  // --- サイト設定(シングルトン) ---
  await createIfMissing({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "European Wellness Center コタキナバル",
    ctaPrimaryLabel: "お申込みはコチラ",
    ctaSecondaryLabel: "お問い合わせはコチラ",
    caseDisclaimer:
      "掲載の症例は治療効果を保証するものではありません。効果には個人差があり、症状や治療内容によって結果は異なります。",
    membersInfoDisclaimer:
      "本ページの情報は情報提供のみを目的としており、弊社はその正確性を保証するものではなく、これらの情報に起因するいかなる結果についても責任を負いかねます。",
    language: "ja",
  });

  // --- 会社情報(シングルトン) ---
  await createIfMissing({
    _id: "companyInfo",
    _type: "companyInfo",
    companyName: "SUN SYNERGY Co., Ltd.(株式会社サンシナジー)",
    language: "ja",
  });

  // --- 症状タグ ---
  const conditions = [
    { _id: "condition-down-syndrome", name: "ダウン症" },
    { _id: "condition-placenta", name: "プラセンタ" },
    { _id: "condition-anti-aging", name: "アンチエイジング" },
  ];
  for (const c of conditions) {
    await createIfMissing({ ...c, _type: "condition", language: "ja" });
  }

  // --- 症例 ---
  const downSyndromeImage = await uploadImage("case-down-syndrome.png");
  await createIfMissing({
    _id: "case-down-syndrome-01",
    _type: "case",
    title: "ダウン症の治療症例",
    slug: { _type: "slug", current: "down-syndrome-01" },
    condition: { _type: "reference", _ref: "condition-down-syndrome" },
    beforeAfterImages: [{ _key: "img1", label: "経過", image: downSyndromeImage }],
    featuredOnHome: true,
    order: 1,
    language: "ja",
  });

  const placentaImage = await uploadImage("case-placenta.png");
  await createIfMissing({
    _id: "case-placenta-01",
    _type: "case",
    title: "プラセンタの投与",
    slug: { _type: "slug", current: "placenta-01" },
    condition: { _type: "reference", _ref: "condition-placenta" },
    beforeAfterImages: [{ _key: "img1", label: "投与前後", image: placentaImage }],
    featuredOnHome: true,
    order: 2,
    language: "ja",
  });

  // --- 医師 ---
  const doctorsPhoto = await uploadImage("doctors-cover.png");
  await createIfMissing({
    _id: "doctor-mmj-team",
    _type: "doctor",
    name: "MMJドクター・現地エキスパート医師団",
    slug: { _type: "slug", current: "mmj-team" },
    photo: doctorsPhoto,
    role: "European Wellness Center",
    order: 1,
    language: "ja",
  });

  // --- 患者様の声(YouTube) ---
  const voices = [
    { id: "voice-1", youtubeVideoId: "4lFaVJvpilg", title: "治療を受けた方のインタビュー ①" },
    { id: "voice-2", youtubeVideoId: "hatBpKei8XE", title: "治療を受けた方のインタビュー ②" },
    { id: "voice-3", youtubeVideoId: "iPAcK247kno", title: "治療を受けた方のインタビュー ③" },
  ];
  for (const [index, v] of voices.entries()) {
    await createIfMissing({
      _id: v.id,
      _type: "voice",
      title: v.title,
      youtubeVideoId: v.youtubeVideoId,
      order: index + 1,
      language: "ja",
    });
  }

  // --- FAQ ---
  const faqs = [
    {
      id: "faq-1",
      question: "幹細胞治療とはどのような治療ですか?",
      answer:
        "PSC(前駆幹細胞)やASI治療など、日本の臨床では受けられない再生医療をEuropean Wellness Centerの現地エキスパート医師のもとで受けていただけます。",
      category: "treatment",
    },
    {
      id: "faq-2",
      question: "日本人スタッフのサポートはありますか?",
      answer:
        "MMJドクターの先生方が現地エキスパート医師と協調しながら、現地治療と日本での治療を組み合わせたサポート体制を整えています。",
      category: "treatment",
    },
    {
      id: "faq-3",
      question: "渡航や滞在について不安があります",
      answer:
        "お申込み後は専用のご案内ページ(参加者専用エリア)で渡航前の注意事項、現地情報、TO-DOリストなどをご確認いただけます。",
      category: "travel",
    },
  ];
  for (const [index, f] of faqs.entries()) {
    await createIfMissing({
      _id: f.id,
      _type: "faq",
      question: f.question,
      answer: [
        {
          _type: "block",
          _key: "block1",
          children: [{ _type: "span", _key: "span1", text: f.answer }],
        },
      ],
      category: f.category,
      featuredOnHome: true,
      order: index + 1,
      language: "ja",
    });
  }

  console.log("Seed完了");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
