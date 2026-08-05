import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";
import {
  homeCasesQuery,
  homeFaqQuery,
  homeVoicesQuery,
  siteSettingsQuery,
} from "./queries";

export type SiteSettingsDoc = {
  siteName?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  caseDisclaimer?: string;
  membersInfoDisclaimer?: string;
};

export type CaseDoc = {
  _id: string;
  title: string;
  slug: { current: string };
  beforeAfterImages?: { label?: string; image?: SanityImageSource }[];
};

export type VoiceDoc = {
  _id: string;
  title: string;
  youtubeVideoId: string;
};

export type FaqDoc = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
};

const NEXT_OPTS = (tag: string) => ({ next: { tags: [tag] } });

export async function getSiteSettings(locale: string) {
  return client.fetch<SiteSettingsDoc | null>(
    siteSettingsQuery,
    { locale },
    NEXT_OPTS("siteSettings"),
  );
}

export async function getHomeCases(locale: string) {
  return client.fetch<CaseDoc[]>(homeCasesQuery, { locale }, NEXT_OPTS("case"));
}

export async function getHomeVoices(locale: string) {
  return client.fetch<VoiceDoc[]>(homeVoicesQuery, { locale }, NEXT_OPTS("voice"));
}

export async function getHomeFaqs(locale: string) {
  return client.fetch<FaqDoc[]>(homeFaqQuery, { locale }, NEXT_OPTS("faq"));
}
