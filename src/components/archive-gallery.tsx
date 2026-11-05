'use client'

import { useState } from 'react'
import { memes } from '@/data/archive'
import { filterMemes } from '@/lib/archive'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { MemeCard } from './meme-card'

export function ArchiveGallery() {
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState('newest')
  const visible = filterMemes(memes, query, order)
  function reset() {
    setQuery('')
    setOrder('newest')
  }
  return (
    <section id="collection" className="collection">
      <div className="section-heading">
        <div>
          <p className="eyebrow">FRESH FROM THE GROUP CHAT</p>
          <h2>The hog vault.</h2>
        </div>
        <Badge variant="outline" className="collection-count">
          {String(memes.length).padStart(2, '0')} MEMES / ZERO CHILL
        </Badge>
      </div>
      <div className="filters">
        <label className="search-label">
          <span className="sr-only">Search the archive</span>
          <span aria-hidden="true">⌕</span>
          <Input
            type="search"
            placeholder="Find a meme, a name, a bit…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Sort memes</span>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>
      <p className="result-count" role="status">
        Showing {visible.length} of {memes.length} memes
      </p>
      {visible.length ? (
        <div className="meme-grid">
          {visible.map((meme, index) => (
            <MemeCard key={meme.slug} meme={meme} index={index} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-hog" aria-hidden="true">
            🐖
          </span>
          <h3>This pen is empty.</h3>
          <p>Try another name or clear the filters.</p>
          <Button onClick={reset}>Clear filters</Button>
        </div>
      )}
      <aside className="archive-note">
        <span aria-hidden="true">🦔</span>
        <div>
          <strong>An archive in progress.</strong>
          <p>
            This collection contains {memes.length} images. Older works and other group creations
            are still being recovered. Dates describe creation, delivery, upload or observation, as
            labeled. This is not yet every meme.
          </p>
        </div>
      </aside>
    </section>
  )
}
