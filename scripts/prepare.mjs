import { existsSync } from 'node:fs'

// npm sets NODE_ENV=production for --omit=dev; Husky is intentionally a dev tool.
if (process.env.NODE_ENV !== 'production' && process.env.HUSKY !== '0' && existsSync('.git')) {
  const { default: husky } = await import('husky')
  const error = husky()
  if (error) throw new Error(error)
}
