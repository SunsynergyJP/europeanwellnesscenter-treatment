import { defineField, defineType } from "sanity";

export default defineType({
  name: "staff",
  title: "同行スタッフ",
  type: "document",
  fields: [
    defineField({ name: "name", title: "氏名", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "photo", title: "写真", type: "image", options: { hotspot: true } }),
    defineField({ name: "role", title: "役割", type: "string" }),
    defineField({ name: "message", title: "メッセージ", type: "text" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
