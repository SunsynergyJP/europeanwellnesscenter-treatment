import { NextResponse } from "next/server";

/**
 * 問い合わせフォームの受付エンドポイント(スタブ実装)。
 *
 * TODO: 実運用前に以下を実装すること。
 * - メール送信基盤(Resend等)への接続、運営宛通知の送信
 * - 入力バリデーション(サーバーサイド)の強化
 * - スパム対策(reCAPTCHA等)
 * 現時点では受信データの形式チェックのみ行い、送信処理は行わない。
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  console.log("[contact] 新規問い合わせ(メール送信基盤は未接続):", {
    name: body.name,
    email: body.email,
  });

  return NextResponse.json({ ok: true });
}
