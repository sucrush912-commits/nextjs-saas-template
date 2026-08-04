import Link from 'next/link'

type FooterLink = { label: string; href: string }
// {{FOOTER_LINKS}}
const FOOTER_LINKS: FooterLink[] = []

export function SiteFooter() {
  return <footer className="border-t border-border"><div className="mx-auto flex min-h-24 max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground"><span>© {'{{SITE_NAME}}'}</span><nav className="flex gap-4" aria-label="Footer navigation">{FOOTER_LINKS.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav></div></footer>
}
