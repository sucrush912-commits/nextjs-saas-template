import { DocumentLanguage } from '@/components/document-language'
import { LocaleProvider } from '@/lib/i18n'

export default function TraditionalChineseLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="zh-Hant"><DocumentLanguage locale="zh-Hant" />{children}</LocaleProvider>
}
