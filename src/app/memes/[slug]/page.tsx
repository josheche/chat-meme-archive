import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { memes, lore } from '@/data/archive'
import { findMeme, assetPath } from '@/lib/archive'
import { MemeCard } from '@/components/meme-card'
import { Button } from '@/components/ui/button'
import { memeShareMetadata } from '@/lib/share-metadata'

export const dynamicParams = false
export function generateStaticParams() {
  return memes.map(({ slug }) => ({ slug }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meme = findMeme(slug)
  if (!meme) notFound()
  return memeShareMetadata(meme)
}
export default async function MemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meme = findMeme(slug)
  if (!meme) notFound()
  const related = memes
    .filter((m) => m.slug !== slug && m.lore?.some((l) => meme.lore?.includes(l)))
    .slice(0, 2)
  return (
    <main id="main" className="shell detail-page">
      <Link className="back-link" href="/">
        ← All memes
      </Link>
      <header className="detail-heading">
        <p className="eyebrow">
          THE COLLECTION / {String(memes.indexOf(meme) + 1).padStart(3, '0')}
        </p>
        <h1>{meme.title}</h1>
        {meme.subtitle && <p>{meme.subtitle}</p>}
      </header>
      <div className="detail-layout">
        <div className="detail-art">
          <Image
            src={assetPath(meme.image)}
            alt={meme.alt}
            width={meme.width}
            height={meme.height}
            unoptimized
            priority
          />
          <Button variant="outline" asChild className="original-button">
            <a href={assetPath(meme.originalImage)} target="_blank" rel="noreferrer">
              {meme.originalImageLabel ?? 'Open full-resolution image'} ↗
            </a>
          </Button>
        </div>
        <div className="detail-copy">
          {meme.story && (
            <section>
              <p className="eyebrow">THE BACKSTORY</p>
              <h2>For the record.</h2>
              <p>{meme.story}</p>
            </section>
          )}
          <dl className="credits">
            {meme.depicted.length > 0 && (
              <div>
                <dt>Depicted</dt>
                <dd>{meme.depicted.join(', ')}</dd>
              </div>
            )}
            {meme.referenced.length > 0 && (
              <div>
                <dt>Also referenced</dt>
                <dd>{meme.referenced.join(', ')}</dd>
              </div>
            )}
            <div>
              <dt>Archive date</dt>
              <dd>
                {meme.dateLabel}
                {(meme.dateBasis === 'observed' || meme.dateBasis === 'uploaded') && (
                  <span>Creation date is unknown.</span>
                )}
                <span>First use in the group is unknown.</span>
              </dd>
            </div>
            {meme.format && (
              <div>
                <dt>Adapted format</dt>
                <dd>
                  {meme.formatUrl ? (
                    <a href={meme.formatUrl} target="_blank" rel="noreferrer">
                      {meme.format} ↗
                    </a>
                  ) : (
                    meme.format
                  )}
                  <span>Original format creator not verified.</span>
                </dd>
              </div>
            )}
          </dl>
          {meme.lore && meme.lore.length > 0 && (
            <section className="related-lore">
              <p className="eyebrow">PART OF THE STORY</p>
              {meme.lore.map((id) => (
                <Link key={id} href={`/lore/${id}/`}>
                  {lore.find((l) => l.slug === id)?.title}
                  <span>↗</span>
                </Link>
              ))}
            </section>
          )}
        </div>
      </div>
      {related.length > 0 && (
        <section className="related-section">
          <h2>Same universe. More nonsense.</h2>
          <div className="meme-grid related-grid">
            {related.map((m) => (
              <MemeCard key={m.slug} meme={m} index={memes.indexOf(m)} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
