import type { Locale } from '@/lib/i18n'

const localePrefixes: Record<Locale, string> = { en: '', 'zh-Hans': '/zh-hans', 'zh-Hant': '/zh-hant' }
export function localePrefix(locale: Locale) { return localePrefixes[locale] }
export function localizedPath(path: string, locale: Locale) { const normalized = path.startsWith('/') ? path : `/${path}`; return `${localePrefix(locale)}${normalized}` }
export function stripLocalePrefix(pathname: string) {
  if (pathname.startsWith('/zh-hans')) return pathname.replace('/zh-hans', '') || '/'
  if (pathname.startsWith('/zh-hant')) return pathname.replace('/zh-hant', '') || '/'
  return pathname || '/'
}
export function pathForLocale(pathname: string, locale: Locale) { return localizedPath(stripLocalePrefix(pathname), locale) }

// TODO: add your routes.
