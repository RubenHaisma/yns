import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminTokenEdge } from './lib/auth';
 
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['nl', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'nl',
  
  // Always show the locale in the URL
  localePrefix: 'always'
});

export default async function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // Handle root redirect based on domain FIRST
  if (pathname === '/') {
    // Determine locale based on domain
    let targetLocale = 'nl'; // default
    if (hostname === 'yournextstadium.com' || hostname === 'www.yournextstadium.com') {
      targetLocale = 'en';
    } else if (hostname === 'yournextstadium.nl' || hostname === 'www.yournextstadium.nl') {
      targetLocale = 'nl';
    }
    return NextResponse.redirect(new URL(`/${targetLocale}`, request.url));
  }

  // Handle admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/nl/admin') || pathname.startsWith('/en/admin')) {
    // Admin login page - allow access
    if (pathname === '/admin' || pathname === '/nl/admin' || pathname === '/en/admin') {
      return NextResponse.next();
    }
    
    // Protected admin routes
    if (pathname.startsWith('/admin/dashboard') || pathname.startsWith('/nl/admin/dashboard') || pathname.startsWith('/en/admin/dashboard')) {
      const token = request.cookies.get('admin-token')?.value;
      // console.log('Admin dashboard access attempt:', { pathname, hasToken: !!token });
      
      if (!token) {
        // console.log('No token found, redirecting to login');
        const locale = pathname.startsWith('/nl/') ? 'nl' : pathname.startsWith('/en/') ? 'en' : 'nl';
        return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
      }
      
      // Use the Edge-compatible verification
      const verificationResult = await verifyAdminTokenEdge(token);
      if (!verificationResult) {
        // console.log('Token verification failed, redirecting to login');
        const locale = pathname.startsWith('/nl/') ? 'nl' : pathname.startsWith('/en/') ? 'en' : 'nl';
        return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
      }
      
      // console.log('Token verified, allowing access');
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

  // Apply internationalization middleware for other routes
  return intlMiddleware(request);
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml|manifest.json|browserconfig.xml|logo.png).*)'
  ]
};