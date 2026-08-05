import { NextResponse } from "next/server";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth/session";

/**
 * TODO: 単一デモアカウントによる暫定ログインです。
 * 本実装では、招待メール経由で発行された参加者ごとのアカウント(DB管理)
 * と照合する処理に置き換えること(Phase4 Participant/Phase7参照)。
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email;
  const password = body?.password;

  const demoEmail = process.env.DEMO_PATIENT_EMAIL;
  const demoPassword = process.env.DEMO_PATIENT_PASSWORD;

  if (!demoEmail || !demoPassword) {
    return NextResponse.json(
      { error: "auth_not_configured" },
      { status: 500 },
    );
  }

  if (email !== demoEmail || password !== demoPassword) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const token = createSessionToken(email);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return response;
}
