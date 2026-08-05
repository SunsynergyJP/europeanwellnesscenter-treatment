import { defineField, defineType } from "sanity";
import { orderField } from "./shared";

/**
 * 会員限定の現地Q&A(渡航実務)。公開FAQ(treatment/pricing/travel)とは
 * 内容領域が異なるため、あえて別コレクションとして分離している(Phase4方針)。
 */
export default defineType({
  name: "localInfoQA",
  title: "現地Q&A(会員限定)",
  type: "document",
  fields: [
    defineField({ name: "question", title: "質問", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "回答", type: "array", of: [{ type: "block" }] }),
    orderField,
  ],
  preview: { select: { title: "question" } },
});
