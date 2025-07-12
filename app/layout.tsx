import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' });
  
  const baseUrl = 'https://yournextstadium.com';
  const locale = params.locale || 'nl';
  const localeUrl = locale === 'nl' ? baseUrl : `${baseUrl}/${locale}`;
  
  const title = locale === 'nl' 
    ? 'YourNextStadium - Mystery Voetbalreizen door Europa'
    : 'YourNextStadium - Mystery Football Trips Across Europe';
    
  const description = locale === 'nl'
    ? 'Ontdek je volgende stadium met onze mystery voetbalreizen. Van Amsterdam naar Barcelona, München tot Madrid - waar ga jij naartoe? Ervaar de spanning van een verrassingsvoetbalreis door Europa.'
    : 'Discover your next stadium with our mystery football trips. From Amsterdam to Barcelona, Munich to Madrid - where will you go? Experience the excitement of a surprise football trip across Europe.';

  const keywords = locale === 'nl' 
    ? [
        'mystery voetbalreis',
        'voetbalreizen Europa',
        'stadium reizen',
        'voetbal vakantie',
        'surprise trip',
        'football travel',
        'Europa voetbal',
        'stadium tour',
        'voetbal ervaring',
        'mystery travel'
      ]
    : [
        'mystery football trip',
        'football travel Europe',
        'stadium travel',
        'football vacation',
        'surprise trip',
        'football travel',
        'Europe football',
        'stadium tour',
        'football experience',
        'mystery travel'
      ];

  return {
    title: {
      default: title,
      template: locale === 'nl' ? '%s | YourNextStadium' : '%s | YourNextStadium'
    },
    description,
    keywords,
    authors: [{ name: 'YourNextStadium' }],
    creator: 'YourNextStadium',
    publisher: 'YourNextStadium',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: locale === 'nl' ? '/' : `/${locale}`,
      languages: {
        'nl-NL': '/nl',
        'en-US': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      url: localeUrl,
      siteName: 'YourNextStadium',
      title,
      description,
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: locale === 'nl' ? 'YourNextStadium - Mystery Voetbalreizen' : 'YourNextStadium - Mystery Football Trips',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.png'],
      creator: '@YourNextStadium',
      site: '@YourNextStadium',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
    category: 'travel',
    classification: 'travel',
    other: {
      'theme-color': '#1f2937',
      'color-scheme': 'light dark',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'YourNextStadium',
      'application-name': 'YourNextStadium',
      'msapplication-TileColor': '#1f2937',
      'msapplication-config': '/browserconfig.xml',
    },
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale || 'nl';
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HGTQKC4YB4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HGTQKC4YB4', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {
                'custom_parameter_1': 'locale',
                'custom_parameter_2': 'language'
              }
            });
            gtag('config', 'G-HGTQKC4YB4', {
              'locale': '${locale}',
              'language': '${locale === 'nl' ? 'nl' : 'en'}'
            });
          `}
        </Script>
        
        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "YourNextStadium",
              "description": locale === 'nl' 
                ? "Mystery voetbalreizen door Europa - ontdek je volgende stadium"
                : "Mystery football trips across Europe - discover your next stadium",
              "url": `https://yournextstadium.com${locale === 'nl' ? '' : `/${locale}`}`,
              "logo": "https://yournextstadium.com/logo.png",
              "image": "https://yournextstadium.com/logo.png",
              "sameAs": [
                "https://facebook.com/YourNextStadium",
                "https://twitter.com/YourNextStadium",
                "https://instagram.com/YourNextStadium"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NL"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": locale === 'nl' ? ["Dutch", "English"] : ["English", "Dutch"]
              },
              "serviceType": locale === 'nl' ? "Mystery Voetbalreizen" : "Mystery Football Travel",
              "areaServed": "Europe",
              "priceRange": "€€",
              "inLanguage": locale === 'nl' ? "nl" : "en"
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
} 