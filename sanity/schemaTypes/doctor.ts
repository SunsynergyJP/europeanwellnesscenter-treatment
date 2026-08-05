import { defineField, defineType } from "sanity";
import { languageField, orderField } from "./shared";

export default defineType({
  name: "doctor",
  title: "医師紹介",
  type: "document",
  fields: [
    defineField({ name: "name", title: "氏名", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "スラッグ",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "photo", title: "写真", type: "image", options: { hotspot: true } }),
    defineField({ name: "role", title: "肩書き", type: "string" }),
    defineField({
      name: "specialties",
      title: "専門分野",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "credentials", title: "資格・経歴", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "message", title: "メッセージ", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "relatedCases",
      title: "関連症例",
      type: "array",
      of: [{ type: "reference", to: [{ type: "case" }] }],
    }),
    orderField,
    languageField,
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
