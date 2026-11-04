import { expect, test } from '@playwright/test'

const route = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`

test('browse, search, filter, reset and open a meme', async ({ page }) => {
  await page.goto(route('/'))
  await expect(page.getByRole('heading', { name: /The bits/ })).toBeVisible()
  await expect(page.getByRole('status')).toHaveText('Showing 7 of 7 memes')
  await page.getByRole('searchbox', { name: 'Search the archive' }).fill('correction')
  await expect(page.getByRole('status')).toHaveText('Showing 1 of 7 memes')
  await page.getByRole('combobox', { name: 'Filter by person' }).selectOption('andres')
  await expect(page.getByRole('status')).toHaveText('Showing 0 of 7 memes')
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.getByRole('status')).toHaveText('Showing 7 of 7 memes')
  await page.getByRole('combobox', { name: 'Sort memes' }).selectOption('oldest')
  await expect(page.locator('.meme-card h3').first()).toHaveText('Peace to C.H.A.T.')
  await page.getByRole('link', { name: 'View One quick correction', exact: true }).click()
  await expect(
    page.getByRole('heading', { name: 'One quick correction', exact: true }),
  ).toBeVisible()
  await expect(page.getByText('Generated & adapted by')).toBeVisible()
  await page.getByRole('link', { name: '← All memes' }).click()
  await expect(page.getByRole('status')).toHaveText('Showing 7 of 7 memes')
})

test('deep links, people and lore survive reload and browser history', async ({ page }) => {
  await page.goto(route('/memes/peace-in-chat/'))
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Peace to C.H.A.T.', exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Fat Brolley', exact: true }).click()
  await expect(page).toHaveURL(new RegExp(`${route('/people/brolley/')}$`))
  await expect(page.getByRole('heading', { name: 'Fat Brolley', exact: true })).toBeVisible()
  await page.goBack()
  await expect(page.getByRole('heading', { name: 'Peace to C.H.A.T.', exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'The admin cinematic universe', exact: false }).click()
  await expect(
    page.getByRole('heading', { name: 'The admin cinematic universe', exact: true }),
  ).toBeVisible()
  await page.reload()
  await expect(page.locator('.meme-card')).toHaveCount(3)
})

test('all display images load with explicit dimensions and no console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const slug of [
    'peace-in-chat',
    'hit-the-road',
    'outstanding',
    'due-process',
    'one-quick-correction',
    'not-taking-the-bait',
    'fair-point',
  ]) {
    await page.goto(route(`/memes/${slug}/`))
    await expect(page.getByRole('button', { name: 'Share meme', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Save image', exact: true })).toHaveAttribute(
      'href',
      route(`/memes/${slug}.png`),
    )
    const image = page.locator('.detail-art > img')
    await expect(image).toBeVisible()
    await expect(image).toHaveJSProperty('complete', true)
    expect(await image.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(
      1000,
    )
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
    await page.screenshot({ path: `test-results/previews/home-${width}.png` })
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
    for (const link of await nav.getByRole('link').all()) {
      const box = await link.boundingBox()
      expect(box!.height).toBeGreaterThanOrEqual(44)
      expect(box!.width).toBeGreaterThanOrEqual(44)
    }
    await nav.getByRole('link', { name: 'People' }).click()
    await expect(page.getByRole('heading', { name: /A cast/ })).toBeVisible()
    await nav.getByRole('link', { name: 'The lore' }).click()
    await expect(page.getByRole('heading', { name: /There is context/ })).toBeVisible()
    await nav.getByRole('link', { name: 'Archive' }).click()
    await page.getByRole('link', { name: 'View Permission to cry, soldier.', exact: true }).click()
    await expect(page.locator('.detail-art > img')).toBeVisible()
    for (const control of await page.locator('.share-actions > *').all()) {
      const box = await control.boundingBox()
      expect(box!.height).toBeGreaterThanOrEqual(44)
      expect(box!.width).toBeGreaterThanOrEqual(44)
    }
    await page.locator('.meme-share').scrollIntoViewIfNeeded()
    await page.screenshot({ path: `test-results/previews/sharing-${width}.png` })
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, 0)
    })
    await page.screenshot({ path: `test-results/previews/detail-${width}.png` })
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
  })
}
