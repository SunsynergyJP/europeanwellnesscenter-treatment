import { defineField, defineType } from "sanity";
import { languageField, orderField, featuredOnHomeField } from "./shared";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "質問", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "回答", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "category",
      title: "カテゴリ",
      type: "string",
      options: {
        list: [
          { title: "治療について", value: "treatment" },
          { title: "費用について", value: "pricing" },
          { title: "渡航について", value: "travel" },
          { title: "その他", value: "other" },
        ],
      },
    }),
    orderField,
    featuredOnHomeField,
    languageField,
  ],
  preview: { select: { title: "question" } },
});
