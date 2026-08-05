import { defineField, defineType } from "sanity";
import { languageField } from "./shared";

export default defineType({
  name: "companyInfo",
  title: "会社情報",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "会社名", type: "string" }),
    defineField({ name: "address", title: "所在地", type: "string" }),
    defineField({ name: "representativeName", title: "代表者", type: "string" }),
    defineField({ name: "foundedYear", title: "設立年", type: "string" }),
    defineField({ name: "businessDescription", title: "事業内容", type: "text" }),
    defineField({ name: "phoneNumber", title: "電話番号", type: "string" }),
    languageField,
  ],
});
