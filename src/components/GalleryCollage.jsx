import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Magnetic from './motion/Magnetic'
import './GalleryCollage.css'

/**
 * A scattered, mismatched grid of photos that fly in from offscreen 
 * as the user scrolls into the section.
 */
function GalleryCollage({ images }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  // Track the scroll progress of the entire sticky container
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Define starting offsets for each image based on index
  // Image 0: from top-left
  // Image 1: from top
  // Image 2: from top-right
  // Image 3: from left
  // Image 4: from bottom
  // Image 5: from bottom-left
  const startOffsets = [
    { x: -500, y: -400 },
    { x: 0, y: -600 },
    { x: 500, y: -400 },
    { x: -600, y: 0 },
    { x: 0, y: 600 },
    { x: -500, y: 500 },
  ]

  if (reduce) {
    return (
      <div className="collage">
        <div className="collage__stage" style={{ position: 'relative', height: 'auto', padding: '120px 0' }}>
          <div className="collage__grid">
            {images.slice(0, 6).map((img, i) => (
              <figure key={img.id} className={`collage__item collage__item--${i}`}>
                <img src={img.thumb} alt={`Gallery photo ${img.id}`} />
              </figure>
            ))}
            <div className="collage__cta-box">
              <Link to="/gallery" className="btn btn-ghost">View Gallery</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="collage" ref={ref}>
      <div className="collage__stage">
        <div className="collage__grid">
          {images.slice(0, 6).map((img, i) => {
            const startX = startOffsets[i]?.x || 0
            const startY = startOffsets[i]?.y || 0
            
            // Photos fly in quickly during the first half of the scroll
            const x = useTransform(scrollYProgress, [0, 0.45], [startX, 0])
            const y = useTransform(scrollYProgress, [0, 0.45], [startY, 0])
            
            // 3D rotations as they fly in
            const rotStartZ = (i % 2 === 0 ? 1 : -1) * (15 + i * 4)
            const rotStartX = (i % 3 === 0 ? 1 : -1) * 35
            const rotStartY = (i % 2 === 0 ? -1 : 1) * 45
            
            const rotateZ = useTransform(scrollYProgress, [0, 0.45], [rotStartZ, 0])
            const rotateX = useTransform(scrollYProgress, [0, 0.45], [rotStartX, 0])
            const rotateY = useTransform(scrollYProgress, [0, 0.45], [rotStartY, 0])
            
            // Opacity fades in slightly later so it doesn't just pop in
            const opacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1])
            const scale = useTransform(scrollYProgress, [0, 0.45], [0.6, 1])

            // Exit animation as we scroll past (the second half of scroll)
            const exitX = useTransform(scrollYProgress, [0.75, 1], [0, startX * 0.8])
            const exitY = useTransform(scrollYProgress, [0.75, 1], [0, startY * 0.8])
            const exitRotateZ = useTransform(scrollYProgress, [0.75, 1], [0, rotStartZ * -0.5])
            const exitOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0])
            
            const finalX = useTransform(() => {
              if (scrollYProgress.get() > 0.75) return exitX.get()
              return x.get()
            })
            const finalY = useTransform(() => {
              if (scrollYProgress.get() > 0.75) return exitY.get()
              return y.get()
            })
            const finalRotateZ = useTransform(() => {
              if (scrollYProgress.get() > 0.75) return exitRotateZ.get()
              return rotateZ.get()
            })
            const finalOpacity = useTransform(() => {
              if (scrollYProgress.get() > 0.75) return exitOpacity.get()
              return opacity.get()
            })

            return (
              <motion.figure 
                key={img.id} 
                className={`collage__item collage__item--${i}`}
                style={{ 
                  x: finalX, 
                  y: finalY, 
                  rotateZ: finalRotateZ, 
                  rotateX, 
                  rotateY, 
                  scale, 
                  opacity: finalOpacity,
                  transformStyle: 'preserve-3d'
                }}
              >
                <img src={img.thumb} alt={`Gallery photo ${img.id}`} />
              </motion.figure>
            )
          })}
          
          <motion.div 
            className="collage__cta-box"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.8, 1], [0, 1, 1, 0]),
              scale: useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1])
            }}
          >
            <Magnetic><Link to="/gallery" className="btn btn-ghost">View Full Gallery</Link></Magnetic>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default GalleryCollage
