'use client'

import { useState } from 'react'
import { memes, people } from '@/data/archive'
import { filterMemes } from '@/lib/archive'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { MemeCard } from './meme-card'

export function ArchiveGallery() {
  const [query, setQuery] = useState('')
  const [person, setPerson] = useState('')
  const [order, setOrder] = useState('newest')
  const visible = filterMemes(memes, query, person, order)
  function reset() {
    setQuery('')
    setPerson('')
    setOrder('newest')
  }
  return (
    <section id="collection" className="collection">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE COLLECTION</p>
          <h2>Every bit has a backstory.</h2>
        </div>
        <Badge variant="outline" className="collection-count">
          {memes.length} CATALOGUED / MORE TO COME
        </Badge>
      </div>
      <div className="filters">
        <label className="search-label">
          <span className="sr-only">Search the archive</span>
          <span aria-hidden="true">⌕</span>
          <Input
            type="search"
            placeholder="Search the archive, a person, a bit…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Filter by person</span>
          <select value={person} onChange={(e) => setPerson(e.target.value)}>
            <option value="">All people</option>
            {people
              .filter((p) => p.slug !== 'dot')
              .map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
          </select>
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
          <h3>No bit left behind. Just not found.</h3>
          <p>Try another name or clear the filters.</p>
          <Button onClick={reset}>Clear filters</Button>
        </div>
      )}
      <aside className="archive-note">
        <span aria-hidden="true">↳</span>
        <div>
          <strong>An archive in progress.</strong>
          <p>
            This first collection contains seven verified remixes from November 4. Older images,
            variants and other people’s creations are still being catalogued. This is not yet every
            meme.
          </p>
        </div>
      </aside>
    </section>
  )
}
