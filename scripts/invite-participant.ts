/**
 * 参加者招待スクリプト(暫定運用: メール送信基盤が未接続のため、
 * 発行された招待URLを運営者が手動で参加者へ共有する)。
 *
 * 実行例:
 *   npx tsx scripts/invite-participant.ts --email taro@example.com --name "山田太郎"
 */
import { config } from "dotenv";
import { randomBytes } from "node:crypto";

// db/schemaのimportより先に.env.localを読み込む必要があるため、
// db関連は動的importで後段に遅延させている。
config({ path: ".env.local" });

const INVITE_TTL_DAYS = 7;

function parseArgs() {
  const args = process.argv.slice(2);
  const result: Record<string, string> = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace(/^--/, "");
    const value = args[i + 1];
    if (key && value) result[key] = value;
  }
  return result;
}

async function main() {
  const { email, name } = parseArgs();
  if (!email) {
    console.error("使い方: npx tsx scripts/invite-participant.ts --email <email> [--name <name>]");
    process.exit(1);
  }

  const { eq } = await import("drizzle-orm");
  const { db } = await import("../lib/db/client");
  const { participants, inviteTokens } = await import("../lib/db/schema");

  let [participant] = await db
    .select()
    .from(participants)
    .where(eq(participants.email, email))
    .limit(1);

  if (!participant) {
    [participant] = await db
      .insert(participants)
      .values({ email, name: name ?? null })
      .returning();
    console.log(`参加者を作成しました: ${participant.email}`);
  } else {
    console.log(`既存の参加者に招待を発行します: ${participant.email}`);
  }

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000);

  await db.insert(inviteTokens).values({
    token,
    participantId: participant.id,
    expiresAt,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const inviteUrl = `${siteUrl}/ja/scheduled-patients/set-password?token=${token}`;

  console.log("\n以下のURLを参加者へ共有してください(有効期限: 7日間):");
  console.log(inviteUrl);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
