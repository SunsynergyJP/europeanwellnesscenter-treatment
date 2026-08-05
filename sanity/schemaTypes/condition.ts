import { defineField, defineType } from "sanity";
import { languageField } from "./shared";

/**
 * 症状タグ(共有タクソノミー): Case / Voice / Post / Condition一覧ページで共用。
 */
export default defineType({
  name: "condition",
  title: "症状タグ",
  type: "document",
  fields: [
    defineField({ name: "name", title: "名称", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "スラッグ",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "説明(/conditions用)", type: "text" }),
    languageField,
  ],
  preview: { select: { title: "name" } },
});
