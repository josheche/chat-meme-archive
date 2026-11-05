'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/', title: 'Archive', path: 'M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z' },
  {
    href: '/lore/',
    title: 'The lore',
    path: 'M4 3h7a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3H4V3Zm16 0h-3a3 3 0 0 0-3 3v15a3 3 0 0 1 3-3h3V3Z',
  },
  {
    href: '/about/',
    title: 'About',
    path: 'M12 8h.01M12 12v4M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
  },
]
export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {items.map(({ href, title, path }) => {
        const active =
          href === '/'
            ? pathname === '/' || pathname.startsWith('/memes/')
            : pathname.startsWith(href)
        return (
          <Link key={href} href={href} aria-current={active ? 'page' : undefined}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={path} />
            </svg>
            <span>{title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
