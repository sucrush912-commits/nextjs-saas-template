type EmailConfirmationClient = { auth: { verifyOtp: (input: { token_hash: string; type: 'email' }) => Promise<{ error: unknown }> } }

function safeRedirect(value: string | null) {
  const fallback = process.env.NEXT_PUBLIC_POST_LOGIN_REDIRECT || '/'
  return value?.startsWith('/') && !value.startsWith('//') ? value : fallback.startsWith('/') ? fallback : '/'
}

export async function confirmEmail({ supabase, tokenHash, type, next }: { supabase: EmailConfirmationClient; tokenHash: string | null; type: string | null; next: string | null }) {
  if (!tokenHash || type !== 'email') return '/login?error=confirmation'
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'email' })
  return error ? '/login?error=confirmation' : safeRedirect(next)
}
