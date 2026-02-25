import acceptLanguage from "accept-language";
import { NextResponse } from "next/server";
import { cookieName, fallbackLng, languages } from "./app/i18n/settings";

const VERCEL_HOST = "random-plouf.vercel.app";
const CLOUDFLARE_HOST = "random-plouf.pages.dev";

acceptLanguage.languages(languages);

export const config = {
  //matcher: "/:lng*",
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|icon.png|apple-icon.png|sw.js).*)",
  ],
};

export function proxy(req) {
  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  const hasLocaleInPath = languages.some((loc) =>
    req.nextUrl.pathname.startsWith(`/${loc}`),
  );
  const shouldSetLocalePrefix =
    !hasLocaleInPath && !req.nextUrl.pathname.startsWith("/_next");
  const shouldRedirectHost = req.nextUrl.hostname === VERCEL_HOST;

  if (shouldRedirectHost) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.protocol = "https:";
    redirectUrl.hostname = CLOUDFLARE_HOST;
    redirectUrl.port = "";
    if (shouldSetLocalePrefix)
      redirectUrl.pathname = `/${lng}${req.nextUrl.pathname}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Redirect if lng in path is not supported
  if (shouldSetLocalePrefix) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
