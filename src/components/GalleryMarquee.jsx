import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Magnetic from './motion/Magnetic'
import Arrow from './Arrow'
import './GalleryMarquee.css'

function MarqueeCard({ img, isHovered, onHover, onLeave }) {
  return (
    <motion.figure
      className={`marquee__card ${isHovered ? 'is-active' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={{
        scale: isHovered ? 1.04 : 1,
        filter: isHovered 
          ? 'contrast(1.08) brightness(1.05)' 
          : 'contrast(1.05) brightness(0.9)',
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="marquee__frame arch">
        <img src={img.thumb} alt={`Sacred meeting moment ${img.id}`} />
        
        <div className="marquee__glare" aria-hidden="true" />
        
        <motion.div
          className="marquee__overlay"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="marquee__caption">
            <span className="marquee__badge">Chapter VI</span>
            <span className="marquee__title">Encounter #{img.id}</span>
          </div>
        </motion.div>
      </div>
    </motion.figure>
  )
}

function GalleryMarquee({ images }) {
  const [hoveredId, setHoveredId] = useState(null)
  const reduce = useReducedMotion()
  
  // Slice to 5 images for a manageable sequence, then duplicate for the infinite loop
  const displayImages = images.slice(0, 5)
  // We need enough copies so that half the track covers the screen width.
  const marqueeSequence = [...displayImages, ...displayImages, ...displayImages, ...displayImages]

  if (reduce) {
    return (
      <div className="marquee marquee--static">
        <div className="marquee__grid">
          {displayImages.map((img) => (
            <div key={img.id} className="marquee__static-card arch">
              <img src={img.thumb} alt={`Gallery photograph ${img.id}`} />
            </div>
          ))}
        </div>
        <div className="marquee__cta">
          <Link to="/gallery" className="btn btn-ghost">
            View Full Gallery <Arrow />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="marquee">
      <div className="marquee__track-container">
        {/* CSS animation handles the infinite pan, paused on container hover */}
        <div className="marquee__track">
          {marqueeSequence.map((img, i) => (
            <MarqueeCard
              key={`${img.id}-${i}`}
              img={img}
              isHovered={hoveredId === `${img.id}-${i}`}
              onHover={() => setHoveredId(`${img.id}-${i}`)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>

      <div className="marquee__footer">
        <Magnetic>
          <Link to="/gallery" className="btn btn-ghost">
            Read The Manuscript <Arrow />
          </Link>
        </Magnetic>
      </div>
    </div>
  )
}

export default GalleryMarquee
