import { defineField, defineType } from "sanity";

/**
 * 参加者プロフィール。氏名・メール等の個人情報を含むため、
 * Studio側で編集・閲覧権限を管理者ロールに限定すること(Phase4方針)。
 */
export default defineType({
  name: "participant",
  title: "参加者プロフィール",
  type: "document",
  fields: [
    defineField({ name: "name", title: "氏名", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "email", title: "メールアドレス", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "batch",
      title: "所属バッチ",
      type: "reference",
      to: [{ type: "departureBatch" }],
    }),
    defineField({
      name: "documentStatus",
      title: "書類提出ステータス",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "documentName", title: "書類名", type: "string" }),
            defineField({ name: "submitted", title: "提出済み", type: "boolean", initialValue: false }),
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: "name", subtitle: "email" } },
});
