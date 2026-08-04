import zh from './zh.json';
import en from './en.json';

const translations = { zh, en } as const;

export type Locale = keyof typeof translations;

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'zh'];

export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations[defaultLocale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return defaultLocale;
}

export function getPathWithLocale(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }
  return `/${locale}${path}`;
}

export function getAlternateLinks(currentPath: string, basePath: string = '') {
  // 移除 base 前缀和语言前缀，得到纯路径
  let cleanPath = currentPath;
  if (basePath) {
    cleanPath = cleanPath.replace(basePath, '') || '/';
  }
  cleanPath = cleanPath.replace(/^\/(zh|en)/, '') || '/';
  return locales.map((locale) => ({
    locale,
    href: getPathWithLocale(cleanPath, locale),
  }));
}
