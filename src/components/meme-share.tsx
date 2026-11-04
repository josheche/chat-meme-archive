'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { assetPath } from '@/lib/archive'
import { fetchPng, shareData } from '@/lib/sharing'

export function MemeShare({
  title,
  slug,
  originalImage,
}: {
  title: string
  slug: string
  originalImage: string
}) {
  const originalUrl = assetPath(originalImage)
  const pagePath = assetPath(`/memes/${slug}/`)
  const file = useRef<File | null>(null)
  const working = useRef(false)
  const manualLink = useRef<HTMLInputElement>(null)
  const [imageState, setImageState] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [fallbackUrl, setFallbackUrl] = useState('')
  const [shareLink, setShareLink] = useState(false)

  useEffect(() => {
    let active = true
    // Prepare before the tap: awaiting a fetch can lose Safari's user activation.
    fetchPng(originalUrl).then(
      (blob) => {
        if (!active) return
        file.current = new File([blob], `${slug}.png`, { type: 'image/png' })
        setImageState('ready')
      },
      () => {
        if (active) setImageState('failed')
      },
    )
    return () => {
      active = false
    }
  }, [originalUrl, slug])

  useEffect(() => {
    if (fallbackUrl) {
      manualLink.current?.focus()
      manualLink.current?.select()
    }
  }, [fallbackUrl])

  const pageUrl = () => new URL(pagePath, window.location.origin).href
  const showLink = () => {
    setFallbackUrl(pageUrl())
    manualLink.current?.focus()
    manualLink.current?.select()
  }

  async function act(action: 'share' | 'link' | 'image') {
    if (working.current) return
    working.current = true
    setBusy(true)
    setMessage('')
    try {
      if (action === 'link') {
        if (!window.isSecureContext || typeof navigator.clipboard?.writeText !== 'function') {
          showLink()
          setMessage('Select and copy the page link below. Automatic copy is unavailable here.')
          return
        }
        await navigator.clipboard.writeText(pageUrl())
        setMessage('Page link copied.')
      } else if (action === 'image') {
        if (
          !window.isSecureContext ||
          typeof navigator.clipboard?.write !== 'function' ||
          typeof ClipboardItem === 'undefined' ||
          (typeof ClipboardItem.supports === 'function' && !ClipboardItem.supports('image/png'))
        ) {
          setMessage(
            'Image copy is unavailable here. Save the PNG, or open it and touch and hold it.',
          )
          return
        }
        // Call write during the tap, passing the asynchronous PNG as a promise.
        // Awaiting the fetch first breaks clipboard user activation in Safari.
        const png = file.current ? Promise.resolve(file.current) : fetchPng(originalUrl)
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })])
        setMessage('Image copied. Paste it into your chat.')
      } else {
        if (!window.isSecureContext || typeof navigator.share !== 'function') {
          showLink()
          setMessage('Device sharing is unavailable here. Copy the link below or save the image.')
          return
        }
        if (!shareLink && imageState === 'loading') {
          setMessage('Preparing the original image. Tap Share meme again in a moment.')
          return
        }
        const data = shareData(
          shareLink ? null : file.current,
          title,
          pageUrl(),
          navigator.canShare?.bind(navigator),
        )
        if (!shareLink && !data.files) {
          setShareLink(true)
          setMessage(
            imageState === 'failed'
              ? 'The original image could not be prepared. Tap Share page to share its link instead.'
              : 'This browser cannot share image files. Tap Share page, or save the image instead.',
          )
          return
        }
        await navigator.share(data)
        setMessage(
          data.files
            ? 'Image handed to your device’s share menu.'
            : 'Page link handed to your device’s share menu. File sharing is unavailable here.',
        )
      }
    } catch (error) {
      if (action === 'share' && error instanceof DOMException && error.name === 'AbortError') {
        setMessage('Sharing canceled, or no share destination is available.')
      } else if (action === 'image') {
        setMessage(
          'The browser could not copy this image. Save it, or open it and touch and hold it.',
        )
      } else {
        showLink()
        setMessage(
          action === 'link'
            ? 'The browser could not copy the link. Select and copy it below.'
            : 'The browser could not open sharing. Copy the link below or save the image.',
        )
      }
    } finally {
      working.current = false
      setBusy(false)
    }
  }

  return (
    <section
      className="meme-share"
      aria-labelledby="share-heading"
      aria-busy={busy}
      data-original-state={imageState}
    >
      <h2 id="share-heading">Send it to the chat.</h2>
      <div className="share-actions">
        <Button type="button" onClick={() => void act('share')} disabled={busy}>
          {shareLink ? 'Share page' : 'Share meme'}
        </Button>
        <Button type="button" variant="outline" onClick={() => void act('link')} disabled={busy}>
          Copy link
        </Button>
        <Button variant="outline" asChild>
          <a href={originalUrl} download={`${slug}.png`}>
            Save image
          </a>
        </Button>
        <Button type="button" variant="outline" onClick={() => void act('image')} disabled={busy}>
          Copy image
        </Button>
      </div>
      <p className="share-help">
        Full-resolution PNG. Sharing and copying depend on your browser. If Save opens a preview,
        touch and hold the image or use its share menu to save it.
      </p>
      <p className="share-status" role="status" aria-live="polite" aria-atomic="true">
        {message}
      </p>
      {fallbackUrl && (
        <label className="share-fallback">
          Page link · touch and hold to copy
          <Input
            ref={manualLink}
            aria-label="Page link to copy manually"
            readOnly
            value={fallbackUrl}
            onFocus={(event) => event.currentTarget.select()}
          />
        </label>
      )}
    </section>
  )
}
