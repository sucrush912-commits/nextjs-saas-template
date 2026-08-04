'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'en' | 'zh-Hans' | 'zh-Hant'
export const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: 'en', label: 'English' }, { value: 'zh-Hans', label: '简体中文' }, { value: 'zh-Hant', label: '繁體中文' },
]

// Replace these empty dictionaries with your product copy.
export const messages: Record<Locale, Record<string, never>> = { en: {}, 'zh-Hans': {}, 'zh-Hant': {} }

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void; messages: Record<string, never> }
const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ initialLocale = 'en', children }: { initialLocale?: Locale; children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const value = useMemo(() => ({ locale, setLocale, messages: messages[locale] }), [locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used within LocaleProvider')
  return value
}
