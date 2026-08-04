'use client'

import { localeOptions, useLocale } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  return <label className="sr-only">Language<select value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)}>{localeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
}
