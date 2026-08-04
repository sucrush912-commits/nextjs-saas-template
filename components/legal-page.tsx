import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { localizedPath } from '@/lib/routes'
import type { Locale } from '@/lib/i18n'

export type LegalKind = 'privacy' | 'terms' | 'disclaimer'
const LEGAL_CONTENT = '{{LEGAL_CONTENT}}'

export function legalMetadata(kind: LegalKind, locale: Locale): Metadata {
  return { title: `{{SITE_NAME}} | ${kind}`, description: '{{SITE_DESCRIPTION}}', alternates: { canonical: localizedPath(`/${kind}`, locale) } }
}

export function LegalPage({ kind }: { kind: LegalKind }) {
  return <><SiteNav /><main className="mx-auto min-h-[calc(100dvh-10rem)] max-w-3xl px-6 py-16"><p className="text-sm text-muted-foreground">{'{{SITE_NAME}}'}</p><h1 className="mt-3 font-serif text-4xl font-medium capitalize">{kind}</h1><div className="mt-8 whitespace-pre-wrap leading-7 text-muted-foreground">{LEGAL_CONTENT}</div></main><SiteFooter /></>
}
