import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="site-header shell">
      <Link href="/" className="wordmark" aria-label="C.H.A.T. Archive home">
        C.H.A.T.<span>THE ARCHIVE</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/">Archive</Link>
        <Link href="/people/">People</Link>
        <Link href="/lore/">The lore</Link>
        <Link href="/about/">About</Link>
      </nav>
      <span className="edition">VOL. 01 / 2026</span>
    </header>
  )
}
