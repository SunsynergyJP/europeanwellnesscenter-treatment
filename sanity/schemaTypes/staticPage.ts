import { defineField, defineType } from "sanity";
import { languageField } from "./shared";

/**
 * プライバシーポリシー・特定商取引法に基づく表記など、
 * 改訂頻度は低いが非エンジニアが編集できる必要がある静的ページ。
 */
export default defineType({
  name: "staticPage",
  title: "静的ページ",
  type: "document",
  fields: [
    defineField({
      name: "pageKey",
      title: "ページ識別子",
      type: "string",
      options: { list: [{ title: "プライバシーポリシー", value: "privacy" }, { title: "特定商取引法に基づく表記", value: "legal" }] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", title: "タイトル", type: "string" }),
    defineField({ name: "body", title: "本文", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "isDraft",
      title: "ドラフト(未確定)",
      type: "boolean",
      initialValue: true,
      description: "貴社での確認・修正が完了するまでON。ONの間はページ上部に注記が表示されます。",
    }),
    languageField,
  ],
  preview: { select: { title: "title", subtitle: "pageKey" } },
});
