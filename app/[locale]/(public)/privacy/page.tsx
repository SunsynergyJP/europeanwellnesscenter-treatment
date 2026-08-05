import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NoticeBox } from "@/components/ui/NoticeBox";

export default function PrivacyPage() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow="PRIVACY POLICY" title="プライバシーポリシー" />
      <NoticeBox title="法務確認前のページです">
        本ページのプライバシーポリシー本文は未確定です。医療情報・個人情報の取り扱いに関する正式な文言は、貴社法務確認の上で掲載いたします。
      </NoticeBox>
    </Section>
  );
}
