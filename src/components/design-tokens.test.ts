import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8')
function tokens(selector: string) {
  const block = css.split(`${selector} {`)[1]?.split('}')[0]
  if (!block) throw new Error(`Missing theme block: ${selector}`)
  return Object.fromEntries(
    [...block.matchAll(/--([\w-]+): (#[0-9a-f]{6});/g)].map((m) => [m[1], m[2]]),
  )
}
function luminance(hex: string) {
  function channel(offset: number) {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5)
}
function contrast(a: string, b: string) {
  const first = luminance(a)
  const second = luminance(b)
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
}
const light = tokens(':root')
const themes = { light, dark: { ...light, ...tokens(":root[data-theme='dark']") } }
for (const [mode, theme] of Object.entries(themes)) {
  describe(`${mode} color tokens`, () => {
    for (const [foreground, background] of [
      ['foreground', 'background'],
      ['card-foreground', 'card'],
      ['primary-foreground', 'primary'],
      ['secondary-foreground', 'secondary'],
      ['muted-foreground', 'background'],
      ['muted-foreground', 'card'],
      ['muted-foreground', 'muted'],
      ['accent-foreground', 'accent'],
      ['masthead-foreground', 'masthead'],
    ] as const) {
      it(`${foreground} on ${background} meets WCAG AA for normal text`, () => {
        expect(contrast(theme[foreground], theme[background])).toBeGreaterThanOrEqual(4.5)
      })
    }
    it('input boundary and focus indicator meet non-text contrast', () => {
      expect(contrast(theme.input, theme.card)).toBeGreaterThanOrEqual(3)
      expect(contrast(theme.ring, theme.background)).toBeGreaterThanOrEqual(3)
    })
  })
}
