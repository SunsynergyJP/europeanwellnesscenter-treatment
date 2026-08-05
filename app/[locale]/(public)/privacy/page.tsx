import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NoticeBox } from "@/components/ui/NoticeBox";
import { RichText } from "@/components/ui/RichText";
import { client } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";

type StaticPageDoc = {
  title?: string;
  body?: PortableTextBlock[];
  isDraft?: boolean;
};

const staticPageQuery = groq`*[_type == "staticPage" && pageKey == "privacy" && language == $locale][0]`;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await client.fetch<StaticPageDoc | null>(
    staticPageQuery,
    { locale },
    { next: { tags: ["staticPage"] } },
  );

  return (
    <Section tone="white">
      <SectionHeading eyebrow="PRIVACY POLICY" title={page?.title ?? "プライバシーポリシー"} />
      {page?.isDraft ? (
        <NoticeBox title="ドラフト(確認中)のページです" className="mb-8">
          本ページは一般的な医療サービスサイトを想定した草案です。貴社にて内容をご確認・修正の上、正式に公開してください。
        </NoticeBox>
      ) : null}
      {page?.body ? (
        <RichText value={page.body} />
      ) : (
        <NoticeBox title="準備中のページです">
          本ページのプライバシーポリシー本文は未確定です。医療情報・個人情報の取り扱いに関する正式な文言は、貴社法務確認の上で掲載いたします。
        </NoticeBox>
      )}
    </Section>
  );
}
