import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto flex min-h-[calc(100dvh-9rem)] max-w-5xl items-center px-6 py-20">
        <section className="max-w-2xl">
          <p className="text-sm text-muted-foreground">{'{{SITE_DESCRIPTION}}'}</p>
          <h1 className="mt-4 font-serif text-5xl font-medium tracking-tight sm:text-6xl">{'{{SITE_NAME}}'}</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{'{{LANDING_PAGE_CONTENT}}'}</p>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
