import { describe, expect, it } from 'vitest'
import { memes, people, lore } from '@/data/archive'
import { assetPath, filterMemes, findMeme } from './archive'
import { cn } from './utils'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

describe('archive logic', () => {
  it('sorts without mutating source records', () => {
    expect(filterMemes(memes, '', '', 'newest')[0]?.slug).toBe('fair-point')
    expect(filterMemes(memes, '', '', 'oldest')[0]?.slug).toBe('peace-in-chat')
    expect(memes[0]?.slug).toBe('peace-in-chat')
  })
  it('filters case-insensitive text, subject and referenced people together', () => {
    expect(filterMemes(memes, '  ACTUALLY ', 'pete', 'newest').map((m) => m.slug)).toContain(
      'one-quick-correction',
    )
    expect(filterMemes(memes, '', 'andres', 'newest')).toHaveLength(3)
    expect(filterMemes(memes, 'Peter', '', 'newest')).toHaveLength(5)
    expect(filterMemes(memes, 'dot', '', 'newest')).toHaveLength(7)
    expect(filterMemes(memes, '', 'brolley', 'newest')).toHaveLength(7)
    expect(filterMemes(memes, 'outstanding', 'pete', 'newest')).toEqual([])
    expect(filterMemes(memes, 'no such bit xyz', '', 'newest')).toEqual([])
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
  it('has unique slugs, real assets, explicit credits and valid relations', () => {
    expect(new Set(memes.map((m) => m.slug)).size).toBe(memes.length)
    for (const meme of memes) {
      expect(existsSync(join(process.cwd(), 'public', meme.image))).toBe(true)
      expect(existsSync(join(process.cwd(), 'public', meme.originalImage))).toBe(true)
      expect(Number.isNaN(Date.parse(meme.date))).toBe(false)
      expect(meme.creator).not.toBe(meme.depicted[0])
      expect(meme.alt.length).toBeGreaterThan(50)
      for (const person of [...meme.depicted, ...meme.referenced, meme.creator, meme.requester])
        expect(people.some((p) => p.slug === person)).toBe(true)
      for (const story of meme.lore) expect(lore.some((l) => l.slug === story)).toBe(true)
    }
  })
})
