import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/features/forms/ContactForm";

export default function ContactPage() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="CONTACT"
        title="お問い合わせ・無料相談"
        description="ご相談・お申込みに関するご質問は、以下のフォームよりお気軽にお問い合わせください。"
      />
      <div className="max-w-xl">
        <ContactForm />
      </div>
    </Section>
  );
}
