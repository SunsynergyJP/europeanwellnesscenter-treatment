import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * 参加者アカウント(招待制)。
 * Sanityの `participant` ドキュメント(プロフィール・書類提出ステータス)とは
 * emailで緩やかに紐付ける想定(sanityParticipantIdは任意)。
 */
export const participants = pgTable("participants", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  passwordHash: text("password_hash"),
  sanityParticipantId: text("sanity_participant_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  passwordSetAt: timestamp("password_set_at", { withTimezone: true }),
});

/**
 * 招待/初回パスワード設定用トークン。
 * メール送信基盤が未接続のため、現状は発行したURLを運営者が手動で共有する運用。
 */
export const inviteTokens = pgTable("invite_tokens", {
  token: text("token").primaryKey(),
  participantId: uuid("participant_id")
    .notNull()
    .references(() => participants.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
