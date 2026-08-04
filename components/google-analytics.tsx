'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global { interface Window { dataLayer: unknown[]; gtag: (...args: unknown[]) => void } }

export function GoogleAnalytics() {
  const pathname = usePathname()
  const measurementId = process.env.NEXT_PUBLIC_GA_ID
  useEffect(() => {
    if (!measurementId || process.env.NODE_ENV !== 'production' || typeof window.gtag !== 'function') return
    window.gtag('event', 'page_view', { page_path: pathname, page_location: window.location.href, page_title: document.title })
  }, [measurementId, pathname])
  if (!measurementId || process.env.NODE_ENV !== 'production') return null
  const initScript = `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\nwindow.gtag = gtag;\ngtag('js', new Date());\ngtag('config', '${measurementId}', { send_page_view: false });`
  return <><Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{initScript}</Script></>
}
