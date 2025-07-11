import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from './lib/auth';
 
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['nl', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'nl',
  
  // Always show the locale in the URL
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // Admin login page - allow access
    if (pathname === '/admin') {
      return NextResponse.next();
    }
    
    // Protected admin routes
    if (pathname.startsWith('/admin/dashboard')) {
      const token = request.cookies.get('admin-token')?.value;
      
      if (!token || !verifyAdminToken(token)) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      
      return NextResponse.next();
    }
    
    return NextResponse.next();
  }

  // Handle API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Handle payment success page (no locale needed)
  if (pathname === '/payment-success') {
    return NextResponse.next();
  }

  // Handle root redirect
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/nl', request.url));
  }

  // Apply internationalization middleware for other routes
  return intlMiddleware(request);
}
 
export const config = {
  // Match all pathnames except for
  // - api routes
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};