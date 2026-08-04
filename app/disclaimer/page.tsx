import { LegalPage, legalMetadata } from '@/components/legal-page'
export const metadata = legalMetadata('disclaimer', 'en')
export default function DisclaimerPage() { return <LegalPage kind="disclaimer" /> }
