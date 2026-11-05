import { expect, test } from '@playwright/test'
import { memes } from '../src/data/archive'

const route = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`

test('browse, search names, reset, sort and open a meme', async ({ page }) => {
  await page.goto(route('/'))
  await expect(page.getByRole('heading', { name: 'HOG HOG HOG' })).toBeVisible()
  await expect(page.getByRole('status')).toHaveText('Showing 29 of 29 memes')
  await page.getByRole('searchbox', { name: 'Search the archive' }).fill('correction')
  await expect(page.getByRole('status')).toHaveText('Showing 1 of 29 memes')
  await page.getByRole('searchbox', { name: 'Search the archive' }).fill('Joshua')
  await expect(page.getByRole('status')).toHaveText('Showing 1 of 29 memes')
  await page.getByRole('searchbox', { name: 'Search the archive' }).fill('no such bit xyz')
  await expect(page.getByRole('status')).toHaveText('Showing 0 of 29 memes')
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.getByRole('status')).toHaveText('Showing 29 of 29 memes')
  await page.getByRole('combobox', { name: 'Sort memes' }).selectOption('oldest')
  await expect(page.locator('.meme-card h3').first()).toHaveText('The Pidermann Institute')
  await page.getByRole('link', { name: 'View One quick correction', exact: true }).click()
  await expect(
    page.getByRole('heading', { name: 'One quick correction', exact: true }),
  ).toBeVisible()
  await expect(page.locator('.credits')).toContainText('DepictedChris')
  await expect(page.locator('.credits')).toContainText('Also referencedPete')
  await expect(page.getByRole('link', { name: 'Chris', exact: true })).toHaveCount(0)
  await page.getByRole('link', { name: '← All memes' }).click()
  await expect(page.getByRole('status')).toHaveText('Showing 29 of 29 memes')
})

test('meme and lore deep links survive reload and browser history', async ({ page }) => {
  await page.goto(route('/memes/peace-in-chat/'))
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Peace to C.H.A.T.', exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'The admin cinematic universe', exact: false }).click()
  await expect(
    page.getByRole('heading', { name: 'The admin cinematic universe', exact: true }),
  ).toBeVisible()
  await page.reload()
  await expect(page.locator('.meme-card')).toHaveCount(3)
  await page.goBack()
  await expect(page.getByRole('heading', { name: 'Peace to C.H.A.T.', exact: true })).toBeVisible()
  await page.goForward()
  await expect(
    page.getByRole('heading', { name: 'The admin cinematic universe', exact: true }),
  ).toBeVisible()
})

test('all display images load with explicit dimensions and no console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const meme of memes) {
    const { slug } = meme
    await page.goto(route(`/memes/${slug}/`))
    const image = page.locator('.detail-art > img')
    await expect(image).toBeVisible()
    await expect(image).toHaveJSProperty('complete', true)
    expect(await image.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBe(meme.width)
    const original = page.getByRole('link', { name: 'Open full-resolution image' })
    await expect(original).toHaveAttribute('href', route(meme.originalImage))
    const response = await page.request.get(route(meme.originalImage))
    expect(response.status(), meme.originalImage).toBe(200)
  }
  expect(errors).toEqual([])
})

for (const width of [320, 390, 430]) {
  test(`mobile ${width}px has full images, touch navigation and no horizontal overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto(route('/'))
    const nav = page.getByRole('navigation', { name: 'Mobile navigation' })
    await expect(nav).toBeVisible()
    await page.screenshot({ path: `test-results/previews/home-${width}.png`, fullPage: true })
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
    for (const link of await nav.getByRole('link').all()) {
      const box = await link.boundingBox()
      expect(box!.height).toBeGreaterThanOrEqual(44)
      expect(box!.width).toBeGreaterThanOrEqual(44)
    }
    await expect(nav.getByRole('link')).toHaveCount(3)
    await expect(nav.getByRole('link', { name: 'People' })).toHaveCount(0)
    await nav.getByRole('link', { name: 'About' }).click()
    await expect(page.getByRole('heading', { name: 'The archive', exact: true })).toBeVisible()
    await nav.getByRole('link', { name: 'The lore' }).click()
    await expect(page.getByRole('heading', { name: /There is context/ })).toBeVisible()
    await nav.getByRole('link', { name: 'Archive' }).click()
    await page.getByRole('link', { name: 'View Permission to cry, soldier.', exact: true }).click()
    await expect(page.locator('.detail-art > img')).toBeVisible()
    await page.screenshot({ path: `test-results/previews/detail-${width}.png`, fullPage: true })
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
  })
}

test('all archive pages omit directory links and the roster filter', async ({ page }) => {
  for (const path of [
    '/',
    '/about/',
    '/lore/',
    '/lore/admin-cinematic-universe/',
    '/lore/one-more-reply/',
    '/lore/good-market/',
    ...memes.map(({ slug }) => `/memes/${slug}/`),
  ]) {
    await page.goto(route(path))
    await expect(page.locator('a[href*="/people"]')).toHaveCount(0)
    await expect(page.getByRole('combobox', { name: 'Filter by person' })).toHaveCount(0)
  }
})

test('removed directory and all former profile routes return 404', async ({ request }) => {
  for (const path of [
    '/people/',
    ...[
      'joshua',
      'andres',
      'marshall',
      'ryan',
      'pete',
      'chris',
      'carlos',
      'jon-erik',
      'ferny',
      'harry',
    ].map((slug) => `/people/${slug}/`),
  ]) {
    const response = await request.get(route(path))
    expect(response.status(), path).toBe(404)
  }
})

