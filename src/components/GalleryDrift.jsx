import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useSpring, useMotionValue, useReducedMotion } from 'framer-motion'
import Magnetic from './motion/Magnetic'
import Arrow from './Arrow'
import './GalleryDrift.css'

// Predefined spatial positions and depths for a 6-image constellation.
// `depth` controls both how blurry it is initially, its base scale, and how much it parallax drifts.
const CONSTELLATION = [
  { left: '12%', top: '15%', depth: 0.5, size: '280px' },
  { left: '68%', top: '8%', depth: 0.2, size: '220px' },
  { left: '42%', top: '35%', depth: 1.2, size: '420px' }, // Center hero piece
  { left: '8%', top: '65%', depth: 0.7, size: '320px' },
  { left: '76%', top: '60%', depth: 0.9, size: '360px' },
  { left: '38%', top: '82%', depth: 0.3, size: '240px' },
]

function DriftNode({ img, index, mx, my, hoveredId, setHoveredId }) {
  const profile = CONSTELLATION[index % CONSTELLATION.length]
  const isHovered = hoveredId === img.id
  const isSiblingHovered = hoveredId !== null && hoveredId !== img.id

  // Parallax drift based on mouse movement and node depth.
  // Deeper items move less; foreground items move more.
  const driftX = useSpring(mx, { stiffness: 40, damping: 20 })
  const driftY = useSpring(my, { stiffness: 40, damping: 20 })

  // When hovering, we want the item to "stand still" and stop drifting
  // so we dynamically adjust the multiplier.
  const multiplier = isHovered ? 0 : profile.depth * 30

  // Base optical properties driven by depth
  const baseBlur = (1 - profile.depth) * 6
  const baseOpacity = 0.6 + profile.depth * 0.4
  const baseScale = profile.depth * 0.5 + 0.5

  // Dynamic visual states
  let currentBlur = isSiblingHovered ? 12 : isHovered ? 0 : baseBlur
  let currentOpacity = isSiblingHovered ? 0.2 : isHovered ? 1 : baseOpacity
  let currentScale = isHovered ? 1.05 : baseScale

  return (
    <motion.figure
      className={`drift__node ${isHovered ? 'is-active' : ''}`}
      style={{
        left: profile.left,
        top: profile.top,
        width: profile.size,
        x: useSpring(driftX.get() * multiplier),
        y: useSpring(driftY.get() * multiplier),
        zIndex: isHovered ? 100 : Math.round(profile.depth * 10),
      }}
      animate={{
        scale: currentScale,
        opacity: currentOpacity,
        filter: `blur(${currentBlur}px) contrast(${isHovered ? 1.08 : 1.02}) brightness(${isHovered ? 1.05 : 0.9})`,
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHoveredId(img.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div className="drift__frame arch">
        <img src={img.thumb} alt={`Sacred meeting moment ${img.id}`} />
        
        {/* Subtle glass glare */}
        <div className="drift__glare" aria-hidden="true" />
        
        {/* Caption reveals only on hover */}
        <motion.div
          className="drift__caption"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.4 }}
        >
          <span className="drift__badge">Chapter VI</span>
          <span className="drift__title">Encounter #{img.id}</span>
        </motion.div>
      </div>
    </motion.figure>
  )
}

function GalleryDrift({ images }) {
  const containerRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)
  const reduce = useReducedMotion()
  const displayImages = images.slice(0, 6)

  // Track raw normalized mouse coordinates (-1 to 1) from the center of the stage
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  function handleMouseMove(e) {
    if (reduce) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    // Normalize so center is 0,0
    mx.set((x - 0.5) * 2)
    my.set((y - 0.5) * 2)
  }

  function handleMouseLeave() {
    mx.set(0)
    my.set(0)
  }

  if (reduce) {
    return (
      <div className="drift drift--static">
        <div className="drift__grid">
          {displayImages.map((img) => (
            <div key={img.id} className="drift__static-card arch">
              <img src={img.thumb} alt={`Gallery photograph ${img.id}`} />
            </div>
          ))}
        </div>
        <div className="drift__cta">
          <Link to="/gallery" className="btn btn-ghost">
            View Full Gallery <Arrow />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="drift" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background ambient dust layer */}
      <div className="drift__ambient" aria-hidden="true" />

      <div className="drift__constellation">
        {displayImages.map((img, i) => (
          <DriftNode
            key={img.id}
            img={img}
            index={i}
            mx={mx}
            my={my}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </div>

      <div className="drift__footer">
        <Magnetic>
          <Link to="/gallery" className="btn btn-ghost" onMouseEnter={() => setHoveredId('cta')}>
            Explore The Memories <Arrow />
          </Link>
        </Magnetic>
      </div>
    </div>
  )
}

export default GalleryDrift
