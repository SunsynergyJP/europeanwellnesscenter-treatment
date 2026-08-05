import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NoticeBox } from "@/components/ui/NoticeBox";

export default function LegalPage() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow="LEGAL" title="特定商取引法に基づく表記" />
      <NoticeBox title="法務確認前のページです">
        本ページの内容は未確定です。特定商取引法の適用有無を含め、貴社にてご確認の上、正式な内容を掲載いたします。
      </NoticeBox>
    </Section>
  );
}
