import { expect, test } from '@playwright/test'

const route = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`

for (const width of [320, 390, 768, 1440]) {
  for (const theme of ['light', 'dark'] as const) {
    test(`drawn wordmark and native type stay readable at ${width}px in ${theme}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ colorScheme: theme })
      await page.goto(route('/'))
      await page.evaluate(() => document.fonts.ready)
      const brand = page.locator('.site-header').getByRole('link', {
        name: 'C.H.A.T. Archive home',
        exact: true,
      })
      await expect(brand).toBeVisible()
      await expect(brand.locator('svg')).toHaveCount(2)
      await expect(brand.locator('svg text')).toHaveCount(0)
      await expect(brand.locator('.brand-descriptor')).toHaveText('THE HOG ARCHIVE')
      const brandBox = await brand.boundingBox()
      const toggleBox = await page.getByRole('switch', { name: 'Dark mode' }).boundingBox()
      expect(brandBox!.height).toBeGreaterThanOrEqual(44)
      expect(brandBox!.x + brandBox!.width).toBeLessThan(toggleBox!.x)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
      expect(
        await page.locator('body').evaluate((node) => getComputedStyle(node).fontFamily),
      ).toMatch(/^ui-sans-serif, system-ui,/)
      expect(
        await page.getByRole('searchbox').evaluate((node) => getComputedStyle(node).fontFamily),
      ).toMatch(/^ui-sans-serif, system-ui,/)
      await page.screenshot({ path: `test-results/previews/typography-${theme}-${width}.png` })
      await page.goto(route('/about/'))
      await brand.focus()
      await page.keyboard.press('Enter')
      await expect(page.getByRole('heading', { name: 'HOG HOG HOG' })).toBeVisible()
    })
  }
}

test('wordmark and focus survive forced colors', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto(route('/'))
  const brand = page.locator('.site-header .wordmark')
  await brand.focus()
  await expect(brand).toBeFocused()
  await expect(brand.locator('.brand-letters')).toBeVisible()
  const colors = await brand.evaluate((node) => ({
    outline: getComputedStyle(node).outlineStyle,
    letters: getComputedStyle(node.querySelector('.brand-letters')!).fill,
    surface: getComputedStyle(document.body).backgroundColor,
  }))
  expect(colors.outline).not.toBe('none')
  expect(colors.letters).not.toBe(colors.surface)
})
