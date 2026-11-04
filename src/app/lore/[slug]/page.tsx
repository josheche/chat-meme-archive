import Link from 'next/link'
import { notFound } from 'next/navigation'
import { lore, memes } from '@/data/archive'
import { MemeCard } from '@/components/meme-card'
export const dynamicParams = false
export function generateStaticParams() {
  return lore.map(({ slug }) => ({ slug }))
}
export default async function LorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = lore.find((l) => l.slug === slug)
  if (!story) notFound()
  const linked = memes.filter((m) => m.lore.includes(slug))
  return (
    <main id="main" className="shell interior-page">
      <Link href="/lore/" className="back-link">
        ← All stories
      </Link>
      <p className="eyebrow">{story.eyebrow}</p>
      <h1>{story.title}</h1>
      <div className="story-prose">
        <p className="story-lead">{story.summary}</p>
        {story.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <p className="section-label">THE STORY IN {linked.length} MEMES</p>
      <div className="meme-grid">
        {linked.map((m) => (
          <MemeCard key={m.slug} meme={m} index={memes.indexOf(m)} />
        ))}
      </div>
    </main>
  )
}
