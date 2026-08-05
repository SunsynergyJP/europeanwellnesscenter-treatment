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

const staticPageQuery = groq`*[_type == "staticPage" && pageKey == "legal" && language == $locale][0]`;

export default async function LegalPage({
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
      <SectionHeading eyebrow="LEGAL" title={page?.title ?? "特定商取引法に基づく表記"} />
      {page?.isDraft ? (
        <NoticeBox title="ドラフト(確認中)のページです" className="mb-8">
          本ページは一般的な医療サービスサイトを想定した草案です。【要確認】と記載の箇所は貴社にてご確認・修正の上、正式に公開してください。特定商取引法の適用有無自体も併せてご確認ください。
        </NoticeBox>
      ) : null}
      {page?.body ? (
        <RichText value={page.body} />
      ) : (
        <NoticeBox title="準備中のページです">
          本ページの内容は未確定です。特定商取引法の適用有無を含め、貴社にてご確認の上、正式な内容を掲載いたします。
        </NoticeBox>
      )}
    </Section>
  );
}
