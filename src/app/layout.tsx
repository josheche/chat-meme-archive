import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { BottomNav } from '@/components/bottom-nav'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'C.H.A.T. Archive — The bits. The people. The lore.',
    template: '%s | C.H.A.T. Archive',
  },
  description:
    'A growing, credited archive of the group’s memes, recurring characters and very serious lore. AI-generated parody, carefully catalogued.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f6f4ef',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <footer className="site-footer shell">
          <Link href="/" className="footer-mark">
            C.H.A.T. ARCHIVE
          </Link>
          <p>A small museum of extremely important nonsense.</p>
          <Link href="/about/">Credits & archive notes ↗</Link>
        </footer>
        <BottomNav />
      </body>
    </html>
  )
}
