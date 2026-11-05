import { describe, expect, it } from 'vitest'
import { memes, lore } from '@/data/archive'
import { assetPath, filterMemes, findMeme } from './archive'
import { cn } from './utils'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

describe('archive logic', () => {
  it('sorts without mutating source records', () => {
    expect(filterMemes(memes, '', 'newest')[0]?.slug).toBe('brolley-smiling-as-admin')
    expect(filterMemes(memes, '', 'oldest')[0]?.slug).toBe('pete-pidermann-institute-facade')
    expect(memes[0]?.slug).toBe('peace-in-chat')
    const dated = [memes[0]!, { ...memes[1]!, date: '2026-11-03' }]
    expect(filterMemes(dated, '', 'newest')[0]?.slug).toBe('peace-in-chat')
    expect(filterMemes(dated, '', 'oldest')[0]?.slug).toBe('hit-the-road')
  })
  it('searches meme text and names without a separate roster', () => {
    expect(filterMemes(memes, '  ACTUALLY ', 'newest').map((m) => m.slug)).toContain(
      'one-quick-correction',
    )
    expect(filterMemes(memes, 'Andres', 'newest')).toHaveLength(8)
    expect(filterMemes(memes, 'Pete', 'newest')).toHaveLength(10)
    expect(filterMemes(memes, 'Chris', 'newest')).toHaveLength(7)
    expect(filterMemes(memes, 'Joshua', 'newest')).toHaveLength(1)
    expect(filterMemes(memes, 'dot', 'newest')).toHaveLength(0)
    expect(filterMemes(memes, 'no such bit xyz', 'newest')).toEqual([])
  })
  it('has no people directory or standalone roster export', async () => {
    expect(existsSync(join(process.cwd(), 'src/app/people'))).toBe(false)
    const data = await import('@/data/archive')
    expect(Object.keys(data).sort()).toEqual(['lore', 'memes'])
  })
  it('preserves 31 distinct originals without unsupported metadata', () => {
    expect(memes).toHaveLength(31)
    const hashes = memes.map((meme) =>
      createHash('sha256')
        .update(readFileSync(join(process.cwd(), 'public', meme.originalImage)))
        .digest('hex'),
    )
    expect(new Set(hashes).size).toBe(31)
    expect(memes.filter((meme) => meme.dateBasis === 'delivery')).toHaveLength(7)
    expect(memes.filter((meme) => meme.dateBasis === 'creation')).toHaveLength(21)
    expect(memes.filter((meme) => meme.dateBasis === 'uploaded')).toHaveLength(2)
    expect(memes.filter((meme) => meme.dateBasis === 'observed')).toHaveLength(1)
    for (const meme of memes) {
      expect(meme.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(meme.datePrecision).toBe('day')
      expect(meme.firstGroupUse).toBeNull()
      expect(meme).not.toHaveProperty('creator')
      expect(meme).not.toHaveProperty('sharer')
      expect(meme).not.toHaveProperty('source')
    }
    for (const meme of memes
      .slice(7)
      .filter((record) => record.slug !== 'brolley-smiling-as-admin')) {
      expect(meme.story).toBeUndefined()
      expect(meme.lore).toBeUndefined()
      expect(meme.formatUrl).toBeUndefined()
    }
    expect(findMeme('lebron-smiling-as-admin')?.dateLabel).toBe('Observed · Nov 5, 2026')
    expect(findMeme('pete-pidermann-institute-facade')?.dateLabel).toBe('Seen · May 6, 2026')
  })
  it('preserves the Brolley admin adaptation and links its archived source', () => {
    const meme = findMeme('brolley-smiling-as-admin')!
    expect(meme).toMatchObject({
      image: '/memes/brolley-smiling-as-admin.webp',
      originalImage: '/memes/brolley-smiling-as-admin.png',
      width: 1254,
      height: 1254,
      date: '2026-11-05',
      dateLabel: 'Created · Nov 5, 2026',
      dateBasis: 'creation',
      depicted: ['Brolley'],
      referenced: ['LeBron James'],
      firstGroupUse: null,
      formatUrl: 'https://josheche.github.io/chat-meme-archive/memes/lebron-smiling-as-admin/',
      lore: ['admin-cinematic-universe'],
    })
    expect(
      createHash('sha256')
        .update(readFileSync(join(process.cwd(), 'public', meme.originalImage)))
        .digest('hex'),
    ).toBe('7dacc151a515959a3b5de2d22308569263ff5c42142c21bbaad728ff525dc0c7')
    expect(
      filterMemes(memes, 'smiling through it all', 'newest').map((record) => record.slug),
    ).toEqual([meme.slug, 'lebron-smiling-as-admin'])
  })
  it('preserves the recovered bow-pose original with only its known upload date', () => {
    const meme = findMeme('brolley-bow-pose')!
    expect(meme).toMatchObject({
      title: 'Bow Pose',
      image: '/memes/brolley-bow-pose.jpg',
      originalImage: '/memes/brolley-bow-pose.jpg',
      width: 1209,
      height: 1300,
      date: '2026-10-11',
      dateLabel: 'Seen · Oct 11, 2026',
      dateBasis: 'uploaded',
      firstGroupUse: null,
      depicted: ['Brolley'],
      referenced: [],
    })
    expect(
      createHash('sha256')
        .update(readFileSync(join(process.cwd(), 'public', meme.originalImage)))
        .digest('hex'),
    ).toBe('2a2821236bbbbd76ed05fdd002d00e1c250989dd439b39d81b20e022ff60b2b5')
    expect(filterMemes(memes, 'Brolley', 'newest').map((record) => record.slug)).toContain(
      meme.slug,
    )
    expect(filterMemes(memes, 'bow pose', 'newest')).toEqual([meme])
    expect(meme.story).toBeUndefined()
    expect(meme.lore).toBeUndefined()
  })
  it('excludes unrelated Raul records and every original/display asset', () => {
    expect(filterMemes(memes, 'Raul', 'newest')).toEqual([])
    for (const slug of ['raul-still-at-afters', 'raul-the-corner-2013']) {
      expect(findMeme(slug)).toBeUndefined()
      for (const extension of ['png', 'webp']) {
        expect(existsSync(join(process.cwd(), 'public', 'memes', `${slug}.${extension}`))).toBe(
          false,
        )
      }
    }
  })
  it('uses the same stable alphabetical tie-breaker in either date order', () => {
    const sameDay = [memes[0]!, memes[1]!]
    expect(filterMemes(sameDay, '', 'oldest').map((m) => m.slug)).toEqual([
      'hit-the-road',
      'peace-in-chat',
    ])
    expect(filterMemes(sameDay, '', 'newest').map((m) => m.slug)).toEqual([
      'hit-the-road',
      'peace-in-chat',
    ])
    expect(sameDay[0]?.slug).toBe('peace-in-chat')
  })
  it('finds known and missing slugs', () => {
    expect(findMeme('peace-in-chat')?.title).toBe('Peace to C.H.A.T.')
    expect(findMeme('missing')).toBeUndefined()
  })
  it('respects deployment prefixes', () => {
    const old = process.env.NEXT_PUBLIC_BASE_PATH
    delete process.env.NEXT_PUBLIC_BASE_PATH
    expect(assetPath('/memes/test.png')).toBe('/memes/test.png')
    process.env.NEXT_PUBLIC_BASE_PATH = '/archive'
    expect(assetPath('/memes/test.png')).toBe('/archive/memes/test.png')
    if (old === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH
    else process.env.NEXT_PUBLIC_BASE_PATH = old
  })
  it('composes conditional classes and resolves Tailwind conflicts', () => {
    expect(cn('p-2', false && 'hidden', 'p-4')).toBe('p-4')
  })
  it('has unique slugs, real assets, per-meme names and valid lore relations', () => {
    expect(new Set(memes.map((m) => m.slug)).size).toBe(memes.length)
    for (const meme of memes) {
      expect(existsSync(join(process.cwd(), 'public', meme.image))).toBe(true)
      expect(existsSync(join(process.cwd(), 'public', meme.originalImage))).toBe(true)
      expect(Number.isNaN(Date.parse(meme.date))).toBe(false)
      expect(meme.alt.length).toBeGreaterThan(50)
      for (const name of [...meme.depicted, ...meme.referenced]) {
        expect(name.trim()).not.toBe('')
        expect(name).toMatch(/^[A-Z]/)
      }
      for (const story of meme.lore ?? []) expect(lore.some((l) => l.slug === story)).toBe(true)
    }
  })
})
