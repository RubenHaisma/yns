import '../globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'YourNextStadium - Mystery Voetbalreizen door Europa',
  description: 'Ontdek je volgende stadium met onze mystery voetbalreizen. Van Amsterdam naar Barcelona, München tot Madrid - waar ga jij naartoe?',
  keywords: 'mystery football trips, voetbalreizen, stadium tours, Europa, voetbal, reizen, surprise trips',
  openGraph: {
    title: 'YourNextStadium - Mystery Voetbalreizen door Europa',
    description: 'Ontdek je volgende stadium met onze mystery voetbalreizen. Van Amsterdam naar Barcelona, München tot Madrid - waar ga jij naartoe?',
    images: ['https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600'],
  },
};

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
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}