import { expect, test, type Page } from '@playwright/test'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const route = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`
const originalHash = createHash('sha256')
  .update(readFileSync(join(process.cwd(), 'public/memes/fair-point.png')))
  .digest('hex')

type Mode = 'supported' | 'unavailable' | 'rejected' | 'canceled' | 'link-only' | 'pending'
type ShareWindow = Window & {
  shareCalls: { url?: string; file?: { name: string; type: string; hash: string } }[]
  copiedLink: string
  copiedImage: { hash: string; type: string; activation: boolean; promise: boolean } | null
  finishShare: () => void
}

async function mockSharing(page: Page, mode: Mode) {
  await page.addInitScript((mode) => {
    const state = window as unknown as ShareWindow
    state.shareCalls = []
    state.copiedLink = ''
    state.copiedImage = null
    const hash = async (blob: Blob) =>
      Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', await blob.arrayBuffer())))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('')
    Object.defineProperty(navigator, 'canShare', {
      configurable: true,
      value: () => mode !== 'link-only',
    })
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value:
        mode === 'unavailable'
          ? undefined
          : async (data: ShareData) => {
              if (mode === 'canceled') throw new DOMException('Canceled', 'AbortError')
              if (mode === 'rejected') throw new DOMException('Denied', 'NotAllowedError')
              const file = data.files?.[0]
              state.shareCalls.push({
                url: data.url,
                file: file
                  ? { name: file.name, type: file.type, hash: await hash(file) }
                  : undefined,
              })
              if (mode === 'pending')
                await new Promise<void>((resolve) => (state.finishShare = resolve))
            },
    })
    class MockClipboardItem {
      constructor(readonly data: Record<string, Promise<Blob>>) {}
      // Deliberately no static supports(): older Safari must still work.
    }
    Object.defineProperty(window, 'ClipboardItem', { configurable: true, value: MockClipboardItem })
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value:
        mode === 'unavailable'
          ? undefined
          : {
              writeText: async (text: string) => {
                if (mode === 'rejected') throw new DOMException('Denied', 'NotAllowedError')
                state.copiedLink = text
              },
              write: async (items: MockClipboardItem[]) => {
                const activation = navigator.userActivation.isActive
                const promise = items[0]!.data['image/png']! instanceof Promise
                if (mode === 'rejected') throw new DOMException('Denied', 'NotAllowedError')
                const blob = await items[0]!.data['image/png']!
                state.copiedImage = { hash: await hash(blob), type: blob.type, activation, promise }
              },
            },
    })
  }, mode)
}

async function openMeme(page: Page) {
  await page.goto(route('/memes/fair-point/'))
  await expect(page.locator('.meme-share')).toHaveAttribute('data-original-state', 'ready')
}

test('shares and copies the original PNG, copies canonical link, and downloads original bytes', async ({
  page,
}) => {
  await mockSharing(page, 'supported')
  await openMeme(page)
  await page.getByRole('button', { name: 'Share meme', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Image handed to your device’s share menu.')
  expect(await page.evaluate(() => (window as unknown as ShareWindow).shareCalls)).toEqual([
    { file: { name: 'fair-point.png', type: 'image/png', hash: originalHash } },
  ])
  await page.getByRole('button', { name: 'Copy link', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Page link copied.')
  expect(await page.evaluate(() => (window as unknown as ShareWindow).copiedLink)).toBe(page.url())
  await page.getByRole('button', { name: 'Copy image', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Image copied. Paste it into your chat.')
  expect(await page.evaluate(() => (window as unknown as ShareWindow).copiedImage)).toEqual({
    hash: originalHash,
    type: 'image/png',
    activation: true,
    promise: true,
  })
  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Save image', exact: true }).click()
  const download = await downloadEvent
  expect(download.suggestedFilename()).toBe('fair-point.png')
  const path = await download.path()
  expect(createHash('sha256').update(readFileSync(path!)).digest('hex')).toBe(originalHash)
  await expect(page.getByRole('status')).not.toHaveText(/saved/i)
})

test('missing APIs expose a selectable link and honest image fallback', async ({ page }) => {
  await mockSharing(page, 'unavailable')
  await openMeme(page)
  await page.getByRole('button', { name: 'Copy link', exact: true }).click()
  const input = page.getByRole('textbox', { name: 'Page link to copy manually' })
  await expect(input).toHaveValue(page.url())
  await expect(input).toBeFocused()
  expect(await input.evaluate((node) => (node as HTMLInputElement).selectionEnd)).toBe(
    page.url().length,
  )
  await page.getByRole('button', { name: 'Copy image', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Image copy is unavailable')
  await page.getByRole('button', { name: 'Share meme', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Device sharing is unavailable')
})

test('permission failures never claim success', async ({ page }) => {
  await mockSharing(page, 'rejected')
  await openMeme(page)
  for (const [button, message] of [
    ['Copy link', 'The browser could not copy the link'],
    ['Copy image', 'The browser could not copy this image'],
    ['Share meme', 'The browser could not open sharing'],
  ] as const) {
    await page.getByRole('button', { name: button, exact: true }).click()
    await expect(page.getByRole('status')).toContainText(message)
  }
  expect(await page.evaluate(() => (window as unknown as ShareWindow).shareCalls)).toEqual([])
})

test('canceling the native share sheet performs no fallback action', async ({ page }) => {
  await mockSharing(page, 'canceled')
  await openMeme(page)
  await page.getByRole('button', { name: 'Share meme', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Sharing canceled')
  await expect(page.getByRole('textbox', { name: 'Page link to copy manually' })).toHaveCount(0)
  expect(await page.evaluate(() => (window as unknown as ShareWindow).copiedLink)).toBe('')
  await expect(page.getByRole('button', { name: 'Share meme', exact: true })).toBeEnabled()
})

test('file-share fallback explicitly offers a separate page-sharing tap', async ({ page }) => {
  await mockSharing(page, 'link-only')
  await openMeme(page)
  await page.getByRole('button', { name: 'Share meme', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('cannot share image files')
  expect(await page.evaluate(() => (window as unknown as ShareWindow).shareCalls)).toEqual([])
  await page.getByRole('button', { name: 'Share page', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Page link handed')
  expect(await page.evaluate(() => (window as unknown as ShareWindow).shareCalls)).toEqual([
    { url: page.url() },
  ])
})

test('failed original fetch offers page sharing without pretending to share an image', async ({
  page,
}) => {
  await mockSharing(page, 'supported')
  await page.route('**/memes/fair-point.png', (route) =>
    route.fulfill({ status: 404, body: 'Missing' }),
  )
  await page.goto(route('/memes/fair-point/'))
  await expect(page.locator('.meme-share')).toHaveAttribute('data-original-state', 'failed')
  await page.getByRole('button', { name: 'Share meme', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('could not be prepared')
  expect(await page.evaluate(() => (window as unknown as ShareWindow).shareCalls)).toEqual([])
  await page.getByRole('button', { name: 'Copy image', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('could not copy this image')
})

test('pending native sharing prevents duplicate requests and recovers afterward', async ({
  page,
}) => {
  await mockSharing(page, 'pending')
  await openMeme(page)
  const button = page.getByRole('button', { name: 'Share meme', exact: true })
  await button.click()
  await expect(button).toBeDisabled()
  await button.evaluate((node) => (node as HTMLButtonElement).click())
  await expect
    .poll(() => page.evaluate(() => (window as unknown as ShareWindow).shareCalls.length))
    .toBe(1)
  await page.evaluate(() => (window as unknown as ShareWindow).finishShare())
  await expect(button).toBeEnabled()
})

test('cold image fetch preserves clipboard activation and asks for a second share tap', async ({
  page,
}) => {
  await mockSharing(page, 'supported')
  let release!: () => void
  const held = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route('**/memes/fair-point.png', async (route) => {
    await held
    await route.continue()
  })
  await page.goto(route('/memes/fair-point/'))
  await expect(page.locator('.meme-share')).toHaveAttribute('data-original-state', 'loading')
  await page.getByRole('button', { name: 'Share meme', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Tap Share meme again')
  expect(await page.evaluate(() => (window as unknown as ShareWindow).shareCalls)).toEqual([])
  await page.getByRole('button', { name: 'Copy image', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Copy image', exact: true })).toBeDisabled()
  release()
  await expect(page.getByRole('status')).toHaveText('Image copied. Paste it into your chat.')
  expect(await page.evaluate(() => (window as unknown as ShareWindow).copiedImage)).toEqual({
    hash: originalHash,
    type: 'image/png',
    activation: true,
    promise: true,
  })
})
