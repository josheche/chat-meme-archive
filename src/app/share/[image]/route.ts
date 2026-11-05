import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { memes } from '@/data/archive'
import { ShareCard } from '@/components/share-card'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return memes.map(({ slug }) => ({ image: `${slug}.png` }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params
  const meme = memes.find(({ slug }) => `${slug}.png` === image)
  if (!meme) return new Response(null, { status: 404 })

  const [original, font] = await Promise.all([
    readFile(join(process.cwd(), 'public', meme.originalImage)),
    readFile(join(process.cwd(), 'src/assets/fonts/Anton-Regular.ttf')),
  ])
  const mime = meme.originalImage.endsWith('.png') ? 'image/png' : 'image/jpeg'
  const dataUrl = `data:${mime};base64,${original.toString('base64')}`

  return new ImageResponse(ShareCard({ meme, dataUrl }), {
    width: 1200,
    height: 630,
    headers: { 'Cache-Control': 'public, max-age=600' },
    fonts: [{ name: 'Anton', data: font, style: 'normal', weight: 400 }],
  })
}
