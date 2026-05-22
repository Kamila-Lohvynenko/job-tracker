import { NextRequest, NextResponse } from "next/server";

import { ERoutes } from "./shared/routes/routes.interface";

import { baseLocale, locales, type Locale } from "@/paraglide/runtime";

const localeCookieName = "PARAGLIDE_LOCALE";

const protectedRoutes = [ERoutes.DASHBOARD];
const publicOnlyRoutes = [ERoutes.SIGNIN, ERoutes.SIGNUP, ERoutes.VERIFY_EMAIL];

const matchRoute = (pathname: string, route: string) => {
  return pathname === route || pathname.startsWith(`${route}/`);
};

const getLocaleFromPathname = (pathname: string): Locale | null => {
  const firstSegment = pathname.split("/")[1];

  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }

  return null;
};

const removeLocaleFromPathname = (pathname: string, locale: Locale) => {
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");

  return pathnameWithoutLocale || "/";
};

const getBrowserLocale = (req: NextRequest): Locale | null => {
  const acceptLanguage = req.headers.get("accept-language");

  if (!acceptLanguage) return null;

  const preferredLanguages = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().toLowerCase());

  const matchedLocale = locales.find((locale) =>
    preferredLanguages.some((lang) => lang.startsWith(locale)),
  );

  return matchedLocale ?? null;
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("accessToken")?.value;
  const savedLocale = req.cookies.get(localeCookieName)?.value as Locale | null;

  const localeFromPath = getLocaleFromPathname(pathname);

  if (!localeFromPath) {
    const validSavedLocale =
      savedLocale && locales.includes(savedLocale) ? savedLocale : null;

    const browserLocale = getBrowserLocale(req);

    const locale = validSavedLocale ?? browserLocale ?? baseLocale;

    const url = new URL(`/${locale}${pathname}`, req.url);
    url.search = req.nextUrl.search;

    return NextResponse.redirect(url);
  }

  const pathnameWithoutLocale = removeLocaleFromPathname(
    pathname,
    localeFromPath,
  );

  const isProtected = protectedRoutes.some((route) =>
    matchRoute(pathnameWithoutLocale, route),
  );

  const isPublicOnly = publicOnlyRoutes.some((route) =>
    matchRoute(pathnameWithoutLocale, route),
  );

  if (!token && isProtected) {
    return NextResponse.redirect(new URL(`/${localeFromPath}/signin`, req.url));
  }

  if (token && isPublicOnly) {
    return NextResponse.redirect(
      new URL(`/${localeFromPath}/dashboard`, req.url),
    );
  }

  const response = NextResponse.next();

  response.cookies.set(localeCookieName, localeFromPath, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: [
    "/",
    "/en/:path*",
    "/de/:path*",
    "/dashboard/:path*",
    "/signin",
    "/signup",
    "/verify-email",
  ],
};
