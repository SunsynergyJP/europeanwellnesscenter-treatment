import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NoticeBox } from "@/components/ui/NoticeBox";

/**
 * Sanity連携・実コンテンツ確定までの仮ページ。
 * IA上の全ルートを実際にナビゲーション・確認できる状態にするための
 * 最小実装であり、最終コンテンツではない。
 */
export function PageStub({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Section tone="white" className="min-h-[50vh]">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <NoticeBox title="準備中のページです">
        このページのコンテンツは現在準備中です。実コンテンツの確定後、CMS(Studio)経由で公開されます。
      </NoticeBox>
    </Section>
  );
}
