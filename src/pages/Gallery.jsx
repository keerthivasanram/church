import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { galleryImages } from '../data/gallery'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import Reveal from '../components/motion/Reveal'
import Ornament from '../components/motion/Ornament'
import './Gallery.css'

function Gallery() {
  const [index, setIndex] = useState(null)
  const reduce = useReducedMotion()
  const open = index !== null
  const current = open ? galleryImages[index] : null

  const close = useCallback(() => setIndex(null), [])
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % galleryImages.length)),
    [],
  )
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length)),
    [],
  )

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, next, prev])

  return (
    <>
      <Helmet>
        <title>Gallery | End Time Prophetic Ministries</title>
        <meta name="description" content="View moments of worship, healing, and ministry at End Time Prophetic Ministries." />
        <meta property="og:title" content="Gallery | End Time Prophetic Ministries" />
        <meta property="og:description" content="View moments of worship, healing, and ministry at End Time Prophetic Ministries." />
      </Helmet>

      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow--center">Gallery</span>
            <h1>Moments of Worship &amp; Ministry</h1>
            <Ornament center />
            <div className="page-hero__bg-text" aria-hidden="true">Gallery</div>
          </Reveal>
        </div>
      </section>

      <section className="gal-hall">
        <div className="gal-hall__inner">
          <div className="gal-ledger">
            <span>The Wall</span>
            <span className="gal-ledger__rule" aria-hidden="true" />
            <span className="gal-ledger__count">
              {String(galleryImages.length).padStart(2, '0')} Photographs
            </span>
          </div>

          <Stagger className="gal-wall">
            {galleryImages.map((img, i) => (
              <StaggerItem key={img.id} className="gal-cell">
                <button
                  className="gal-frame"
                  onClick={() => setIndex(i)}
                  aria-label={`Open photograph ${i + 1} of ${galleryImages.length}`}
                >
                  <img src={img.thumb} alt={`Ministry photograph ${i + 1}`} loading="lazy" />
                  <span className="gal-frame__wash" aria-hidden="true" />
                  <span className="gal-frame__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="gal-frame__view" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                    </svg>
                    View
                  </span>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lightbox"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button className="lightbox__close" aria-label="Close" onClick={close}>&times;</button>
            <button
              className="lightbox__nav lightbox__nav--prev"
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); prev() }}
            >‹</button>

            <motion.img
              key={current.id}
              src={current.full}
              alt={`Ministry photo ${current.id}`}
              onClick={(e) => e.stopPropagation()}
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />

            <button
              className="lightbox__nav lightbox__nav--next"
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); next() }}
            >›</button>
            <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
              <span><b>{String(index + 1).padStart(2, '0')}</b> / {String(galleryImages.length).padStart(2, '0')}</span>
              <span className="lightbox__rail" aria-hidden="true">
                <span style={{ width: `${((index + 1) / galleryImages.length) * 100}%` }} />
              </span>
              <span className="lightbox__hint">← → to move · Esc to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery
