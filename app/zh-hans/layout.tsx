import { DocumentLanguage } from '@/components/document-language'
import { LocaleProvider } from '@/lib/i18n'

export default function SimplifiedChineseLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="zh-Hans"><DocumentLanguage locale="zh-Hans" />{children}</LocaleProvider>
}
