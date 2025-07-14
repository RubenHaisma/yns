import '../globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = 'https://yournextstadium.com';
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
        'mystery travel',
        'Premier League reizen',
        'La Liga vakantie',
        'Bundesliga trip',
        'Serie A ervaring',
        'Champions League tickets',
        'Europa League wedstrijden',
        'voetbal stadions Europa',
        'mystery football trips',
        'stadium adventures',
        'European football',
        'match tickets',
        'voetbal bestemmingen',
        'stadium tours',
        'football vacations',
        'voetbal ervaringen',
        'mystery destination',
        'voetbal reizen',
        'stadium visits',
        'European competitions',
        'voetbal vakanties',
        'mystery stadium trips'
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
        'mystery travel',
        'Premier League trips',
        'La Liga vacation',
        'Bundesliga travel',
        'Serie A experience',
        'Champions League tickets',
        'Europa League matches',
        'European stadiums',
        'mystery football trips',
        'stadium adventures',
        'European football',
        'match tickets',
        'football destinations',
        'stadium tours',
        'football vacations',
        'football experiences',
        'mystery destination',
        'football travel',
        'stadium visits',
        'European competitions',
        'football holidays',
        'mystery stadium trips'
      ];

  return {
    title: {
      default: title,
      template: '%s | YourNextStadium'
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
      'sport': 'Football',
      'competition': 'European Football',
      'destination': 'Europe',
      'experience': 'Mystery Football Trips',
      'stadium-tours': 'Available',
      'football-vacations': 'Available',
      'european-competitions': 'Premier League, La Liga, Bundesliga, Serie A, Champions League',
      'mystery-trips': 'Available',
      'match-tickets': 'Available',
      'stadium-experiences': 'Available'
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <div className={`${inter.variable} ${montserrat.variable} font-sans`}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = '${locale}';`
        }}
      />
      
      {/* Google Analytics with locale tracking */}
      <Script id="google-analytics-locale" strategy="afterInteractive">
        {`
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
            "inLanguage": locale === 'nl' ? "nl" : "en",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": locale === 'nl' ? "Mystery Voetbalreizen" : "Mystery Football Trips",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": locale === 'nl' ? "Wedstrijd Ticket" : "Match Ticket",
                    "description": locale === 'nl' ? "Pure voetbalervaring met mystery bestemming" : "Pure football experience with mystery destination"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": locale === 'nl' ? "Match + Vliegtuig" : "Match + Flight",
                    "description": locale === 'nl' ? "Match ticket inclusief transport" : "Match ticket including transport"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": locale === 'nl' ? "Alles Inclusief" : "All Inclusive",
                    "description": locale === 'nl' ? "Complete voetbalvakantie met hotel" : "Complete football vacation with hotel"
                  }
                }
              ]
            },
            "sport": "Football",
            "sportEvent": [
              "Premier League",
              "La Liga", 
              "Bundesliga",
              "Serie A",
              "Ligue 1",
              "Champions League",
              "Europa League"
            ]
          })
        }}
      />
      
      <NextIntlClientProvider messages={messages}>
        <Toaster />
        {children}
      </NextIntlClientProvider>
    </div>
  );
}