"use client";

import { useLocale } from 'next-intl';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: any;
}

export function SEOHead({ 
  title, 
  description, 
  keywords = [], 
  image = '/logo.png',
  url,
  type = 'website',
  structuredData 
}: SEOHeadProps) {
  const locale = useLocale();
  const baseUrl = 'https://yournextstadium.com';
  const currentUrl = url || `${baseUrl}/${locale}`;
  
  // Default football-specific keywords
  const defaultKeywords = locale === 'nl' ? [
    'mystery voetbalreis',
    'voetbalreizen Europa',
    'stadium reizen',
    'voetbal vakantie',
    'premier league',
    'champions league',
    'la liga',
    'bundesliga',
    'serie a',
    'europa league',
    'stadium tours',
    'voetbal ervaringen',
    'mystery football trips',
    'european football',
    'match tickets',
    'stadium adventures',
    'football travel',
    'voetbal bestemmingen',
    'stadium visits',
    'european competitions'
  ] : [
    'mystery football trip',
    'football travel Europe',
    'stadium travel',
    'football vacation',
    'premier league',
    'champions league',
    'la liga',
    'bundesliga',
    'serie a',
    'europa league',
    'stadium tours',
    'football experiences',
    'mystery football trips',
    'european football',
    'match tickets',
    'stadium adventures',
    'football travel',
    'football destinations',
    'stadium visits',
    'european competitions'
  ];

  const allKeywords = [...defaultKeywords, ...keywords];
  
  // Default structured data for football travel
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "YourNextStadium",
    "description": locale === 'nl' 
      ? "Mystery voetbalreizen door Europa - ontdek je volgende stadium"
      : "Mystery football trips across Europe - discover your next stadium",
    "url": currentUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}${image}`,
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
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <>
      {/* Meta Tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content="YourNextStadium" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={locale} />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="YourNextStadium" />
      <meta property="og:locale" content={locale === 'nl' ? 'nl_NL' : 'en_US'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />
      <meta name="twitter:site" content="@YourNextStadium" />
      <meta name="twitter:creator" content="@YourNextStadium" />
      
      {/* Football-specific meta tags */}
      <meta name="sport" content="Football" />
      <meta name="competition" content="European Football" />
      <meta name="destination" content="Europe" />
      <meta name="experience" content="Mystery Football Trips" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />
      
      {/* Additional Football-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsOrganization",
            "name": "YourNextStadium",
            "sport": "Football",
            "description": locale === 'nl' 
              ? "Mystery voetbalreizen en stadium tours door Europa"
              : "Mystery football trips and stadium tours across Europe",
            "url": currentUrl,
            "sameAs": [
              "https://facebook.com/YourNextStadium",
              "https://twitter.com/YourNextStadium",
              "https://instagram.com/YourNextStadium"
            ]
          })
        }}
      />
    </>
  );
} 