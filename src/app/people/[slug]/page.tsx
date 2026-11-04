import Link from 'next/link'
import { notFound } from 'next/navigation'
import { people, memes } from '@/data/archive'
import { MemeCard } from '@/components/meme-card'
export const dynamicParams = false
export function generateStaticParams() {
  return people.map(({ slug }) => ({ slug }))
}
export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const person = people.find((p) => p.slug === slug)
  if (!person) notFound()
  const linked = memes.filter((m) =>
    [...m.depicted, ...m.referenced, m.creator, m.requester].includes(slug),
  )
  return (
    <main id="main" className="shell interior-page">
      <Link href="/people/" className="back-link">
        ← All people
      </Link>
      <header className="person-heading">
        <span className="person-avatar">{person.initials}</span>
        <div>
          <p className="eyebrow">{person.role}</p>
          <h1>{person.name}</h1>
        </div>
      </header>
      <p className="page-intro">{person.description}</p>
      <p className="section-label">{linked.length} LINKED MEMES · SUBJECT, REFERENCE OR CREDIT</p>
      <div className="meme-grid">
        {linked.map((m) => (
          <MemeCard key={m.slug} meme={m} index={memes.indexOf(m)} />
        ))}
      </div>
    </main>
  )
}
