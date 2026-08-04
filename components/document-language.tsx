'use client'

import { useEffect } from 'react'
import type { Locale } from '@/lib/i18n'

const documentLanguages: Record<Locale, string> = { en: 'en', 'zh-Hans': 'zh-Hans', 'zh-Hant': 'zh-Hant' }

export function DocumentLanguage({ locale }: { locale: Locale }) {
  useEffect(() => { document.documentElement.lang = documentLanguages[locale] }, [locale])
  return null
}
