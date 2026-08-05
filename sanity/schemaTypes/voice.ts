import { defineField, defineType } from "sanity";
import { languageField, orderField } from "./shared";

/**
 * 患者様の声。研修LPと同一パターン(YouTube動画への外部リンクカード)を採用。
 */
export default defineType({
  name: "voice",
  title: "患者様の声",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "キャプション(例: 治療を受けた方のインタビュー①)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeVideoId",
      title: "YouTube動画ID",
      type: "string",
      description: "動画URLの v= の後ろの部分(例: 4lFaVJvpilg)",
      validation: (Rule) => Rule.required(),
    }),
    orderField,
    languageField,
  ],
  preview: { select: { title: "title", subtitle: "youtubeVideoId" } },
});
