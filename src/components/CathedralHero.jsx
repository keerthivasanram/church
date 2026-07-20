import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import Ambient from './motion/Ambient'
import Ornament from './motion/Ornament'

const word = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } },
}

/**
 * The Nave — a volumetric hero built from layered planes that react to the scroll
 * (the camera walking forward, the light and dust shifting) and to the pointer
 * (a slow architectural parallax). Silence and asymmetry carry the composition.
 */
function CathedralHero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // camera walks forward + planes separate on scroll
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.3])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const foreY = useTransform(scrollYProgress, [0, 1], [0, 240])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const scrimOpacity = useTransform(scrollYProgress, [0, 1], [1, 1.35])

  // pointer parallax (a slow camera drift)
  const mvx = useSpring(useMotionValue(0), { stiffness: 45, damping: 22, mass: 0.6 })
  const mvy = useSpring(useMotionValue(0), { stiffness: 45, damping: 22, mass: 0.6 })
  const bgX = useTransform(mvx, [-0.5, 0.5], [20, -20])
  const bgPy = useTransform(mvy, [-0.5, 0.5], [14, -14])
  const foreX = useTransform(mvx, [-0.5, 0.5], [-48, 48])
  const textX = useTransform(mvx, [-0.5, 0.5], [10, -10])

  function onMove(e) {
    if (reduce) return
    mvx.set(e.clientX / window.innerWidth - 0.5)
    mvy.set(e.clientY / window.innerHeight - 0.5)
  }
  function onLeave() {
    mvx.set(0)
    mvy.set(0)
  }

  const staticStyle = reduce ? {} : undefined

  return (
    <section className="chero" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      {/* 1–2 · cathedral plate (camera zoom) + colour grade */}
      <motion.div className="chero__stage" style={reduce ? staticStyle : { scale: bgScale, y: bgY }}>
        <motion.div className="chero__bg" style={reduce ? staticStyle : { x: bgX, y: bgPy }} aria-hidden="true" />
        <div className="chero__grade" aria-hidden="true" />
      </motion.div>

      {/* 3–5 · volumetric light, drifting fog, dust motes */}
      <Ambient rays dust fog tone="dark" />

      {/* 6 · foreground plane — an out-of-focus stone edge for depth */}
      <motion.div className="chero__fore" style={reduce ? staticStyle : { y: foreY, x: foreX }} aria-hidden="true" />

      {/* 7 · scrim + depth-of-field vignette */}
      <motion.div className="chero__scrim" style={reduce ? staticStyle : { opacity: scrimOpacity }} aria-hidden="true" />
      <div className="chero__vignette" aria-hidden="true" />

      {/* 8 · typography — asymmetric, offset, silent */}
      <motion.div
        className="chero__inner"
        style={reduce ? staticStyle : { y: textY, x: textX, opacity: textOpacity }}
      >
        <div className="container">
          <motion.div
            className="chero__copy"
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'show'}
            variants={reduce ? undefined : { show: { transition: { staggerChildren: 0.5, delayChildren: 0.3 } } }}
          >
            <h1 className="chero__title">
              <motion.span className="chero__word chero__word--1" variants={reduce ? undefined : word}>Encounter</motion.span>
              <motion.span className="chero__word chero__word--2 accent" variants={reduce ? undefined : word}>Christ.</motion.span>
            </h1>

            <motion.div className="chero__meta" variants={reduce ? undefined : word}>
              <Ornament center={false} small />
              <span className="chero__ref">Isaiah&nbsp;II&nbsp;·&nbsp;3</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* silent scroll cue */}
      <motion.div
        className="chero__scroll"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 2.6, duration: 1.6 }}
      >
        <span className="chero__scroll-line" />
      </motion.div>

      {/* hidden semantic link for the CTA the eye doesn't need yet */}
      <Link to="/invite" className="chero__enter">Enter</Link>
    </section>
  )
}

export default CathedralHero
