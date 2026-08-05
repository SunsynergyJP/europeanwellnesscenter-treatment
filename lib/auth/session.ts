import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * 参加者専用エリア(scheduled-patients)の暫定セッション実装。
 *
 * TODO(Phase4/Phase7で決定した本実装への置き換え):
 * 現状は単一デモアカウント(環境変数)+ 署名Cookieのみのスタブです。
 * 本番運用前に Auth.js + DB による招待制個別アカウント方式へ置き換えること。
 */

const COOKIE_NAME = "sp_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12時間

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET が未設定です。.env.local に設定してください(スタブ認証用)。",
    );
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(email: string): string {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  // email自体に "." を含む(例: example.com)ため、区切り文字とは衝突しない
  // JSON+base64url のペイロードに対して署名する方式にする。
  const payload = Buffer.from(JSON.stringify({ email, expiresAt })).toString(
    "base64url",
  );
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;

    const expected = sign(payload);
    const isValidSignature =
      expected.length === signature.length &&
      timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

    if (!isValidSignature) return false;

    const { expiresAt } = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8"),
    ) as { expiresAt: number };

    return Date.now() < expiresAt;
  } catch {
    return false;
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;
