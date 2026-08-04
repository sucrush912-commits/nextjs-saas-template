import { AuthPage } from '@/components/auth/auth-page'
export const metadata = { robots: { index: false, follow: false } }
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) { return <AuthPage mode="login" next={(await searchParams).next} /> }
