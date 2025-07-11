import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
const locales = ['nl', 'en'];
 
export default getRequestConfig(async ({locale}) => {
  // Use default locale if none provided
  const validLocale = locale && locales.includes(locale) ? locale : 'nl';
 
  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});