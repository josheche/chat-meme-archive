import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArchiveGallery } from '@/components/archive-gallery'
import { assetPath } from '@/lib/archive'
import { lore, memes } from '@/data/archive'
import { homeShareMetadata } from '@/lib/share-metadata'

export const metadata = homeShareMetadata()

export default function Home() {
  return (
    <main id="main" className="shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> C.H.A.T. CULTURAL PRESERVATION DEPT.
          </p>
          <h1 className="hog-title" aria-label="HOG HOG HOG">
            <span>HOG.</span>
            <span>HOG.</span>
            <span>HOG.</span>
          </h1>
          <div className="hero-tagline">
            <span aria-hidden="true">🐗 🦔 🐖</span> STILL CRANKING. NOW ARCHIVED.
          </div>
          <p className="hero-description">
            The bits. The memes. The deeply unnecessary lore. A permanent home for the group chat’s
            finest nonsense.
          </p>
          <a className="text-link" href="#collection">
            Into the hog pen <span aria-hidden="true">↓</span>
          </a>
          <div className="hero-stats">
            <div>
              <strong>{String(memes.length).padStart(2, '0')}</strong>
              <span>MEMES CATALOGUED</span>
            </div>
            <div>
              <strong>{String(lore.length).padStart(2, '0')}</strong>
              <span>RUNNING STORIES</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>UNNECESSARY REPLIES</span>
            </div>
          </div>
        </div>
        <Link href="/memes/peace-in-chat/" className="feature">
          <div className="feature-ribbon">
            <span>🐗 FROM THE HOG VAULT</span>
            <span>↗</span>
          </div>
          <Image
            src={assetPath('/memes/peace-in-chat.webp')}
            width={1254}
            height={1254}
            alt="The corrected two-panel Fat Brolley Anakin meme: I have brought peace to C.H.A.T."
            priority
            unoptimized
          />
          <div className="feature-caption">
            <span>001 / THE ADMIN SAGA</span>
            <h2>Peace was never simple.</h2>
            <p>Chris</p>
          </div>
        </Link>
      </section>
      <div className="ticker" aria-label="Archive themes">
        <span>HOG HOG HOG</span>
        <b aria-hidden="true">🐗</b>
        <span>GOOD MARKET BRO</span>
        <b aria-hidden="true">🦔</b>
        <span>LOVE CHAT</span>
        <b aria-hidden="true">🐖</b>
        <span>HOG HOG HOG</span>
        <b aria-hidden="true">🐗</b>
      </div>
      <ArchiveGallery />
      <section className="lore-banner">
        <div>
          <p className="eyebrow">DEEP IN THE HOG LORE</p>
          <h2>
            There is, unfortunately,
            <br />
            <em>context.</em>
          </h2>
        </div>
        <div>
          <p>Trace the running jokes from admin drama to the C.H.A.T. Supreme Court.</p>
          <Button asChild>
            <Link href="/lore/">
              Read the lore <span aria-hidden="true">↗</span>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
