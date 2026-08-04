import { AuthForm } from '@/components/auth/auth-form'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'

export function AuthPage({ mode, next }: { mode: 'login' | 'signup'; next?: string }) {
  return <><SiteNav /><main className="mx-auto min-h-[calc(100dvh-10rem)] max-w-md px-6 py-16"><p className="text-sm text-muted-foreground">{'{{SITE_NAME}}'}</p><h1 className="mt-3 font-serif text-4xl font-medium">{mode === 'login' ? 'Sign in' : 'Create account'}</h1><div className="mt-8"><AuthForm mode={mode} next={next} /></div></main><SiteFooter /></>
}
