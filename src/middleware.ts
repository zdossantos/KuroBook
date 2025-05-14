import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/settings';

const publicRoutes = [
  '/login',
  '/register',
  '/'
];

const restrictedRoutes = [
  '/login',
  '/register'
];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const url = request.nextUrl;
  const locale = url.pathname.split('/')[1];
  
  // Vérifier l'authentification
  if (!sessionCookie) {
    // Si on accède à dashboard sans session
    if (url.pathname.startsWith(`/${locale}/dashboard`)) {
      url.pathname = `/${locale}/login`;
      return NextResponse.redirect(url);
    }
  } else {
    // Si on accède à une route restreinte avec session
    if (restrictedRoutes.some(route => url.pathname.startsWith(`/${locale}${route}`))) {
      url.pathname = `/${locale}`;
      return NextResponse.redirect(url);
    }
  }

  // Gérer la localisation
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale
  });

  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)',]
};