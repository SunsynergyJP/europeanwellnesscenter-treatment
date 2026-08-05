"use client";

import { useRouter } from "@/lib/i18n/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/scheduled-patients/logout", { method: "POST" });
    router.push("/scheduled-patients/login");
    router.refresh();
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
