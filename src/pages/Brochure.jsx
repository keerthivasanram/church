import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { brochurePosters } from '../data/brochure'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import Reveal from '../components/motion/Reveal'
import Ornament from '../components/motion/Ornament'
import HeroLogo from '../components/HeroLogo'
import './Brochure.css'

function Brochure() {
  const [index, setIndex] = useState(null)
  const reduce = useReducedMotion()
  const open = index !== null
  const current = open ? brochurePosters[index] : null

  const close = useCallback(() => setIndex(null), [])
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % brochurePosters.length)),
    [],
  )
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + brochurePosters.length) % brochurePosters.length)),
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
        <title>Ministry Brochure &amp; Posters | End Time Prophetic Ministries</title>
        <meta name="description" content="Explore official ministry brochures, crusade posters, and publication materials for End Time Prophetic Ministries." />
        <meta property="og:title" content="Ministry Brochure & Posters | End Time Prophetic Ministries" />
        <meta property="og:description" content="Explore official ministry brochures, crusade posters, and publication materials." />
      </Helmet>

      <section className="page-hero">
        <HeroLogo />
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow--center">Official Publications</span>
            <h1>Ministry Brochure &amp; Crusade Posters</h1>
            <Ornament center />
            <div className="page-hero__bg-text" aria-hidden="true">Brochure</div>
          </Reveal>
        </div>
      </section>

      <section className="brochure-hall">
        <div className="container">
          <div className="brochure-ledger">
            <div className="brochure-ledger__left">
              <span>Publications &amp; Posters</span>
              <span className="brochure-ledger__rule" aria-hidden="true" />
              <span className="brochure-ledger__count">
                {String(brochurePosters.length).padStart(2, '0')} Document Flyers
              </span>
            </div>
            <Link to="/#mission" className="btn btn-outline brochure-back-btn">
              &larr; Back to Mission
            </Link>
          </div>

          <Stagger className="brochure-grid">
            {brochurePosters.map((poster, i) => (
              <StaggerItem key={poster.id} className="brochure-card-wrapper">
                <div className="brochure-card">
                  <button
                    className="brochure-frame"
                    onClick={() => setIndex(i)}
                    aria-label={`View flyer: ${poster.title}`}
                  >
                    <img src={poster.src} alt={poster.title} loading="lazy" />
                    <span className="brochure-frame__wash" aria-hidden="true" />
                    <span className="brochure-frame__view">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                      </svg>
                      Enlarge Poster
                    </span>
                  </button>
                  <div className="brochure-card__info">
                    <span className="brochure-card__tag">{poster.tag}</span>
                    <h3 className="brochure-card__title">{poster.title}</h3>
                    <a
                      href={poster.src}
                      download={`ministry-brochure-${i + 1}.jpeg`}
                      className="brochure-card__download"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Download Image
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="brochure-lightbox"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Poster Lightbox Viewer"
          >
            <button
              className="brochure-lightbox__close"
              onClick={close}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            <button
              className="brochure-lightbox__nav brochure-lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous flyer"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" />
              </svg>
            </button>

            <motion.div
              className="brochure-lightbox__stage"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            >
              <img src={current.src} alt={current.title} />
              <div className="brochure-lightbox__caption">
                <div>
                  <span className="brochure-lightbox__tag">{current.tag}</span>
                  <h3>{current.title}</h3>
                </div>
                <div className="brochure-lightbox__actions">
                  <a
                    href={current.src}
                    download={`ministry-brochure-${index + 1}.jpeg`}
                    className="btn btn-outline brochure-lightbox__dl"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download Poster
                  </a>
                  <span className="brochure-lightbox__counter">
                    {index + 1} / {brochurePosters.length}
                  </span>
                </div>
              </div>
            </motion.div>

            <button
              className="brochure-lightbox__nav brochure-lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next flyer"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Brochure
