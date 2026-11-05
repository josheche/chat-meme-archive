import type { Meme } from '@/data/archive'

export function ShareCard({ meme, dataUrl }: { meme: Meme; dataUrl: string }) {
  const scale = Math.min(1128 / meme.width, 520 / meme.height)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: '24px 36px',
        background: '#111d17',
        color: '#faf7ef',
        fontFamily: 'Anton',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: 42,
          marginBottom: 14,
          fontSize: 28,
          letterSpacing: 1,
        }}
      >
        <span>C.H.A.T. ARCHIVE</span>
        <span style={{ color: '#ff6b35' }}>HOG. HOG. HOG.</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 1128,
          height: 520,
        }}
      >
        {/* ImageResponse renders embedded bytes at build time, not a browser image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dataUrl}
          alt={meme.alt}
          width={Math.round(meme.width * scale)}
          height={Math.round(meme.height * scale)}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}
