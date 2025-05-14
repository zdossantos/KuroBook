import { createI18n } from 'next-intl';

export const i18n = createI18n({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localeDetection: true,
});

export type SupportedLocale = 'en' | 'fr';
