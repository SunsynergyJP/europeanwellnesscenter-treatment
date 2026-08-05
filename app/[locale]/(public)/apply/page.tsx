import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    step: "1",
    title: "ご説明会",
    description: "フォームからお申し込みいただくと、オンライン説明会のご案内をいたします。",
  },
  {
    step: "2",
    title: "事前コンサルテーション",
    description: "現地のエキスパートDr.によるオーダーメイドの治療計画をご提案いたします。",
  },
  {
    step: "3",
    title: "EWC日本語治療計画測定",
    description: "EWCとの治療ご契約後、日本語での治療計画を確定します。",
  },
  {
    step: "4",
    title: "治療開始",
    description: "コタキナバルにて治療を開始します。",
  },
];

export default function ApplyPage() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow="FLOW" title="お申し込みの流れ" />
      <ol className="space-y-8">
        {steps.map((s) => (
          <li key={s.step} className="flex gap-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-dark font-serif text-gold-dark">
              {s.step}
            </span>
            <div>
              <p className="font-medium text-navy">{s.title}</p>
              <p className="mt-1 text-sm text-navy/70">{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <Button href="/contact">お申込みはコチラ</Button>
      </div>
    </Section>
  );
}
