import Link from 'next/link';

export default async function LocaleNotFound({
  params
}: {
  params: { locale: string };
}) {
  // Await the params to handle the async nature of Next.js 15
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">
          {locale === 'nl' ? 'Pagina niet gevonden' : 'Page not found'}
        </h2>
        <p className="text-green-200 mb-8">
          {locale === 'nl' 
            ? 'De pagina die je zoekt bestaat niet of is verplaatst.'
            : 'The page you are looking for does not exist or has been moved.'
          }
        </p>
        <Link 
          href={`/${locale}`}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold transition-colors"
        >
          {locale === 'nl' ? 'Terug naar Home' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}