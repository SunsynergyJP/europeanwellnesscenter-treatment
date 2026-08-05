import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * Sanity WebhookからのISRオンデマンド再検証エンドポイント(Phase7)。
 * TODO: Sanity側でWebhook設定後、下記のシークレット検証を有効な実装に置き換えること
 * (現状はヘッダー一致チェックのみの簡易実装)。
 */
export async function POST(request: Request) {
  const secret = request.headers.get("x-webhook-secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "invalid_secret" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const type = body?._type;

  if (typeof type === "string") {
    // Next.js 16のcacheLife profile指定(即時反映を優先しmaxを指定)
    revalidateTag(type, "max");
  }

  return NextResponse.json({ revalidated: true, type });
}
