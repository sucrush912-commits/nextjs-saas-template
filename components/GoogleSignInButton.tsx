'use client'

import { useFormStatus } from 'react-dom'
import { signInWithGoogleAction } from '@/app/actions'

function GoogleIcon() {
  return <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.51h3.14c1.84-1.69 2.91-4.19 2.91-7.28Z" /><path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.37l-3.14-2.51c-.87.58-1.99.92-3.31.92-2.54 0-4.69-1.72-5.46-4.02H3.3v2.59A9.75 9.75 0 0 0 12 21.75Z" /><path fill="#FBBC05" d="M6.54 13.77A5.85 5.85 0 0 1 6.23 12c0-.61.11-1.2.31-1.77V7.64H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.36l3.24-2.59Z" /><path fill="#EA4335" d="M12 6.21c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.31 14.62 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.39l3.24 2.59C7.31 7.93 9.46 6.21 12 6.21Z" /></svg>
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return <button type="submit" disabled={pending} className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"><GoogleIcon />{pending ? 'Connecting…' : 'Continue with Google'}</button>
}

export function GoogleSignInButton() {
  return <form action={signInWithGoogleAction}><SubmitButton /></form>
}
