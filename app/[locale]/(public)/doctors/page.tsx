import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardBody, CardGrid } from "@/components/ui/Card";
import { PageStub } from "@/components/features/misc/PageStub";
import { Link } from "@/lib/i18n/navigation";
import { client } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

type DoctorListDoc = {
  _id: string;
  name: string;
  slug: { current: string };
  role?: string;
  photo?: SanityImageSource;
};

const allDoctorsQuery = groq`
  *[_type == "doctor" && language == $locale] | order(order asc)
`;

export default async function DoctorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doctors = await client.fetch<DoctorListDoc[]>(
    allDoctorsQuery,
    { locale },
    { next: { tags: ["doctor"] } },
  );

  if (doctors.length === 0) {
    return (
      <PageStub
        eyebrow="DOCTORS"
        title="医師・医療体制"
        description="MMJドクターと現地エキスパート医師団をご紹介します。"
      />
    );
  }

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="DOCTORS"
        title="医師・医療体制"
        description="MMJドクターと現地エキスパート医師団をご紹介します。"
      />
      <CardGrid>
        {doctors.map((doctor) => (
          <Card key={doctor._id} as="article">
            <Link href={`/doctors/${doctor.slug.current}`} className="flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-navy">
                {doctor.photo ? (
                  <Image
                    src={urlForImage(doctor.photo).width(600).height(600).url()}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <CardBody>
                <p className="text-sm font-medium text-navy">{doctor.name}</p>
                {doctor.role ? <p className="mt-1 text-xs text-navy/50">{doctor.role}</p> : null}
              </CardBody>
            </Link>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
}
