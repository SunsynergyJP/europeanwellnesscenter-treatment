import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Section tone="white">
      <SectionHeading eyebrow="DOCTOR" title={`医師プロフィール(${slug})`} />
    </Section>
  );
}
