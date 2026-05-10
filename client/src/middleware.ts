// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { ERoutes } from "./shared/routes/routes.interface";

const protectedRoutes = [ERoutes.DASHBOARD];
const publicOnlyRoutes = [ERoutes.SIGNIN, ERoutes.SIGNUP];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPublicOnly = publicOnlyRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && isProtected) {
    return NextResponse.redirect(new URL(ERoutes.SIGNIN, req.url));
  }

  if (token && isPublicOnly) {
    return NextResponse.redirect(new URL(ERoutes.DASHBOARD, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup", "/verify-email"],
};
