import { expect, test } from '@playwright/test'
import { memes } from '../src/data/archive'

const route = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`
const origin =
  process.env.SITE_ORIGIN || new URL(process.env.E2E_BASE_URL || 'http://localhost:3000').origin
const absolute = (path: string) => new URL(route(path), origin).href

function meta(html: string, key: string): string | undefined {
  return html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`))?.[1]
}

test('share metadata is in the initial HTML without running JavaScript', async ({ request }) => {
  test.setTimeout(120_000)
  const latest = [...memes].sort(
    (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
  )[0]!
  const homepage = await request.get(route('/'), {
    headers: { 'User-Agent': 'facebookexternalhit/1.1' },
  })
  expect(homepage.ok()).toBe(true)
  const homeHtml = (await homepage.text()).split('</head>')[0]!
  expect(meta(homeHtml, 'og:image')).toBe(absolute(`/share/${latest.slug}.png`))
  expect(meta(homeHtml, 'og:url')).toBe(absolute('/'))
  expect(meta(homeHtml, 'twitter:image')).toBe(absolute(`/share/${latest.slug}.png`))
  expect(meta(homeHtml, 'twitter:card')).toBe('summary_large_image')

  for (const meme of memes) {
    const response = await request.get(route(`/memes/${meme.slug}/`))
    expect(response.ok(), meme.slug).toBe(true)
    const html = (await response.text()).split('</head>')[0]!
    expect(meta(html, 'og:url')).toBe(absolute(`/memes/${meme.slug}/`))
    expect(meta(html, 'og:image')).toBe(absolute(`/share/${meme.slug}.png`))
    expect(meta(html, 'og:image:width')).toBe('1200')
    expect(meta(html, 'og:image:height')).toBe('630')
    expect(meta(html, 'og:image:alt')).toBeTruthy()
    expect(meta(html, 'og:description')).toBeTruthy()
    expect(meta(html, 'twitter:image')).toBe(absolute(`/share/${meme.slug}.png`))
    expect(meta(html, 'twitter:card')).toBe('summary_large_image')
    expect(html).toContain(`<link rel="canonical" href="${absolute(`/memes/${meme.slug}/`)}"`)
  }

  // Fetch every generated PNG and check its actual dimensions, not only declared metadata.
  for (const meme of memes) {
    const response = await request.get(route(`/share/${meme.slug}.png`))
    expect(response.ok()).toBe(true)
    expect(response.headers()['content-type']).toMatch(/^image\/png/)
    const bytes = await response.body()
    expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a')
    expect(bytes.readUInt32BE(16)).toBe(1200)
    expect(bytes.readUInt32BE(20)).toBe(630)
    expect(bytes.byteLength).toBeLessThan(5_000_000)
  }
})
