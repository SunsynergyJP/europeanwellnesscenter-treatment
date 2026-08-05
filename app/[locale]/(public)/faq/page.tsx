import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

/**
 * NOTE: プレースホルダーFAQです。Sanity連携後は`faq`コレクションの
 * category(治療について/費用について/渡航について等)別に表示します。
 */
const faqItems = [
  {
    id: "faq-1",
    question: "幹細胞治療とはどのような治療ですか?",
    answer:
      "PSC(前駆幹細胞)やASI治療など、日本の臨床では受けられない再生医療をEuropean Wellness Centerの現地エキスパート医師のもとで受けていただけます。",
  },
  {
    id: "faq-2",
    question: "日本人スタッフのサポートはありますか?",
    answer:
      "MMJドクターの先生方が現地エキスパート医師と協調しながら、現地治療と日本での治療を組み合わせたサポート体制を整えています。",
  },
  {
    id: "faq-3",
    question: "どのような症状・疾患が対象になりますか?",
    answer:
      "難治性疾患からアンチエイジングまで幅広く対応しています。詳細は対象となる症状のページをご確認ください。",
  },
  {
    id: "faq-4",
    question: "渡航や滞在について不安があります",
    answer:
      "お申込み後は専用のご案内ページ(参加者専用エリア)で渡航前の注意事項、現地情報、TO-DOリストなどをご確認いただけます。",
  },
  {
    id: "faq-5",
    question: "まずは何から始めればよいですか?",
    answer:
      "無料相談・お問い合わせフォームからご連絡ください。ご説明会のご案内をさせていただきます。",
  },
];

export default function FaqPage() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow="QUESTION" title="よくある質問" />
      <Accordion items={faqItems} />
    </Section>
  );
}
