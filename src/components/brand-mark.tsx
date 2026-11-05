/**
 * A drawn mark, not typeset text: clipped varsity letterforms, orange stops,
 * and a tusked hog crest. The containing link supplies its accessible name.
 */
export function BrandMark() {
  return (
    <span className="brand-lockup" aria-hidden="true">
      <svg className="brand-crest" viewBox="0 0 64 68" focusable="false">
        <path className="crest-field" d="M4 5 32 1l28 4v31c0 14-14 25-28 31C18 61 4 50 4 36Z" />
        <path className="crest-border" d="m8 9 24-4 24 4v27c0 11-11 21-24 27C19 57 8 47 8 36Z" />
        <path className="crest-hog" d="m16 26-4-13 14 6 6-8 6 8 14-6-4 13 3 10-9 16H22L13 36Z" />
        <path className="crest-brow" d="m20 28 7 3m17-3-7 3" />
        <path
          className="crest-tusk"
          d="M22 43c-8 0-10-7-8-13 1 6 5 7 10 7Zm20 0c8 0 10-7 8-13-1 6-5 7-10 7Z"
        />
        <path className="crest-snout" d="m24 35 8-2 8 2 2 9-6 5h-8l-6-5Z" />
        <path className="crest-nostrils" d="M28 39v4m8-4v4" />
      </svg>
      <span className="brand-lettering">
        <svg className="brand-letters" viewBox="0 0 252 48" focusable="false">
          <path d="M8 0h28l8 8v9H30v-5H14v24h16v-5h14v9l-8 8H8l-8-8V8Z" />
          <path d="M64 0h14v17h16V0h14v48H94V30H78v18H64Z" />
          <path
            fillRule="evenodd"
            d="m125 48 11-48h25l11 48h-14l-2-11h-15l-2 11Zm19-23h10l-5-17Z"
          />
          <path d="M187 0h46v13h-16v35h-14V13h-16Z" />
          <path
            className="brand-stops"
            d="m49 39 5-5 5 5-5 5Zm64 0 5-5 5 5-5 5Zm64 0 5-5 5 5-5 5Zm65 0 5-5 5 5-5 5Z"
          />
        </svg>
        <span className="brand-descriptor">THE HOG ARCHIVE</span>
      </span>
    </span>
  )
}
