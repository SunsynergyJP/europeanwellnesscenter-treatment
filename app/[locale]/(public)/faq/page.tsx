import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";
import { RichText } from "@/components/ui/RichText";
import { client } from "@/lib/sanity/client";
import { allFaqQuery } from "@/lib/sanity/queries";
import type { FaqDoc } from "@/lib/sanity/data";

const fallbackItems: AccordionItemData[] = [
  {
    id: "faq-1",
    question: "幹細胞治療とはどのような治療ですか?",
    answer:
      "PSC(前駆幹細胞)やASI治療など、日本の臨床では受けられない再生医療をEuropean Wellness Centerの現地エキスパート医師のもとで受けていただけます。",
  },
  {
    id: "faq-2",
    question: "どのような症状・疾患が対象になりますか?",
    answer: "難治性疾患からアンチエイジングまで幅広く対応しています。",
  },
];

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cmsFaqs = await client.fetch<FaqDoc[]>(
    allFaqQuery,
    { locale },
    { next: { tags: ["faq"] } },
  );

  const items: AccordionItemData[] =
    cmsFaqs.length > 0
      ? cmsFaqs.map((f) => ({
          id: f._id,
          question: f.question,
          answer: <RichText value={f.answer} />,
        }))
      : fallbackItems;

  return (
    <Section tone="white">
      <SectionHeading eyebrow="QUESTION" title="よくある質問" />
      <Accordion items={items} />
    </Section>
  );
}
