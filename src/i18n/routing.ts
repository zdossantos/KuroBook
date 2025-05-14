import {defineRouting} from 'next-intl/routing';
import { locales, defaultLocale } from './settings';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales,
 
  // Used when no locale matches
  defaultLocale,
});