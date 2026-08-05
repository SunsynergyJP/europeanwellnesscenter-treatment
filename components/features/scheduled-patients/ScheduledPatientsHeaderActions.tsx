"use client";

import { usePathname } from "@/lib/i18n/navigation";
import { LogoutButton } from "./LogoutButton";

export function ScheduledPatientsHeaderActions() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/scheduled-patients/login";

  if (isLoginPage) return null;

  return <LogoutButton />;
}
