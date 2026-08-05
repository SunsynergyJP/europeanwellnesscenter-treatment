import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { participants } from "@/lib/db/schema";

/**
 * 参加者専用エリア(scheduled-patients)の本番認証。
 * 招待制のためCredentials providerのみ(自己サインアップなし)。
 * セッションはJWT戦略(Credentials providerはDBセッション非対応のため)。
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = typeof credentials?.email === "string" ? credentials.email : undefined;
        const password =
          typeof credentials?.password === "string" ? credentials.password : undefined;

        if (!email || !password) return null;

        const [participant] = await db
          .select()
          .from(participants)
          .where(eq(participants.email, email))
          .limit(1);

        if (!participant?.passwordHash) return null;

        const isValid = await bcrypt.compare(password, participant.passwordHash);
        if (!isValid) return null;

        return {
          id: participant.id,
          email: participant.email,
          name: participant.name ?? undefined,
        };
      },
    }),
  ],
});
