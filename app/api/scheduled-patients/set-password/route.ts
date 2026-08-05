import { NextResponse } from "next/server";
import { and, eq, isNull } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db/client";
import { inviteTokens, participants } from "@/lib/db/schema";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : undefined;
  const password = typeof body?.password === "string" ? body.password : undefined;

  if (!token || !password || password.length < 8) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const [invite] = await db
    .select()
    .from(inviteTokens)
    .where(and(eq(inviteTokens.token, token), isNull(inviteTokens.usedAt)))
    .limit(1);

  if (!invite || invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "invalid_or_expired_token" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db
    .update(participants)
    .set({ passwordHash, passwordSetAt: new Date() })
    .where(eq(participants.id, invite.participantId));

  await db.update(inviteTokens).set({ usedAt: new Date() }).where(eq(inviteTokens.token, token));

  return NextResponse.json({ ok: true });
}
