import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchPng, shareData } from './sharing'

const png = new Blob([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 1])], {
  type: 'image/png',
})
const file = new File([png], 'meme.png', { type: 'image/png' })

afterEach(() => vi.unstubAllGlobals())

describe('original PNG loading', () => {
  it('loads original PNG bytes from the exact prefixed path', async () => {
    const request = vi.fn().mockResolvedValue(new Response(png))
    vi.stubGlobal('fetch', request)
    const result = await fetchPng('/archive/memes/original.png')
    expect(request).toHaveBeenCalledWith('/archive/memes/original.png')
    expect(await result.arrayBuffer()).toEqual(await png.arrayBuffer())
  })
  it('rejects HTTP failure, wrong media, empty files, and invalid PNG signatures', async () => {
    const request = vi
      .fn()
      .mockResolvedValueOnce(new Response('', { status: 404 }))
      .mockResolvedValueOnce(new Response('not a PNG'))
      .mockResolvedValueOnce(new Response(new Blob([], { type: 'image/png' })))
      .mockResolvedValueOnce(new Response(new Blob(['not a PNG file'], { type: 'image/png' })))
    vi.stubGlobal('fetch', request)
    await expect(fetchPng('/missing')).rejects.toThrow('could not be loaded')
    await expect(fetchPng('/wrong')).rejects.toThrow('not a PNG')
    await expect(fetchPng('/empty')).rejects.toThrow('empty or invalid')
    await expect(fetchPng('/corrupt')).rejects.toThrow('empty or invalid')
  })
})

describe('native share payload', () => {
  it('shares original file only when file sharing is explicitly supported', () => {
    const canShare = vi.fn().mockReturnValue(true)
    expect(shareData(file, 'Meme', 'https://example.com/archive/memes/test/', canShare)).toEqual({
      title: 'Meme',
      files: [file],
    })
    expect(canShare).toHaveBeenCalledWith({ files: [file] })
  })
  it('offers the page payload for absent, unsupported, or throwing capabilities', () => {
    const fallback = { title: 'Meme', url: 'https://example.com/archive/memes/test/' }
    for (const [image, capability] of [
      [null, undefined],
      [file, undefined],
      [file, () => false],
      [
        file,
        () => {
          throw new Error('Not supported')
        },
      ],
    ] as const) {
      expect(shareData(image, fallback.title, fallback.url, capability)).toEqual(fallback)
    }
  })
})
