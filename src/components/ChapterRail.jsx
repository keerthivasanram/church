import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import './ChapterRail.css'

/**
 * THE CHAPTER RAIL — where you are in the pilgrimage.
 *
 * The home page is told in numbered chapters, but nothing ever said which one
 * you were standing in. A thin gilded thread in the margin fills as you descend
 * and lights the current chapter's numeral.
 *
 * Chapters are read from the DOM (`[data-chapter]`) rather than hard-coded, so
 * adding or removing a hall cannot leave the rail out of step. An
 * IntersectionObserver marks the active one — no per-frame position reads.
 *
 * Portalled to <body> for the same reason as Cinema: the route-transition
 * wrapper animates `filter`, which would otherwise become this rail's
 * containing block and pin it to the document instead of the viewport.
 */
function ChapterRail() {
  const [chapters, setChapters] = useState([])
  const [active, setActive] = useState(0)
  // the rail stays out of the way until the hero is behind you
  const [entered, setEntered] = useState(false)
  const reduce = useReducedMotion()
  const railRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 })

  useEffect(() => {
    const nodes = [...document.querySelectorAll('[data-chapter]')]
    setChapters(nodes.map((n) => ({ numeral: n.dataset.chapter, label: n.dataset.chapterLabel || '' })))
    if (!nodes.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          setActive(nodes.indexOf(e.target))
          setEntered(true)
        })
      },
      /* A narrow band high in the viewport, not at its middle. With a
         mid-viewport band the final hall never activates — the footer occupies
         the lower page by the time it would cross, so the rail was stranded on
         chapter VI at the bottom of the document. Reading the band near the top
         means a hall becomes current as you enter it, and the last one still
         registers before the page runs out. */
      { rootMargin: '-24% 0px -72% 0px', threshold: 0 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  if (!chapters.length || typeof document === 'undefined') return null

  return createPortal(
    <nav className={`crail${entered ? ' is-visible' : ''}`} ref={railRef} aria-label="Chapters">
      <span className="crail__thread" aria-hidden="true">
        {!reduce && <motion.span className="crail__thread-fill" style={{ scaleY: fill }} />}
      </span>

      <ol className="crail__list">
        {chapters.map((c, i) => (
          <li
            key={c.numeral + i}
            className={`crail__item${i === active ? ' is-active' : ''}`}
          >
            <span className="crail__numeral">{c.numeral}</span>
            <span className="crail__label">{c.label}</span>
          </li>
        ))}
      </ol>
    </nav>,
    document.body,
  )
}

export default ChapterRail
