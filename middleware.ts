import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = [
  '/login',
  '/register',
  '/'
];

const restrictedRoutes = [
  '/login',
  '/register'
];
const privateRoutes = [
  '/dashboard',
  '/dashboard/*'
];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const url = request.nextUrl.pathname;

  if (!sessionCookie) {
    if (privateRoutes.some(route => url.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (!publicRoutes.some(route => url.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    if (restrictedRoutes.some(route => url.startsWith(route))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};