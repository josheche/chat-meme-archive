import { memes, people, type Meme } from '@/data/archive'

export function filterMemes(items: Meme[], query: string, person: string, order: string): Meme[] {
  const needle = query.trim().toLowerCase()
  return items
    .filter((meme) => {
      const matchesPerson = !person || [...meme.depicted, ...meme.referenced].includes(person)
      const haystack = [
        meme.title,
        meme.subtitle,
        meme.story,
        meme.format,
        ...meme.depicted,
        ...meme.referenced,
        meme.creator,
        meme.requester,
        ...people
          .filter((person) => [...meme.depicted, ...meme.referenced].includes(person.slug))
          .map((person) => person.name),
      ]
        .join(' ')
        .toLowerCase()
      return matchesPerson && haystack.includes(needle)
    })
    .sort((a, b) =>
      order === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
    )
}

export function findMeme(slug: string): Meme | undefined {
  return memes.find((meme) => meme.slug === slug)
}

export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`
}
