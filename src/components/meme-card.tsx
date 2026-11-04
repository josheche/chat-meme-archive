import Image from 'next/image'
import Link from 'next/link'
import type { Meme } from '@/data/archive'
import { assetPath } from '@/lib/archive'

export function MemeCard({ meme, index = 0 }: { meme: Meme; index?: number }) {
  return (
    <article className="meme-card">
      <Link
        href={`/memes/${meme.slug}/`}
        className="meme-image-link"
        aria-label={`View ${meme.title}`}
      >
        <Image
          src={assetPath(meme.image)}
          width={meme.width}
          height={meme.height}
          alt={meme.alt}
          unoptimized
          className="meme-thumbnail"
        />
        <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="card-open" aria-hidden="true">
          ↗
        </span>
      </Link>
      <div className="card-meta">
        <span>{meme.format}</span>
        <span>04 NOV 2026</span>
      </div>
      <h3>
        <Link href={`/memes/${meme.slug}/`}>{meme.title}</Link>
      </h3>
      <p>{meme.subtitle}</p>
      <div className="card-credit">
        Made by <Link href="/people/dot/">dot</Link>
        <span>·</span>For <Link href="/people/josh/">Josh</Link>
      </div>
    </article>
  )
}
