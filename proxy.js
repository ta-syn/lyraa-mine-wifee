import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "wifee_auth_v2";

const isPublicPath = (pathname) => {
  if (pathname === "/login") return true;
  if (pathname.startsWith("/api/auth/login")) return true;
  if (pathname.startsWith("/api/auth/logout")) return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/favicon.ico")) return true;
  if (pathname.startsWith("/sitemap.xml")) return true;
  if (pathname.startsWith("/robots.txt")) return true;
  return false;
};

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const expectedCookie = process.env.AUTH_COOKIE_VALUE || "wifee-authorized";
  const isAuthorized = cookieValue === expectedCookie;

  if (isPublicPath(pathname)) {
    if (pathname === "/login" && isAuthorized) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthorized) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
