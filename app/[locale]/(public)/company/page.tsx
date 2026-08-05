import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NoticeBox } from "@/components/ui/NoticeBox";

/**
 * NOTE: 会社概要の詳細情報(所在地・代表者・電話番号等)は未確定のため
 * 確認済みの情報のみ掲載しています。CompanyInfo(Sanity)確定後に差し替えます。
 */
const companyFacts = [
  { label: "会社名", value: "SUN SYNERGY Co., Ltd.(株式会社サンシナジー)" },
];

export default function CompanyPage() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow="COMPANY" title="運営会社" />
      <dl className="divide-y divide-navy/10 border-y border-navy/10">
        {companyFacts.map((fact) => (
          <div key={fact.label} className="grid gap-1 py-4 sm:grid-cols-4 sm:gap-4">
            <dt className="text-sm text-navy/60">{fact.label}</dt>
            <dd className="text-sm text-navy sm:col-span-3">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <NoticeBox title="会社概要の詳細は確認中です" className="mt-8">
        所在地・代表者名・電話番号等の詳細情報は確認が取れ次第、追記いたします。
      </NoticeBox>
    </Section>
  );
}
