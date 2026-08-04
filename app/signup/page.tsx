import { AuthPage } from '@/components/auth/auth-page'
export const metadata = { robots: { index: false, follow: false } }
export default async function SignupPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) { return <AuthPage mode="signup" next={(await searchParams).next} /> }
