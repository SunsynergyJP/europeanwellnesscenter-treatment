import { defineField } from "sanity";

/**
 * Phase4方針: ドキュメント単位の言語分割方式。
 * 各翻訳可能ドキュメントにこのフィールドを含める。
 */
export const languageField = defineField({
  name: "language",
  title: "言語",
  type: "string",
  options: {
    list: [
      { title: "日本語", value: "ja" },
      { title: "English", value: "en" },
      { title: "中文", value: "zh" },
    ],
  },
  initialValue: "ja",
  validation: (Rule) => Rule.required(),
});

export const orderField = defineField({
  name: "order",
  title: "表示順",
  type: "number",
  initialValue: 0,
});

export const featuredOnHomeField = defineField({
  name: "featuredOnHome",
  title: "トップページに掲載する",
  type: "boolean",
  initialValue: false,
});
