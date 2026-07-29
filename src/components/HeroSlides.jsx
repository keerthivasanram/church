import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { heroSlides } from '../data/heroSlides'
import './HeroSlides.css'

/** how long a plate is held before the next one is dealt */
const DWELL = 7000

/**
 * The nave's own light source — the hero's full-screen plate is no longer one
 * photograph but five, dealt slowly and graded far down so the type, the
 * messenger and the buttons always keep the light.
 *
 * State lives here and is handed to both halves: the plates (inside the
 * parallaxing background layer) and the rail (out on the ledger).
 */
export function useHeroSlides() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [held, setHeld] = useState(false)

  const count = heroSlides.length
  const go = useCallback((n) => setIndex(((n % count) + count) % count), [count])

  const running = !reduce && !held
  useEffect(() => {
    if (!running) return undefined
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), DWELL)
    return () => clearTimeout(t)
  }, [running, index, count])

  return { index, go, running, count, hold: setHeld }
}

/** the plates themselves — dropped inside .chero__bg so they inherit its
    scroll zoom and pointer parallax rather than fighting them */
export function HeroSlidePlates({ index }) {
  return (
    <>
      {heroSlides.map((s, i) => (
        <img
          key={s.src}
          className={`chero__plate${i === index ? ' is-lit' : ''}`}
          src={s.src}
          alt=""
          style={{ objectPosition: s.focus, '--plate-dim': s.dim }}
          loading="eager"
          fetchPriority={i === 0 ? 'high' : 'low'}
          decoding="async"
          draggable="false"
        />
      ))}
    </>
  )
}

/** the rail — set on the right end of the hero's ledger, opposite the figures */
export function HeroSlideRail({ index, go, running, count, hold }) {
  const active = heroSlides[index]

  function onKeyDown(e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
  }

  return (
    <div
      className="hrail"
      role="group"
      aria-roledescription="carousel"
      aria-label="Photographs from the meetings"
      onMouseEnter={() => hold(true)}
      onMouseLeave={() => hold(false)}
      onFocusCapture={() => hold(true)}
      onBlurCapture={() => hold(false)}
      onKeyDown={onKeyDown}
    >
      <span className="hrail__caption" aria-live="polite">
        <em className="hrail__numeral" aria-hidden="true">{active.numeral}</em>
        <span className="hrail__title">{active.title}</span>
      </span>

      <button
        type="button"
        className="hrail__arrow"
        aria-label="Previous photograph"
        onClick={() => go(index - 1)}
      >
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="hrail__ticks">
        {heroSlides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={`hrail__tick${i === index ? ' is-on' : ''}`}
            aria-current={i === index}
            aria-label={`${s.title} — ${s.caption} (${i + 1} of ${count})`}
            onClick={() => go(i)}
          >
            <i className={i === index && running ? 'is-running' : undefined} style={{ animationDuration: `${DWELL}ms` }} />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="hrail__arrow"
        aria-label="Next photograph"
        onClick={() => go(index + 1)}
      >
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
