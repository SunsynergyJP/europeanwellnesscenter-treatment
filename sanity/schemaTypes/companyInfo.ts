import { defineField, defineType } from "sanity";
import { languageField } from "./shared";

export default defineType({
  name: "companyInfo",
  title: "会社情報",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "会社名", type: "string" }),
    defineField({ name: "address", title: "所在地", type: "text" }),
    defineField({ name: "representativeName", title: "代表者", type: "string" }),
    defineField({ name: "foundedYear", title: "設立年", type: "string" }),
    defineField({ name: "capital", title: "資本金", type: "string" }),
    defineField({ name: "employeeCount", title: "従業員数", type: "string" }),
    defineField({ name: "businessDescription", title: "事業内容", type: "text" }),
    defineField({ name: "phoneNumber", title: "電話番号", type: "string" }),
    defineField({ name: "faxNumber", title: "FAX番号", type: "string" }),
    languageField,
  ],
});
