import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NoticeBox } from "@/components/ui/NoticeBox";
import { client } from "@/lib/sanity/client";
import { groq } from "next-sanity";

type CompanyInfoDoc = {
  companyName?: string;
  address?: string;
  representativeName?: string;
  foundedYear?: string;
  businessDescription?: string;
  phoneNumber?: string;
};

const companyInfoQuery = groq`*[_type == "companyInfo" && language == $locale][0]`;

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const companyInfo = await client.fetch<CompanyInfoDoc | null>(
    companyInfoQuery,
    { locale },
    { next: { tags: ["companyInfo"] } },
  );

  const facts = [
    { label: "会社名", value: companyInfo?.companyName ?? "SUN SYNERGY Co., Ltd.(株式会社サンシナジー)" },
    { label: "所在地", value: companyInfo?.address },
    { label: "代表者", value: companyInfo?.representativeName },
    { label: "設立", value: companyInfo?.foundedYear },
    { label: "事業内容", value: companyInfo?.businessDescription },
    { label: "電話番号", value: companyInfo?.phoneNumber },
  ].filter((fact) => Boolean(fact.value));

  const hasAllDetails = facts.length >= 5;

  return (
    <Section tone="white">
      <SectionHeading eyebrow="COMPANY" title="運営会社" />
      <dl className="divide-y divide-navy/10 border-y border-navy/10">
        {facts.map((fact) => (
          <div key={fact.label} className="grid gap-1 py-4 sm:grid-cols-4 sm:gap-4">
            <dt className="text-sm text-navy/60">{fact.label}</dt>
            <dd className="text-sm text-navy sm:col-span-3">{fact.value}</dd>
          </div>
        ))}
      </dl>
      {!hasAllDetails && (
        <NoticeBox title="会社概要の詳細は確認中です" className="mt-8">
          所在地・代表者名・電話番号等の詳細情報は確認が取れ次第、Studioの会社情報から追記いたします。
        </NoticeBox>
      )}
    </Section>
  );
}
