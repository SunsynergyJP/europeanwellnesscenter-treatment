import { defineField, defineType } from "sanity";
import { orderField } from "./shared";

export default defineType({
  name: "checklistItem",
  title: "TO-DOリスト項目",
  type: "document",
  fields: [
    defineField({ name: "title", title: "タスク名", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "説明", type: "text" }),
    defineField({
      name: "category",
      title: "カテゴリ",
      type: "string",
      options: {
        list: [
          { title: "書類準備", value: "documents" },
          { title: "健康管理", value: "health" },
          { title: "持ち物", value: "packing" },
        ],
      },
    }),
    defineField({ name: "daysBeforeDeparture", title: "期限目安(出発◯日前)", type: "number" }),
    orderField,
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});
