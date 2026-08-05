import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_DESTINATION_EMAIL = "ewc@mfplusjapan.jp";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * 問い合わせフォームの受付エンドポイント。
 * Resend(Vercel Marketplace経由で連携)を通じて運営宛に通知メールを送信する。
 *
 * NOTE: 送信ドメイン(RESEND_EMAIL_DOMAIN)のDNS検証が完了するまでは、
 * Resend側で送信がブロックされる場合がある。
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

  const name = body.name.trim();
  const email = body.email.trim();
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = body.message.trim();

  const resendApiKey = process.env.RESEND_API_KEY;
  const emailDomain = process.env.RESEND_EMAIL_DOMAIN;

  if (!resendApiKey || !emailDomain) {
    console.error("[contact] RESEND_API_KEY または RESEND_EMAIL_DOMAIN が未設定です");
    return NextResponse.json({ error: "email_not_configured" }, { status: 500 });
  }

  const resend = new Resend(resendApiKey);

  const { error } = await resend.emails.send({
    from: `EWC コタキナバル お問い合わせフォーム <contact@${emailDomain}>`,
    to: [CONTACT_DESTINATION_EMAIL],
    replyTo: email,
    subject: `【お問い合わせ】${name}様より`,
    html: `
      <p><strong>お名前:</strong> ${escapeHtml(name)}</p>
      <p><strong>メールアドレス:</strong> ${escapeHtml(email)}</p>
      <p><strong>お電話番号:</strong> ${escapeHtml(phone || "(未入力)")}</p>
      <p><strong>お問い合わせ内容:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    console.error("[contact] メール送信に失敗しました:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
