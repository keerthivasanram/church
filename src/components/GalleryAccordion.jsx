import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Magnetic from './motion/Magnetic'
import Arrow from './Arrow'
import './GalleryAccordion.css'

function GalleryAccordion({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduce = useReducedMotion()
  const displayImages = images.slice(0, 5)

  if (reduce) {
    return (
      <div className="g-accordion g-accordion--static">
        <div className="g-accordion__grid">
          {displayImages.map((img) => (
            <div key={img.id} className="g-accordion__panel arch">
              <img src={img.thumb} alt={`Gallery photo ${img.id}`} />
            </div>
          ))}
        </div>
        <div className="g-accordion__cta">
          <Link to="/gallery" className="btn btn-ghost">
            View Full Gallery <Arrow />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="g-accordion">
      <div className="g-accordion__wrapper">
        {displayImages.map((img, i) => {
          const isActive = activeIndex === i

          return (
            <motion.div
              key={img.id}
              className={`g-accordion__panel ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              layout
              transition={{
                layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <div className="g-accordion__frame arch">
                <img
                  src={img.thumb}
                  alt={`Sacred meeting moment ${img.id}`}
                  className="g-accordion__img"
                />

                {/* Subtle glass glare */}
                <div className="g-accordion__glare" aria-hidden="true" />

                {/* Content Overlay */}
                <div className="g-accordion__overlay">
                  <span className="g-accordion__num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  
                  <motion.div
                    className="g-accordion__meta"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0.6,
                      y: isActive ? 0 : 12,
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="g-accordion__badge">Chapter VI</span>
                    <h3 className="g-accordion__title">Sacred Encounter #{img.id}</h3>
                    {isActive && (
                      <motion.p
                        className="g-accordion__desc"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                      >
                        A powerful manifestation of the Holy Spirit during ministry gathering.
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="g-accordion__footer">
        <Magnetic>
          <Link to="/gallery" className="btn btn-ghost">
            View Full Gallery <Arrow />
          </Link>
        </Magnetic>
      </div>
    </div>
  )
}

export default GalleryAccordion
