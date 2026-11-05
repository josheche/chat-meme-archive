import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import localFont from 'next/font/local'
import { SiteHeader } from '@/components/site-header'
import { BottomNav } from '@/components/bottom-nav'
import { BrandMark } from '@/components/brand-mark'
import './globals.css'

const displayFont = localFont({
  src: '../assets/fonts/Anton-Regular.ttf',
  variable: '--font-display-source',
  weight: '400',
  display: 'swap',
})
const labelFont = localFont({
  src: [
    { path: '../assets/fonts/KodeMono-Regular.woff2', weight: '400' },
    { path: '../assets/fonts/KodeMono-Bold.woff2', weight: '700' },
  ],
  variable: '--font-label-source',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'C.H.A.T. Archive | HOG HOG HOG',
    template: '%s | C.H.A.T. Archive',
  },
  description:
    'A growing, credited archive of the group’s memes and very serious lore. AI-generated parody, carefully catalogued.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf7ef' },
    { media: '(prefers-color-scheme: dark)', color: '#111d17' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${labelFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{let t;try{t=localStorage.getItem('chat-archive-theme')}catch{}document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <footer className="site-footer shell">
          <Link href="/" className="footer-mark" aria-label="C.H.A.T. Archive home">
            <BrandMark />
          </Link>
          <p>Hogs of a feather. Extremely important nonsense, preserved.</p>
          <Link href="/about/">Credits & archive notes ↗</Link>
        </footer>
        <BottomNav />
      </body>
    </html>
  )
}
