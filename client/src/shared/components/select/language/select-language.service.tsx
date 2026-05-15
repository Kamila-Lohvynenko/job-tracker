"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { baseLocale, locales, type Locale } from "@/paraglide/runtime";

// function to get the current locale from the pathname
const getCurrentLocale = (pathname: string): Locale => {
  const firstSegment = pathname.split("/")[1];

  return locales.includes(firstSegment as Locale)
    ? (firstSegment as Locale)
    : baseLocale;
};

// function to replace the locale in the pathname
const replaceLocaleInPathname = (pathname: string, nextLocale: Locale) => {
  const currentLocale = getCurrentLocale(pathname);

  return pathname.replace(`/${currentLocale}`, `/${nextLocale}`);
};

// service
export const useLanguageSwitcherService = () => {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const currentLocale = getCurrentLocale(pathname);

  const nextLocale: Locale =
    currentLocale === baseLocale ? locales[1] : locales[0];

  const handleChangeLanguage = () => {
    const nextPathname = replaceLocaleInPathname(pathname, nextLocale);

    const queryString = searchParams.toString();

    const nextUrl = queryString
      ? `${nextPathname}?${queryString}`
      : nextPathname;

    document.cookie = `PARAGLIDE_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    router.replace(nextUrl);
  };

  return {
    currentLocale,
    nextLocale,
    handleChangeLanguage,
  };
};
