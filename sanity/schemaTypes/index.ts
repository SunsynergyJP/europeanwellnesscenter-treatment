import { type SchemaTypeDefinition } from "sanity";

import caseType from "./case";
import doctor from "./doctor";
import voice from "./voice";
import faq from "./faq";
import post from "./post";
import condition from "./condition";
import siteSettings from "./siteSettings";
import companyInfo from "./companyInfo";
import departureBatch from "./departureBatch";
import participant from "./participant";
import staff from "./staff";
import treatmentMenu from "./treatmentMenu";
import checklistItem from "./checklistItem";
import localInfoQA from "./localInfoQA";
import documentChecklistItem from "./documentChecklistItem";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // コンテンツ管理(Phase4)
    caseType,
    doctor,
    voice,
    faq,
    post,
    // マスタ設定
    condition,
    treatmentMenu,
    // サイト全体設定
    siteSettings,
    companyInfo,
    // 参加者専用エリア(Phase2〜4追加設計)
    departureBatch,
    participant,
    staff,
    checklistItem,
    localInfoQA,
    documentChecklistItem,
  ],
};
