import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import Magnetic from './motion/Magnetic'
import Arrow from './Arrow'
import './GalleryTraverse.css'

function TraverseCard({ img, index, cameraZ }) {
  // Each card is placed deeper into the screen (-Z space).
  const baseZ = -950 * index - 1000
  
  // The card's current Z position relative to the moving camera
  const z = useTransform(cameraZ, (val) => baseZ - val)

  const isLeft = index % 2 === 0
  
  // Staggered layout to form a corridor
  const x = isLeft ? '-20vw' : '20vw'
  const y = isLeft ? '4vh' : '-4vh'
  
  // Bank the cards slightly inward to face the center aisle
  const rotateY = isLeft ? 15 : -15
  const rotateZ = isLeft ? -1.5 : 1.5

  // Optical fading:
  const opacity = useTransform(z, [-3500, -2200, 200, 700], [0, 1, 1, 0])
  
  // Depth of field blur
  const blur = useTransform(z, [-3500, -2000, -200, 700], [12, 0, 0, 20])
  const filter = useTransform(blur, (v) => `blur(${v}px) contrast(1.08) brightness(0.92)`)

  // Cinematic glare sweep as the card rushes past the camera
  const glareOpacity = useTransform(z, [-2000, -600, 0], [0, 0.45, 0])
  const glareX = useTransform(z, [-2000, 0], ['-150%', '150%'])

  // Internal image parallax: as the frame comes forward, the photo pushes back
  const imgScale = useTransform(z, [-2500, 600], [1.15, 1])

  return (
    <motion.figure
      className={`traverse__card traverse__card--${index}`}
      style={{
        x,
        y,
        z,
        rotateY,
        rotateZ,
        opacity,
        filter,
      }}
    >
      <div className="traverse__frame">
        <motion.img 
          src={img.thumb} 
          alt={`Sacred moment ${img.id}`} 
          style={{ scale: imgScale }}
        />
        
        {/* Dynamic glass glare */}
        <motion.div 
          className="traverse__glare" 
          aria-hidden="true" 
          style={{ x: glareX, opacity: glareOpacity }}
        />
        
        <div className="traverse__overlay">
          <span className="traverse__num">{String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>
    </motion.figure>
  )
}

function GalleryTraverse({ images }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const displayImages = images.slice(0, 6)

  // Track raw scroll progress over the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Apply a smooth spring to the scroll progress for buttery, cinematic camera movement
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 85, 
    damping: 24, 
    restDelta: 0.001 
  })

  // Map progress (0 to 1) to camera Z travel smoothly
  const cameraZ = useTransform(smoothProgress, [0, 1], [0, -6200])

  // Final CTA reveals at the end of the corridor
  const ctaOpacity = useTransform(smoothProgress, [0.72, 0.88], [0, 1])
  const ctaScale = useTransform(smoothProgress, [0.72, 0.88], [0.8, 1])
  const ctaPointerEvents = useTransform(smoothProgress, (v) => (v > 0.72 ? 'auto' : 'none'))

  const hintOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0])

  if (reduce) {
    return (
      <div className="traverse traverse--static">
        <div className="traverse__grid">
          {displayImages.map((img) => (
            <div key={img.id} className="traverse__static-card arch">
              <img src={img.thumb} alt={`Gallery photograph ${img.id}`} />
            </div>
          ))}
        </div>
        <div className="traverse__cta">
          <Link to="/gallery" className="btn btn-ghost">
            Enter The Archives <Arrow />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="traverse" ref={ref}>
      <div className="traverse__stage">
        <div className="traverse__dust" aria-hidden="true" />
        
        {/* The 3D CSS perspective engine container */}
        <div className="traverse__corridor">
          {displayImages.map((img, i) => (
            <TraverseCard
              key={img.id}
              img={img}
              index={i}
              cameraZ={cameraZ}
            />
          ))}
        </div>

        <motion.div
          className="traverse__cta-box"
          style={{
            opacity: ctaOpacity,
            scale: ctaScale,
            pointerEvents: ctaPointerEvents,
          }}
        >
          <Magnetic>
            <Link to="/gallery" className="btn btn-ghost">
              Enter The Archives <Arrow />
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div 
          className="traverse__scroll-hint"
          style={{ opacity: hintOpacity }}
        >
          Walk Forward
        </motion.div>
      </div>
    </div>
  )
}

export default GalleryTraverse
