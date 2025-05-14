export const messages = {
  en: require('../../messages/en.json'),
  fr: require('../../messages/fr.json'),
};

export type SupportedLocale = keyof typeof messages;
