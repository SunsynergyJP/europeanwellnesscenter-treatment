import { defineField, defineType } from "sanity";

export default defineType({
  name: "treatmentMenu",
  title: "施術メニュー",
  type: "document",
  fields: [
    defineField({ name: "name", title: "名称", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "説明", type: "text" }),
    defineField({
      name: "relatedConditions",
      title: "対象症状",
      type: "array",
      of: [{ type: "reference", to: [{ type: "condition" }] }],
    }),
  ],
  preview: { select: { title: "name" } },
});
