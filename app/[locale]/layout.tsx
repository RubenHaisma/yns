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

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}