test('theme follows device, toggles, persists and stays local', async ({ page }) => {
  const externalRequests: string[] = []
  page.on('request', (request) => {
    if (
      new URL(request.url()).origin !==
      new URL(process.env.E2E_BASE_URL || 'http://127.0.0.1:3000').origin
    ) {
      externalRequests.push(request.url())
    }
  })
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto(route('/'))
  const toggle = page.getByRole('switch', { name: 'Dark mode' })
  await expect(toggle).toBeChecked()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await toggle.click()
  await expect(toggle).not.toBeChecked()
  await page.reload()
  await expect(toggle).not.toBeChecked()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.goto(route('/lore/'))
  await expect(toggle).not.toBeChecked()
  await toggle.focus()
  await page.keyboard.press('Space')
  await expect(toggle).toBeChecked()
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(toggle).toBeChecked()
  await page.reload()
  await expect(toggle).toBeChecked()
  expect(externalRequests).toEqual([])
})

test('fresh theme follows live device changes and handles blocked storage', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto(route('/'))
  const toggle = page.getByRole('switch', { name: 'Dark mode' })
  await expect(toggle).not.toBeChecked()
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(toggle).toBeChecked()
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage unavailable')
      },
    })
  })
  await page.reload()
  await expect(toggle).toBeChecked()
  await toggle.click()
  await expect(toggle).not.toBeChecked()
})

for (const theme of ['light', 'dark'] as const) {
  for (const width of [320, 390, 430, 1440]) {
    test(`${theme} theme is usable at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ colorScheme: theme })
      await page.goto(route('/'))
      await page.evaluate(() => document.fonts.ready)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      )
      const button = await page.getByRole('switch', { name: 'Dark mode' }).boundingBox()
      expect(button!.width).toBeGreaterThanOrEqual(44)
      expect(button!.height).toBeGreaterThanOrEqual(44)
      await page.screenshot({
        path: `test-results/previews/home-${theme}-${width}.png`,
        fullPage: true,
      })
      await page.getByRole('searchbox').fill('not a known hog')
      await expect(page.getByRole('heading', { name: 'This pen is empty.' })).toBeVisible()
      await page.getByRole('button', { name: 'Clear filters' }).click()
      await expect(page.locator('.meme-card')).toHaveCount(29)
    })
  }
}

test('recovered stills show supported dates and no invented backstory or credits', async ({
  page,
}) => {
  await page.goto(route('/memes/lebron-smiling-as-admin/'))
  await page.reload()
  await expect(
    page.getByRole('heading', { name: 'Smiling Through It All, as Admin', exact: true }),
  ).toBeVisible()
  await expect(page.locator('.credits')).toContainText('Observed · Nov 5, 2026')
  await expect(page.locator('.credits')).toContainText('Creation date is unknown.')
  await expect(page.locator('.credits')).toContainText('LeBron James')
  await expect(page.getByRole('heading', { name: 'For the record.' })).toHaveCount(0)
  await expect(page.getByText('Also referenced', { exact: true })).toHaveCount(0)
  await expect(page.getByText('Adapted format', { exact: true })).toHaveCount(0)
  await expect(page.locator('.related-lore')).toHaveCount(0)
  await page.goto(route('/memes/pete-pidermann-institute-facade/'))
  await expect(page.locator('.credits')).toContainText('Seen · May 6, 2026')
  await page.goto(route('/memes/brolley-mlady/'))
  await expect(page.locator('.credits')).toContainText('Created · Oct 11, 2026')
  await page.goto(route('/memes/anti-comedy-jester/'))
  await expect(page.getByText('Depicted', { exact: true })).toHaveCount(0)
})

test('request audit covers every meme page and original asset', async ({ request }) => {
  for (const meme of memes) {
    const response = await request.get(route(`/memes/${meme.slug}/`))
    expect(response.status(), meme.slug).toBe(200)
    const html = await response.text()
    expect(html, meme.slug).toContain(meme.dateLabel)
    expect(html, meme.slug).toContain(`href="${route(meme.originalImage)}"`)
    expect(html, meme.slug).not.toMatch(/href="[^"]*\/people(?:\/|")/)
    if (!meme.story) expect(html, meme.slug).not.toContain('THE BACKSTORY')
    if (!meme.depicted.length) expect(html, meme.slug).not.toContain('<dt>Depicted</dt>')
    if (!meme.referenced.length) expect(html, meme.slug).not.toContain('Also referenced')
    const asset = await request.get(route(meme.originalImage))
    expect(asset.status(), meme.originalImage).toBe(200)
    expect(asset.headers()['content-type']).toMatch(/^image\/(png|jpeg)/)
    expect((await asset.body()).length).toBeGreaterThan(1000)
  }
})

test('unrelated Raul detail routes and direct image assets return 404', async ({ request }) => {
  for (const slug of ['raul-still-at-afters', 'raul-the-corner-2013']) {
    for (const path of [`/memes/${slug}/`, `/memes/${slug}.png`, `/memes/${slug}.webp`]) {
      const response = await request.get(route(path))
      expect(response.status(), path).toBe(404)
    }
  }
  const home = await request.get(route('/'))
  expect(await home.text()).not.toMatch(/raul/i)
})
