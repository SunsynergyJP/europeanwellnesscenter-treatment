import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardBody, CardGrid } from "@/components/ui/Card";
import { getHomeVoices } from "@/lib/sanity/data";

const fallbackVoices = [
  { id: "1", youtubeId: "4lFaVJvpilg", title: "治療を受けた方のインタビュー ①" },
  { id: "2", youtubeId: "hatBpKei8XE", title: "治療を受けた方のインタビュー ②" },
  { id: "3", youtubeId: "iPAcK247kno", title: "治療を受けた方のインタビュー ③" },
];

export default async function VoicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cmsVoices = await getHomeVoices(locale);
  const voices =
    cmsVoices.length > 0
      ? cmsVoices.map((v) => ({ id: v._id, youtubeId: v.youtubeVideoId, title: v.title }))
      : fallbackVoices;

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="VOICES"
        title="患者様の声"
        description="European Wellness Centerで治療を受けられた方の一部のインタビュー動画です(YouTubeが別タブで開きます)。"
      />
      <CardGrid>
        {voices.map((video) => (
          <Card key={video.id} as="article">
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener"
              className="flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden bg-navy">
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={`${video.title}のサムネイル`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <CardBody>
                <p className="mb-1 text-sm font-medium text-navy">{video.title}</p>
                <p className="text-xs text-navy/50">動画を見る(YouTube)</p>
              </CardBody>
            </a>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
}
