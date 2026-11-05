import { memes, type Meme } from '@/data/archive'

export function filterMemes(items: Meme[], query: string, order: string): Meme[] {
  const needle = query.trim().toLowerCase()
  return items
    .filter((meme) => {
      const haystack = [
        meme.title,
        meme.subtitle,
        meme.story,
        meme.alt,
        meme.format,
        ...meme.depicted,
        ...meme.referenced,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(needle)
    })
    .sort((a, b) =>
      order === 'oldest'
        ? a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug)
        : b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    )
}

export function findMeme(slug: string): Meme | undefined {
  return memes.find((meme) => meme.slug === slug)
}

export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`
}
