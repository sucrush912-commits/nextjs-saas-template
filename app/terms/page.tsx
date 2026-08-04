import { LegalPage, legalMetadata } from '@/components/legal-page'
export const metadata = legalMetadata('terms', 'en')
export default function TermsPage() { return <LegalPage kind="terms" /> }
