import Image from "next/image";
import { notFound } from "next/navigation";
import { NoticeBox } from "@/components/ui/NoticeBox";
import { RichText } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { client } from "@/lib/sanity/client";
import { caseBySlugQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { getSiteSettings } from "@/lib/sanity/data";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

type CaseDetail = {
  _id: string;
  title: string;
  beforeAfterImages?: { label?: string; image?: SanityImageSource }[];
  body?: PortableTextBlock[];
  condition?: { name?: string };
};

const DEFAULT_DISCLAIMER =
  "掲載の症例は治療効果を保証するものではありません。効果には個人差があり、症状や治療内容によって結果は異なります。";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const [caseDoc, siteSettings] = await Promise.all([
    client.fetch<CaseDetail | null>(
      caseBySlugQuery,
      { slug, locale },
      { next: { tags: ["case"] } },
    ),
    getSiteSettings(locale),
  ]);

  if (!caseDoc) {
    notFound();
  }

  return (
    <Section tone="white">
      <SectionHeading eyebrow="CASE" title={caseDoc.title} />

      {caseDoc.condition?.name ? (
        <p className="mb-6 text-xs text-gold-dark">{caseDoc.condition.name}</p>
      ) : null}

      {caseDoc.beforeAfterImages?.length ? (
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {caseDoc.beforeAfterImages.map((item, index) =>
            item.image ? (
              <div key={index} className="relative aspect-video overflow-hidden rounded-sm">
                <Image
                  src={urlForImage(item.image).width(800).height(450).url()}
                  alt={item.label ?? caseDoc.title}
                  fill
                  className="object-cover"
                />
                {item.label ? (
                  <span className="absolute left-2 top-2 rounded-sm bg-navy/80 px-2 py-1 text-xs text-offwhite">
                    {item.label}
                  </span>
                ) : null}
              </div>
            ) : null,
          )}
        </div>
      ) : null}

      <RichText value={caseDoc.body} className="mb-8" />

      <NoticeBox title="効果には個人差があります">
        {siteSettings?.caseDisclaimer ?? DEFAULT_DISCLAIMER}
      </NoticeBox>
    </Section>
  );
}
