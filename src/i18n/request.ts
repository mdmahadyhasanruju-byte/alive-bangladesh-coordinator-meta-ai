import { getRequestConfig } from 'next-intl/server';

const locales = ['bn', 'en', 'ar'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested as (typeof locales)[number]) ? requested! : 'bn';

  return {
    locale,
    messages: (await import(`./${locale}.json`)).default
  };
});
