import { afterEach, describe, expect, it, vi } from 'vitest'
import { memes } from '@/data/archive'
import { absoluteSiteUrl, homeShareMetadata, memeShareMetadata } from './share-metadata'

afterEach(() => vi.unstubAllEnvs())

describe('share metadata', () => {
  it('uses local absolute URLs by default and supports deployment origins and prefixes', () => {
    vi.stubEnv('SITE_ORIGIN', '')
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '')
    expect(absoluteSiteUrl('/')).toBe('http://localhost:3000/')
    vi.stubEnv('SITE_ORIGIN', 'https://example.github.io')
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/my-archive')
    expect(absoluteSiteUrl('/memes/test.png')).toBe(
      'https://example.github.io/my-archive/memes/test.png',
    )
    vi.stubEnv('SITE_ORIGIN', 'https://custom.example/')
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '')
    expect(absoluteSiteUrl('/memes/test/')).toBe('https://custom.example/memes/test/')
  })

  it('selects the newest supported archive date, not the pinned hero or insertion order', () => {
    vi.stubEnv('SITE_ORIGIN', 'https://example.com')
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/archive')
    const metadata = homeShareMetadata()
    expect(metadata.openGraph).toMatchObject({
      type: 'website',
      siteName: 'C.H.A.T. Archive',
      url: 'https://example.com/archive/',
      images: [
        {
          url: 'https://example.com/archive/share/brolley-smiling-as-admin.png',
          type: 'image/png',
          width: 1200,
          height: 630,
        },
      ],
    })
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' })
    expect(metadata.alternates?.canonical).toBe('https://example.com/archive/')
    expect(metadata.title).toEqual({ absolute: 'C.H.A.T. Archive | HOG HOG HOG' })
    expect(metadata.openGraph).not.toHaveProperty('publishedTime')
    expect(memes[0]?.slug).toBe('peace-in-chat')
  })

  it('updates when a later-dated record is added and uses the gallery tie-breaker', () => {
    const later = { ...memes[0]!, slug: 'later', date: '2026-11-06', originalImage: '/later.png' }
    expect(homeShareMetadata([...memes, later]).openGraph).toMatchObject({
      images: [{ url: expect.stringContaining('/later.png') }],
    })
    expect(homeShareMetadata([memes[0]!, memes[1]!]).openGraph).toMatchObject({
      images: [{ url: expect.stringContaining('/share/hit-the-road.png') }],
    })
  })

  it('has useful text and no broken image if the archive is empty', () => {
    const metadata = homeShareMetadata([])
    expect(metadata.description).toContain('archive')
    expect(metadata.openGraph).toMatchObject({ images: [] })
    expect(metadata.twitter).toMatchObject({ images: [] })
  })

  it('gives every meme its own canonical URL, image dimensions, alt and description', () => {
    vi.stubEnv('SITE_ORIGIN', 'https://example.com')
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/archive')
    for (const meme of memes) {
      expect(meme.originalImage).toMatch(/\.(png|jpe?g)$/)
      const metadata = memeShareMetadata(meme)
      const image = {
        url: `https://example.com/archive/share/${meme.slug}.png`,
        width: 1200,
        height: 630,
        alt: meme.alt,
        type: 'image/png',
      }
      expect(metadata.alternates?.canonical).toBe(`https://example.com/archive/memes/${meme.slug}/`)
      expect(metadata.description).toBe(meme.subtitle ?? meme.alt)
      expect(metadata.openGraph).toMatchObject({ images: [image] })
      expect(metadata.twitter).toMatchObject({ images: [image] })
      expect(metadata.title).toEqual({ absolute: `${meme.title} | C.H.A.T. Archive` })
    }
  })
})
