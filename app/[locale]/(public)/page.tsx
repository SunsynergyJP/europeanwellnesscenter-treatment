import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardGrid } from "@/components/ui/Card";
import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";
import { RichText } from "@/components/ui/RichText";
import { Link } from "@/lib/i18n/navigation";
import { getHomeCases, getHomeFaqs, getHomeVoices } from "@/lib/sanity/data";
import { urlForImage } from "@/lib/sanity/image";

/**
 * トップページ(Phase1ワイヤーフレーム/Phase3ブループリント準拠)。
 *
 * 症例・患者様の声・FAQはSanityから取得する。データが未投入の場合に
 * 空白セクションにならないよう、フォールバック用の静的コンテンツを保持している。
 * Testimonialsは研修LP(#voices)と同じYouTube3本パターンを採用。
 */

const conditionGroups = [
  {
    title: "こんなお悩みをお持ちの方も",
    items: [
      "脳や身体機能、見た目も誰よりも若くありたい",
      "ゴルフの飛距離を伸ばしたい",
      "まだまだ現役で仕事を頑張りたい",
      "旅行や趣味、思いっきり人生を楽しみたい",
    ],
  },
  {
    title: "アンチエイジングも",
    items: ["ひざ", "骨", "中性脂肪", "うつ", "腰痛", "肩こり", "関節", "しわ", "物忘れ", "血圧", "しみ", "育毛", "血糖値", "たるみ"],
  },
  {
    title: "様々な疾患を抱える方も",
    items: [
      "神経性疾患",
      "心筋症",
      "肝疾患",
      "慢性肺疾患",
      "てんかん",
      "内分泌疾患",
      "網膜症",
      "ダウン症",
      "慢性腎疾患",
      "パーキンソン病",
      "アルツハイマー病(AD)",
      "自閉症スペクトラム障害",
    ],
  },
];

const applySteps = [
  { step: "1", title: "ご説明会" },
  { step: "2", title: "事前コンサルテーション" },
  { step: "3", title: "EWC日本語治療計画測定" },
  { step: "4", title: "治療開始" },
];

const fallbackCases = [
  { href: "/cases", img: "/images/case-down-syndrome.png", label: "ダウン症の治療症例" },
  { href: "/cases", img: "/images/case-placenta.png", label: "プラセンタの投与" },
];

const fallbackVoices = [
  { id: "1", youtubeId: "4lFaVJvpilg", title: "治療を受けた方のインタビュー ①" },
  { id: "2", youtubeId: "hatBpKei8XE", title: "治療を受けた方のインタビュー ②" },
  { id: "3", youtubeId: "iPAcK247kno", title: "治療を受けた方のインタビュー ③" },
];

