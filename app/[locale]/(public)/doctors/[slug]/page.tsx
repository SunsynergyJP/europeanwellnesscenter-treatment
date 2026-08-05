import Image from "next/image";
import { notFound } from "next/navigation";
import { RichText } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { client } from "@/lib/sanity/client";
import { doctorBySlugQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

type DoctorDetail = {
  name: string;
  role?: string;
  photo?: SanityImageSource;
  credentials?: PortableTextBlock[];
  message?: PortableTextBlock[];
};

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const doctor = await client.fetch<DoctorDetail | null>(
    doctorBySlugQuery,
    { slug, locale },
    { next: { tags: ["doctor"] } },
  );

  if (!doctor) {
    notFound();
  }

  return (
    <Section tone="white">
      <div className="grid gap-10 md:grid-cols-[280px_1fr]">
        {doctor.photo ? (
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <Image
              src={urlForImage(doctor.photo).width(560).height(560).url()}
              alt={doctor.name}
              fill
              className="object-cover"
            />
          </div>
        ) : null}
        <div>
          <SectionHeading eyebrow="DOCTOR" title={doctor.name} description={doctor.role} />
          <RichText value={doctor.message} className="mb-6" />
          <RichText value={doctor.credentials} />
        </div>
      </div>
    </Section>
  );
}
