import { groq } from "next-sanity";

/**
 * NOTE: 現時点ではページ側の実データ取得はプレースホルダーのままで、
 * これらのクエリは未接続です(Phase8継続タスク)。
 */

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && language == $locale][0]
`;

export const homeCasesQuery = groq`
  *[_type == "case" && featuredOnHome == true && language == $locale] | order(order asc)
`;

export const homeVoicesQuery = groq`
  *[_type == "voice" && language == $locale] | order(order asc)
`;

export const homeFaqQuery = groq`
  *[_type == "faq" && featuredOnHome == true && language == $locale] | order(order asc)
`;

export const caseBySlugQuery = groq`
  *[_type == "case" && slug.current == $slug && language == $locale][0]{
    ...,
    condition->,
    relatedDoctor->
  }
`;

export const doctorBySlugQuery = groq`
  *[_type == "doctor" && slug.current == $slug && language == $locale][0]
`;
