import type { Metadata } from 'next'
import { memes, type Meme } from '@/data/archive'
import { assetPath, filterMemes } from '@/lib/archive'

const siteName = 'C.H.A.T. Archive'
const siteDescription =
  'A growing, credited archive of the group’s memes and very serious lore. AI-generated parody, carefully catalogued.'

export function absoluteSiteUrl(path: string): string {
  const origin = process.env.SITE_ORIGIN || 'http://localhost:3000'
  return new URL(assetPath(path), origin).href
}

function shareMetadata(title: string, description: string, path: string, meme?: Meme): Metadata {
  const url = absoluteSiteUrl(path)
  // Fitted PNG cards are generated locally at build time; originals remain untouched.
  const images = meme
    ? [
        {
          url: absoluteSiteUrl(`/share/${meme.slug}.png`),
          width: 1200,
          height: 630,
          alt: meme.alt,
          type: 'image/png',
        },
      ]
    : []

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName, title, description, url, images },
    twitter: { card: 'summary_large_image', title, description, images },
  }
}

export function homeShareMetadata(items: Meme[] = memes): Metadata {
  // Match the gallery's supported archive dates and stable same-day slug ordering.
  // An observed/uploaded/delivered date does not assert a creation date.
  const latest = filterMemes(items, '', 'newest')[0]
  return shareMetadata(`${siteName} | HOG HOG HOG`, siteDescription, '/', latest)
}

export function memeShareMetadata(meme: Meme): Metadata {
  return shareMetadata(
    `${meme.title} | ${siteName}`,
    meme.subtitle ?? meme.alt,
    `/memes/${meme.slug}/`,
    meme,
  )
}
