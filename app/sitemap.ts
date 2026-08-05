import type { MetadataRoute } from "next";
import { routing } from "@/lib/i18n/routing";

/**
 * 公開ページのみを対象とした静的サイトマップ。
 * cases/doctors/blog等のCMS個別ページは、Sanity連携後に動的追加する。
 */
const staticPaths = [
  "",
  "/treatment/about",
  "/treatment/flow",
  "/conditions",
  "/cases",
  "/doctors",
  "/voices",
  "/faq",
  "/blog",
  "/apply",
  "/contact",
  "/company",
  "/privacy",
  "/legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );
}
