"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  async function handleLogout() {
    await signOut({ redirectTo: "/ja/scheduled-patients/login" });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm text-navy/60 underline hover:text-gold-dark"
    >
      ログアウト
    </button>
  );
}
