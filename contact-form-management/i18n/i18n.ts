import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '@/src/lib/cookies';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`./languages/${locale}.json`)).default,
  };
});
