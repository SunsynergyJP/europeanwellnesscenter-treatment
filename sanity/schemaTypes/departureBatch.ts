import { defineField, defineType } from "sanity";

export default defineType({
  name: "departureBatch",
  title: "渡航バッチ",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "バッチ名/回次(例: 2026年10月渡航)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "departureDate", title: "出発日", type: "date" }),
    defineField({ name: "returnDate", title: "帰国日", type: "date" }),
    defineField({ name: "flightInfo", title: "便の紹介", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "staff",
      title: "同行スタッフ",
      type: "array",
      of: [{ type: "reference", to: [{ type: "staff" }] }],
    }),
  ],
  preview: { select: { title: "name", subtitle: "departureDate" } },
});
