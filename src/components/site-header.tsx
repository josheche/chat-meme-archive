import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function SiteHeader() {
  return (
    <header className="site-header shell">
      <Link href="/" className="wordmark" aria-label="C.H.A.T. Archive home">
        <span className="brand-hog" aria-hidden="true">
          🐗
        </span>
        <span className="brand-copy">
          C.H.A.T.<small>THE HOG ARCHIVE</small>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/">Archive</Link>
        <Link href="/lore/">The lore</Link>
        <Link href="/about/">About</Link>
      </nav>
      <div className="header-tools">
        <span className="edition">VOL. 01 / 2026</span>
        <ThemeToggle />
      </div>
    </header>
  )
}
