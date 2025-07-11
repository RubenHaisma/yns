import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from './lib/auth';
 
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['nl', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'nl'
});

export default function middleware(request: NextRequest) {
  // Admin route protection
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Apply internationalization middleware for other routes
  if (!request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/api') &&
      !request.nextUrl.pathname.startsWith('/payment-success')) {
    return intlMiddleware(request);
  }

  return NextResponse.next();
}
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(nl|en)/:path*', '/admin/:path*']
};