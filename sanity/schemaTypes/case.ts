import { defineField, defineType } from "sanity";
import { languageField, orderField, featuredOnHomeField } from "./shared";

export default defineType({
  name: "case",
  title: "症例紹介",
  type: "document",
  fields: [
    defineField({ name: "title", title: "タイトル", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "スラッグ",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "condition",
      title: "症状タグ",
      type: "reference",
      to: [{ type: "condition" }],
    }),
    defineField({
      name: "beforeAfterImages",
      title: "Before/After画像",
      type: "array",
      of: [
        {
          type: "object",
          name: "beforeAfterImage",
          fields: [
            defineField({ name: "label", title: "ラベル(例: 投与前/投与後)", type: "string" }),
            defineField({ name: "image", title: "画像", type: "image", options: { hotspot: true } }),
          ],
        },
      ],
    }),
    defineField({ name: "patientProfile", title: "患者属性(年齢層等・匿名化)", type: "string" }),
    defineField({ name: "body", title: "症例詳細", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "relatedDoctor",
      title: "担当医師",
      type: "reference",
      to: [{ type: "doctor" }],
    }),
    featuredOnHomeField,
    orderField,
    languageField,
  ],
  preview: { select: { title: "title", subtitle: "patientProfile" } },
});
