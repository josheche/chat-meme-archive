import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArchiveGallery } from '@/components/archive-gallery'
import { assetPath } from '@/lib/archive'

export default function Home() {
  return (
    <main id="main" className="shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> THE GROUP CHAT, PRESERVED.
          </p>
          <h1>
            The bits. <br />
            The people. <br />
            <em>The lore.</em>
          </h1>
          <p className="hero-description">
            Some jokes deserve to live longer than the scroll. Welcome to the unofficial museum of
            C.H.A.T.
          </p>
          <a className="text-link" href="#collection">
            Enter the archive <span aria-hidden="true">↓</span>
          </a>
          <div className="hero-stats">
            <div>
              <strong>07</strong>
              <span>MEMES CATALOGUED</span>
            </div>
            <div>
              <strong>03</strong>
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
            <span>FROM THE COLLECTION</span>
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
            <p>Fat Brolley · Adapted by dot for Josh</p>
          </div>
        </Link>
      </section>
      <div className="ticker" aria-label="Archive themes">
        <span>ADMIN LORE</span>
        <b>✳</b>
        <span>GOOD MARKET BRO</span>
        <b>✳</b>
        <span>ONE QUICK CORRECTION</span>
        <b>✳</b>
        <span>LOVE CHAT</span>
        <b>✳</b>
      </div>
      <ArchiveGallery />
      <section className="lore-banner">
        <div>
          <p className="eyebrow">NEW HERE?</p>
          <h2>
            There is, unfortunately,
            <br />
            <em>context.</em>
          </h2>
        </div>
        <div>
          <p>
            Meet the recurring characters and trace the bits from admin drama to the C.H.A.T.
            Supreme Court.
          </p>
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
