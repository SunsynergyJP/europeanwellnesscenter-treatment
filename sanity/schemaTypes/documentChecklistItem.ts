import { defineField, defineType } from "sanity";
import { orderField } from "./shared";

export default defineType({
  name: "documentChecklistItem",
  title: "提出書類チェックリスト",
  type: "document",
  fields: [
    defineField({ name: "name", title: "書類名", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "required", title: "必須", type: "boolean", initialValue: true }),
    defineField({
      name: "submissionUrl",
      title: "提出先URL(外部の安全な提出先)",
      type: "url",
      description: "実際の提出先サービス確定後に設定。コード変更なしで差し替え可能。",
    }),
    orderField,
  ],
  preview: { select: { title: "name" } },
});
