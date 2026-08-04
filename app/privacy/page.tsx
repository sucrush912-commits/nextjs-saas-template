import { LegalPage, legalMetadata } from '@/components/legal-page'
export const metadata = legalMetadata('privacy', 'en')
export default function PrivacyPage() { return <LegalPage kind="privacy" /> }
