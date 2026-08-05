import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

// Node.js runtimeを明示(node:cryptoを使うセッション検証のため)
export const runtime = "nodejs";

const intlMiddleware = createMiddleware(routing);

const SCHEDULED_PATIENTS_SEGMENT = "/scheduled-patients";
const LOGIN_PATH = `${SCHEDULED_PATIENTS_SEGMENT}/login`;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localePattern = routing.locales.join("|");
  const scheduledPatientsMatch = pathname.match(
    new RegExp(`^/(${localePattern})(${SCHEDULED_PATIENTS_SEGMENT}.*)$`),
  );

  if (scheduledPatientsMatch) {
    const [, locale, rest] = scheduledPatientsMatch;
    const isLoginPage = rest.startsWith(LOGIN_PATH);
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const isAuthenticated = verifySessionToken(token);

    if (!isAuthenticated && !isLoginPage) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = `/${locale}${LOGIN_PATH}`;
      return NextResponse.redirect(loginUrl);
    }

    if (isAuthenticated && isLoginPage) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = `/${locale}${SCHEDULED_PATIENTS_SEGMENT}`;
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