const fallbackFaqs: AccordionItemData[] = [
  {
    id: "faq-1",
    question: "幹細胞治療とはどのような治療ですか?",
    answer:
      "PSC(前駆幹細胞)やASI治療など、日本の臨床では受けられない再生医療をEuropean Wellness Centerの現地エキスパート医師のもとで受けていただけます。詳細は治療についてのページをご覧ください。",
  },
  {
    id: "faq-2",
    question: "日本人スタッフのサポートはありますか?",
    answer:
      "MMJドクターの先生方が現地エキスパート医師と協調しながら、現地治療と日本での治療を組み合わせたサポート体制を整えています。",
  },
  {
    id: "faq-3",
    question: "渡航や滞在について不安があります",
    answer:
      "お申込み後は専用のご案内ページで渡航前の注意事項、現地情報、TO-DOリストなどをご確認いただけます。まずはお気軽にご相談ください。",
  },
];

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("common.siteName"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, cmsCases, cmsVoices, cmsFaqs] = await Promise.all([
    getTranslations(),
    getHomeCases(locale),
    getHomeVoices(locale),
    getHomeFaqs(locale),
  ]);

  const cases =
    cmsCases.length > 0
      ? cmsCases.map((c) => ({
          href: `/cases/${c.slug.current}`,
          img: c.beforeAfterImages?.[0]?.image
            ? urlForImage(c.beforeAfterImages[0].image).width(800).height(450).url()
            : "/images/hero-kota-kinabalu.png",
          label: c.title,
        }))
      : fallbackCases;

  const voices =
    cmsVoices.length > 0
      ? cmsVoices.map((v) => ({ id: v._id, youtubeId: v.youtubeVideoId, title: v.title }))
      : fallbackVoices;

  const faqs: AccordionItemData[] =
    cmsFaqs.length > 0
      ? cmsFaqs.map((f) => ({
          id: f._id,
          question: f.question,
          answer: <RichText value={f.answer} />,
        }))
      : fallbackFaqs;

  return (
    <>
      {/* 1. ヒーロー */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden bg-navy">
        <Image
          src="/images/hero-kota-kinabalu.png"
          alt="コタキナバルの街並み"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="font-serif text-2xl text-offwhite md:text-4xl">
            人生を変える価値ある投資
          </p>
          <p className="mt-2 font-serif text-xl text-offwhite/90 md:text-2xl">
            最上級の健康長寿と幸福のための究極の旅路
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/apply">{t("common.ctaPrimary")}</Button>
            <Button href="/contact" variant="outline">
              {t("common.ctaSecondary")}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. 私たちについて */}
      <Section tone="navy">
        <SectionHeading eyebrow="ABOUT" title="私たちについて" tone="light" />
        <p className="max-w-2xl text-sm leading-relaxed text-offwhite/80 md:text-base">
          European Wellness Centerは、35年間再生医療をリードしてきたグローバル医療団体です。全ての臓器に対応した従来の医療常識を覆す、真の幹細胞治療を受けることができます。
        </p>
      </Section>

      {/* 3. 医師団紹介 */}
      <Section tone="white">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-4/3 overflow-hidden rounded-sm">
            <Image
              src="/images/doctors-cover.png"
              alt="MMJドクターと現地エキスパート医師団"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="MEDICAL TEAM"
              title="世界最高峰の幹細胞治療"
            />
            <p className="text-sm leading-relaxed text-navy/80 md:text-base">
              MMJドクターの先生方は現地エキスパート医師と協調しながら、現地治療と日本での治療を組み合わせてレベルの高い患者様の治療を行うことが可能になりました。PSC(前駆幹細胞)、ASI治療など、日本の臨床ではできない治療を、ぜひご自身に、ご家族に、患者様にお試しください。
            </p>
            <div className="mt-6">
              <Button href="/doctors" variant="outline-navy">
                {t("nav.doctors")}を見る
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. こんな方々へ */}
      <Section tone="navy">
        <div className="grid gap-10 md:grid-cols-2">
          <SectionHeading
            eyebrow="PROBLEM"
            title="こんな方々へ"
            tone="light"
            className="mb-0"
          />
          <ul className="space-y-4 text-sm text-offwhite/85 md:text-base">
            {[
              "これまでの日本では治療法の無い難治性のご病気の方",
              "脳の治療を行いたい方(精神疾患、認知症、自閉症など)",
              "心身共に若返りを希望する方(すべての病気のリスクを低減する)",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="mt-1 text-gold">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 5. 症例ダイジェスト */}
      <Section tone="offwhite">
        <SectionHeading
          eyebrow="CASES"
          title="症例紹介"
          description="ダウン症の治療症例、プラセンタの投与など、実際の症例の一部をご紹介します。"
        />
        <CardGrid>
          {cases.map((c) => (
            <Card key={c.label} as="article">
              <div className="relative aspect-video">
                <Image src={c.img} alt={c.label} fill className="object-cover" />
              </div>
              <CardBody>
                <p className="text-sm font-medium text-navy">{c.label}</p>
                <Link
                  href={c.href}
                  className="mt-2 inline-block text-xs text-gold-dark hover:underline"
                >
                  症例一覧を見る →
                </Link>
              </CardBody>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* 6. 問題提起3カラム */}
      <Section tone="white">
        <div className="grid gap-8 md:grid-cols-3">
          {conditionGroups.map((group) => (
            <div key={group.title} className="rounded-sm border border-navy/10 p-6">
              <p className="text-xs tracking-[0.15em] text-gold-dark">PROBLEM</p>
              <h3 className="mt-2 font-serif text-lg text-navy">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-navy/70">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-navy/15 px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/conditions" className="text-sm text-gold-dark hover:underline">
            対象となる症状をもっと見る →
          </Link>
        </div>
      </Section>

      {/* 7. 中間CTA */}
      <Section tone="navy" className="py-14 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <p className="font-serif text-xl text-offwhite md:text-2xl">
            まずはご相談ください。現地のエキスパートDr.によるオーダーメイドの治療計画をご提案させていただきます。
          </p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button href="/apply">{t("common.ctaPrimary")}</Button>
            <Button href="/contact" variant="outline">
              {t("common.ctaSecondary")}
            </Button>
          </div>
        </div>
      </Section>

      {/* 8. EWC紹介ギャラリー */}
      <Section tone="offwhite">
        <SectionHeading
          eyebrow="EUROPEAN WELLNESS CENTER"
          title="35年間再生医療をリードしてきたグローバル医療団体"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {["ewc-lobby.jpg", "ewc-building-team.jpg", "ewc-lab.jpeg", "kk-ocean.jpeg"].map(
            (img) => (
              <div key={img} className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src={`/images/${img}`}
                  alt="European Wellness Center"
                  fill
                  className="object-cover"
                />
              </div>
            ),
          )}
        </div>
      </Section>

      {/* 9. 患者様の声(研修LPと同一パターン: YouTube動画3本) */}
      <Section tone="white">
        <SectionHeading
          eyebrow="VOICES"
          title="治療を受けた方の声(一部)"
          description="European Wellness Centerで治療を受けられた方の一部のインタビュー動画です(YouTubeが別タブで開きます)。"
        />
        <CardGrid>
          {voices.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener"
              className="group flex flex-col overflow-hidden rounded-sm border border-navy/10 bg-white transition-colors hover:border-gold/50"
            >
              <div className="relative aspect-video overflow-hidden bg-navy">
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={`${video.title}のサムネイル`}
                  fill
                  className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
                  unoptimized
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-offwhite/40 bg-navy/70 transition-colors group-hover:border-gold group-hover:bg-gold">
                    <svg className="h-5 w-5 translate-x-px text-offwhite" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </div>
              <CardBody>
                <p className="mb-1 text-sm font-medium text-navy">{video.title}</p>
                <p className="text-xs text-navy/50">動画を見る(YouTube)</p>
              </CardBody>
            </a>
          ))}
        </CardGrid>
      </Section>

      {/* 10. FAQダイジェスト */}
      <Section tone="offwhite">
        <SectionHeading eyebrow="QUESTION" title="よくある質問" />
        <Accordion items={faqs} />
        <div className="mt-8">
          <Link href="/faq" className="text-sm text-gold-dark hover:underline">
            {t("nav.faq")}をもっと見る →
          </Link>
        </div>
      </Section>

      {/* 11. お申し込みの流れ */}
      <Section tone="white">
        <SectionHeading eyebrow="FLOW" title="お申し込みの流れ" />
        <div className="grid gap-4 md:grid-cols-4">
          {applySteps.map((s) => (
            <div key={s.step} className="rounded-sm border border-navy/10 p-6 text-center">
              <p className="font-serif text-2xl text-gold-dark">{s.step}</p>
              <p className="mt-2 text-sm text-navy">{s.title}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 12. 会社情報要約 */}
      <Section tone="offwhite">
        <SectionHeading eyebrow="OPERATING COMPANY" title="運営会社" />
        <p className="font-serif text-xl text-navy">SUN SYNERGY Co., Ltd.</p>
        <p className="mt-1 text-sm text-navy/60">株式会社サンシナジー</p>
        <div className="mt-6">
          <Button href="/company" variant="outline-navy">
            {t("nav.company")}
          </Button>
        </div>
      </Section>

      {/* 13. 最終CTA */}
      <Section tone="navy">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <p className="font-serif text-xl text-offwhite md:text-2xl">
            まずはご相談ください。現地のエキスパートDr.によるオーダーメイドの治療計画をご提案させていただきます。
          </p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button href="/apply">{t("common.ctaPrimary")}</Button>
            <Button href="/contact" variant="outline">
              {t("common.ctaSecondary")}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
