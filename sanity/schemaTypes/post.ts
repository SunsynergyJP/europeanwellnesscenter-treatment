import { defineField, defineType } from "sanity";
import { languageField } from "./shared";

export default defineType({
  name: "post",
  title: "お知らせ・コラム",
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
      name: "category",
      title: "カテゴリ",
      type: "string",
      options: {
        list: [
          { title: "お知らせ", value: "news" },
          { title: "コラム", value: "column" },
          { title: "メディア掲載", value: "media" },
        ],
      },
    }),
    defineField({ name: "coverImage", title: "カバー画像", type: "image", options: { hotspot: true } }),
    defineField({ name: "excerpt", title: "抜粋(一覧・OGP用)", type: "text" }),
    defineField({ name: "body", title: "本文", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "author", title: "著者", type: "reference", to: [{ type: "doctor" }] }),
    defineField({ name: "publishedAt", title: "公開日", type: "datetime" }),
    defineField({ name: "tags", title: "タグ", type: "array", of: [{ type: "string" }] }),
    languageField,
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
