import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";
import { auth } from "@/auth";

const intlMiddleware = createMiddleware(routing);

const SCHEDULED_PATIENTS_SEGMENT = "/scheduled-patients";
const PUBLIC_SUBPATHS = ["/login", "/set-password"];

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const localePattern = routing.locales.join("|");
  const scheduledPatientsMatch = pathname.match(
    new RegExp(`^/(${localePattern})(${SCHEDULED_PATIENTS_SEGMENT}.*)$`),
  );

  if (scheduledPatientsMatch) {
    const [, locale, rest] = scheduledPatientsMatch;
    const isPublicSubpath = PUBLIC_SUBPATHS.some((p) =>
      rest.startsWith(`${SCHEDULED_PATIENTS_SEGMENT}${p}`),
    );
    const isAuthenticated = Boolean(request.auth);

    if (!isAuthenticated && !isPublicSubpath) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = `/${locale}${SCHEDULED_PATIENTS_SEGMENT}/login`;
      return NextResponse.redirect(loginUrl);
    }

    if (isAuthenticated && rest.startsWith(`${SCHEDULED_PATIENTS_SEGMENT}/login`)) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = `/${locale}${SCHEDULED_PATIENTS_SEGMENT}`;
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return intlMiddleware(request);
});

export const config = {
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
