import { AuthForm } from '@/components/auth/auth-form'
import { GoogleSignInButton } from '@/components/GoogleSignInButton'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'

export function AuthPage({ mode, next }: { mode: 'login' | 'signup'; next?: string }) {
  return <><SiteNav /><main className="mx-auto min-h-[calc(100dvh-10rem)] max-w-md px-6 py-16"><p className="text-sm text-muted-foreground">{'{{SITE_NAME}}'}</p><h1 className="mt-3 font-serif text-4xl font-medium">{mode === 'login' ? 'Sign in' : 'Create account'}</h1><div className="mt-8"><AuthForm mode={mode} next={next} />{mode === 'login' && <div className="mt-6 grid gap-6"><div className="flex items-center gap-3 text-xs text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">or</div><GoogleSignInButton /></div>}</div></main><SiteFooter /></>
}
