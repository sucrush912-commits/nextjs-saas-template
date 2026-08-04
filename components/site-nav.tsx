'use client'

import Link from 'next/link'
import { LocaleProvider } from '@/lib/i18n'

type NavLink = { label: string; href: string }
// {{NAV_LINKS}}
const NAV_LINKS: NavLink[] = []

export function SiteNav({ children }: { children?: React.ReactNode }) {
  return <LocaleProvider><header className="border-b border-border"><nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-6" aria-label="Template navigation"><Link href="/" className="font-serif text-xl font-medium">{'{{SITE_NAME}}'}</Link><div className="flex items-center gap-5 text-sm">{NAV_LINKS.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}{children}</div></nav></header></LocaleProvider>
}
