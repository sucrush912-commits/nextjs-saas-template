import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@/components/google-analytics'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const _sans = Geist({ subsets: ['latin'] })
const _mono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '{{SITE_NAME}}',
  description: '{{SITE_DESCRIPTION}}',
  openGraph: { type: 'website', siteName: '{{SITE_NAME}}', title: '{{SITE_NAME}}', description: '{{SITE_DESCRIPTION}}' },
  twitter: { card: 'summary_large_image', title: '{{SITE_NAME}}', description: '{{SITE_DESCRIPTION}}' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#F4F5F3' }
const shouldLoadVercelAnalytics = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED === 'true'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background" suppressHydrationWarning><body className="antialiased font-sans" suppressHydrationWarning>{children}{process.env.NODE_ENV === 'production' && shouldLoadVercelAnalytics && <Analytics />}<GoogleAnalytics /></body></html>
}
