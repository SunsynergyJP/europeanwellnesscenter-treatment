import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardBody, CardGrid } from "@/components/ui/Card";
import { PageStub } from "@/components/features/misc/PageStub";
import { Link } from "@/lib/i18n/navigation";
import { client } from "@/lib/sanity/client";
import { allCasesQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import type { CaseDoc } from "@/lib/sanity/data";

type CaseListDoc = CaseDoc & { condition?: { name?: string } };

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cases = await client.fetch<CaseListDoc[]>(
    allCasesQuery,
    { locale },
    { next: { tags: ["case"] } },
  );

  if (cases.length === 0) {
    return (
      <PageStub
        eyebrow="CASES"
        title="症例紹介"
        description="ダウン症の治療症例、プラセンタの投与など、実際の症例をご紹介します。"
      />
    );
  }

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="CASES"
        title="症例紹介"
        description="ダウン症の治療症例、プラセンタの投与など、実際の症例をご紹介します。"
      />
      <CardGrid>
        {cases.map((c) => {
          const image = c.beforeAfterImages?.[0]?.image;
          return (
            <Card key={c._id} as="article">
              <Link href={`/cases/${c.slug.current}`} className="flex flex-col">
                <div className="relative aspect-video overflow-hidden bg-navy">
                  {image ? (
                    <Image
                      src={urlForImage(image).width(800).height(450).url()}
                      alt={c.title}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <CardBody>
                  {c.condition?.name ? (
                    <p className="mb-1 text-xs text-gold-dark">{c.condition.name}</p>
                  ) : null}
                  <p className="text-sm font-medium text-navy">{c.title}</p>
                </CardBody>
              </Link>
            </Card>
          );
        })}
      </CardGrid>
    </Section>
  );
}
