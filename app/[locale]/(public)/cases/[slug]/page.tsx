import { NoticeBox } from "@/components/ui/NoticeBox";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Section tone="white">
      <SectionHeading eyebrow="CASE" title={`症例詳細(${slug})`} />
      <NoticeBox title="効果には個人差があります">
        掲載の症例は治療効果を保証するものではありません。効果には個人差があり、症状や治療内容によって結果は異なります。
      </NoticeBox>
    </Section>
  );
}
