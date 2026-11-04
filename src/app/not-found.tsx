import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main id="main" className="shell interior-page">
      <p className="eyebrow">404 / NOT IN THE ARCHIVE</p>
      <h1>
        This bit
        <br />
        <em>is missing.</em>
      </h1>
      <p className="page-intro">
        The page may have moved, or this entry has not been catalogued yet.
      </p>
      <div className="section-label">
        <Button asChild>
          <Link href="/">Back to the archive</Link>
        </Button>
      </div>
    </main>
  )
}
