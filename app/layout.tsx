import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YourNextStadium - Mystery Voetbalreizen door Europa',
  description: 'Ontdek je volgende stadium met onze mystery voetbalreizen. Van Amsterdam naar Barcelona, München tot Madrid - waar ga jij naartoe?',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
} 