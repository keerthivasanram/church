import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import Magnetic from './motion/Magnetic'
import Arrow from './Arrow'
import './GalleryCollage.css'

function CollageCard({ img, index, scrollYProgress }) {
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), {
    stiffness: 160,
    damping: 16,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 160,
    damping: 16,
  })

  const trajectories = [
    { x: -220, y: -140, rot: -10, scale: 0.8 },
    { x: 0, y: -180, rot: 6, scale: 0.75 },
    { x: 220, y: -140, rot: -8, scale: 0.8 },
    { x: -240, y: 120, rot: 8, scale: 0.75 },
    { x: 0, y: 180, rot: -5, scale: 0.8 },
    { x: 240, y: 120, rot: 10, scale: 0.75 },
  ]

  const t = trajectories[index % trajectories.length]

  const x = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [t.x, 0, 0, t.x * -0.5])
  const y = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [t.y, 0, 0, t.y * -0.5])
  const rotZ = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [t.rot, 0, 0, t.rot * -0.4])
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [t.scale, 1, 1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mx.set(0)
    my.set(0)
    setHovered(false)
  }

  return (
    <motion.figure
      className={`collage__card collage__card--${index} ${hovered ? 'is-hovered' : ''}`}
      style={{
        x,
        y,
        rotateZ: rotZ,
        rotateX,
        rotateY,
        scale,
        opacity,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="collage__card-frame arch">
        <img
          src={img.thumb}
          alt={`Sacred meeting moment ${img.id}`}
          className="collage__card-img"
        />
        <div className="collage__card-overlay">
          <span className="collage__card-badge">Chapter VI</span>
          <span className="collage__card-title">Encounter #{img.id}</span>
        </div>
        <div className="collage__card-glare" aria-hidden="true" />
      </div>
    </motion.figure>
  )
}

function GalleryCollage({ images }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  if (reduce) {
    return (
      <div className="collage collage--static">
        <div className="collage__grid">
          {images.slice(0, 6).map((img, i) => (
            <figure key={img.id} className="collage__card arch">
              <img src={img.thumb} alt={`Gallery photograph ${img.id}`} />
            </figure>
          ))}
        </div>
        <div className="collage__cta-box">
          <Link to="/gallery" className="btn btn-ghost">
            View Full Gallery <Arrow />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="collage" ref={ref}>
      <div className="collage__stage">
        <div className="collage__grid">
          {images.slice(0, 6).map((img, i) => (
            <CollageCard
              key={img.id}
              img={img}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}

          <motion.div
            className="collage__cta-box"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0.35, 0.5, 0.75, 0.95],
                [0, 1, 1, 0]
              ),
              scale: useTransform(
                scrollYProgress,
                [0.35, 0.5, 0.75, 0.95],
                [0.85, 1, 1, 0.9]
              ),
            }}
          >
            <Magnetic>
              <Link to="/gallery" className="btn btn-ghost">
                View Full Gallery <Arrow />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default GalleryCollage
