import Link from 'next/link'
import { lore, memes } from '@/data/archive'
export const metadata = { title: 'The lore' }
export default function LorePage() {
  return (
    <main id="main" className="shell interior-page">
      <p className="eyebrow">AN ENTIRELY UNNECESSARY FIELD GUIDE</p>
      <h1>
        There is
        <br />
        <em>context.</em>
      </h1>
      <p className="page-intro">
        A guide to the recurring bits in this collection. Comic lore, not anyone’s biography.
      </p>
      <div className="lore-list">
        {lore.map((story, index) => (
          <Link className="lore-card" href={`/lore/${story.slug}/`} key={story.slug}>
            <span className="lore-number">0{index + 1}</span>
            <div>
              <p className="eyebrow">{story.eyebrow}</p>
              <h2>{story.title}</h2>
              <p>{story.summary}</p>
              <span className="lore-count">
                {memes.filter((m) => m.lore.includes(story.slug)).length} MEMES IN THIS STORY
              </span>
            </div>
            <span className="lore-arrow">↗</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
