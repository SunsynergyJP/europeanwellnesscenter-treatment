import { defineField, defineType } from "sanity";
import { languageField } from "./shared";

/**
 * サイト全体設定(シングルトン)。
 * 免責文言はここで一元管理し、症例/会員エリア各ページから参照する(Phase4/5方針)。
 */
export default defineType({
  name: "siteSettings",
  title: "サイト設定",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "サイト名", type: "string" }),
    defineField({ name: "logo", title: "ロゴ", type: "image" }),
    defineField({ name: "defaultOgImage", title: "デフォルトOGP画像", type: "image" }),
    defineField({
      name: "headerNav",
      title: "ヘッダーナビゲーション",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "ラベル", type: "string" }),
            defineField({ name: "href", title: "リンク先", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "ctaPrimaryLabel", title: "CTA(プライマリ)文言", type: "string" }),
    defineField({ name: "ctaSecondaryLabel", title: "CTA(セカンダリ)文言", type: "string" }),
    defineField({
      name: "caseDisclaimer",
      title: "症例ページ免責文言",
      type: "text",
      description: "効果の個人差に関する免責。症例詳細ページに自動表示。",
    }),
    defineField({
      name: "membersInfoDisclaimer",
      title: "会員エリア情報提供免責文言",
      type: "text",
      description: "便・パスポート・ビザ等の情報提供に関する免責。会員エリア該当ページに自動表示。",
    }),
    languageField,
  ],
});
