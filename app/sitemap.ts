import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: add your public routes before submitting a sitemap.
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }]
}
