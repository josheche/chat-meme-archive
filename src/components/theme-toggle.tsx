'use client'

import { useSyncExternalStore } from 'react'

const storageKey = 'chat-archive-theme'
const changeEvent = 'chat-archive-theme-change'

function currentTheme() {
  return document.documentElement.dataset.theme === 'dark'
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  function sync() {
    let saved: string | null = null
    try {
      saved = localStorage.getItem(storageKey)
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
    document.documentElement.dataset.theme =
      saved === 'dark' || saved === 'light' ? saved : media.matches ? 'dark' : 'light'
    onChange()
  }
  window.addEventListener(changeEvent, onChange)
  window.addEventListener('storage', sync)
  media.addEventListener('change', sync)
  return () => {
    window.removeEventListener(changeEvent, onChange)
    window.removeEventListener('storage', sync)
    media.removeEventListener('change', sync)
  }
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, currentTheme, () => false)
  function toggle() {
    const next = currentTheme() ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(storageKey, next)
    } catch {
      // In-memory preference remains usable for this page.
    }
    window.dispatchEvent(new Event(changeEvent))
  }
  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-label="Dark mode"
      aria-checked={dark}
      onClick={toggle}
    >
      <svg className="theme-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg className="theme-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 14.2A8.8 8.8 0 0 1 9.8 3.5a8.8 8.8 0 1 0 10.7 10.7Z" />
      </svg>
      <span className="theme-light-label">Light</span>
      <span className="theme-dark-label">Dark</span>
    </button>
  )
}
