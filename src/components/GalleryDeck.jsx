import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Magnetic from './motion/Magnetic'
import Arrow from './Arrow'
import './GalleryDeck.css'

function GalleryDeck({ images }) {
  const [deck, setDeck] = useState(images.slice(0, 6))
  const [currentIndex, setCurrentIndex] = useState(0)
  const reduce = useReducedMotion()

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % deck.length)
  }

  function handlePrev() {
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length)
  }

  if (reduce) {
    return (
      <div className="g-deck g-deck--static">
        <div className="g-deck__grid">
          {deck.map((img) => (
            <div key={img.id} className="g-deck__card arch">
              <img src={img.thumb} alt={`Gallery photograph ${img.id}`} />
            </div>
          ))}
        </div>
        <div className="g-deck__cta">
          <Link to="/gallery" className="btn btn-ghost">
            View Full Gallery <Arrow />
          </Link>
        </div>
      </div>
    )
  }

  // Get current ordered stack (active image on top)
  const visibleCards = []
  for (let i = 0; i < 3; i++) {
    const idx = (currentIndex + i) % deck.length
    visibleCards.push({ ...deck[idx], stackIndex: i })
  }

  return (
    <div className="g-deck">
      <div className="g-deck__stage">
        <div className="g-deck__stack">
          <AnimatePresence mode="popLayout">
            {visibleCards.reverse().map((img) => {
              const i = img.stackIndex
              const isTop = i === 0

              // Stack offsets (3D depth layers behind top card)
              const yOffset = i * 16
              const scale = 1 - i * 0.06
              const rotZ = i === 0 ? 0 : i === 1 ? -4 : 5
              const opacity = 1 - i * 0.22

              return (
                <motion.div
                  key={img.id}
                  className={`g-deck__card ${isTop ? 'is-top' : ''}`}
                  style={{
                    zIndex: 10 - i,
                  }}
                  initial={{
                    scale: scale * 0.9,
                    y: yOffset + 30,
                    opacity: 0,
                    rotateZ: rotZ,
                  }}
                  animate={{
                    scale,
                    y: yOffset,
                    opacity,
                    rotateZ: rotZ,
                  }}
                  exit={{
                    x: 320,
                    opacity: 0,
                    rotateZ: 24,
                    scale: 0.85,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={isTop ? handleNext : undefined}
                >
                  <div className="g-deck__frame arch">
                    <img
                      src={img.thumb}
                      alt={`Sacred meeting moment ${img.id}`}
                      className="g-deck__img"
                    />

                    <div className="g-deck__glare" aria-hidden="true" />

                    {isTop && (
                      <div className="g-deck__overlay">
                        <span className="g-deck__badge">Chapter VI</span>
                        <h3 className="g-deck__title">Meeting Encounter #{img.id}</h3>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Deck Navigation Controls & Rail */}
        <div className="g-deck__controls">
          <button
            type="button"
            className="g-deck__btn g-deck__btn--prev"
            onClick={handlePrev}
            aria-label="Previous photograph"
          >
            ‹
          </button>

          <div className="g-deck__rail">
            <span className="g-deck__counter">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <div className="g-deck__track">
              <motion.div
                className="g-deck__bar"
                animate={{
                  width: `${((currentIndex + 1) / deck.length) * 100}%`,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="g-deck__total">
              {String(deck.length).padStart(2, '0')}
            </span>
          </div>

          <button
            type="button"
            className="g-deck__btn g-deck__btn--next"
            onClick={handleNext}
            aria-label="Next photograph"
          >
            ›
          </button>
        </div>

        <div className="g-deck__footer">
          <Magnetic>
            <Link to="/gallery" className="btn btn-ghost">
              View Full Gallery <Arrow />
            </Link>
          </Magnetic>
        </div>
      </div>
    </div>
  )
}

export default GalleryDeck
