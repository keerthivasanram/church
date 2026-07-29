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
import Magnetic from './motion/Magnetic'
import { useHeroSlides, HeroSlidePlates, HeroSlideRail } from './HeroSlides'
import { site, stats, focusAreas } from '../data/siteContent'
import prophetCutout from '../assets/images/site/prophet-daniel-bennet.png'

const word = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] } },
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
  // the figure sits between the plate and the type, so it drifts between them
  const figureX = useTransform(mvx, [-0.5, 0.5], [26, -26])
  const figureY = useTransform(scrollYProgress, [0, 1], [0, 60])

  // the plate is five photographs from the meetings, dealt slowly
  const slides = useHeroSlides()

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
      {/* 1–2 · the plate — five photographs cross-dissolving on the camera-zoom
              stage — plus the colour grade over them */}
      <motion.div className="chero__stage" style={reduce ? staticStyle : { scale: bgScale, y: bgY }}>
        <motion.div className="chero__bg" style={reduce ? staticStyle : { x: bgX, y: bgPy }} aria-hidden="true">
          <HeroSlidePlates index={slides.index} />
        </motion.div>
        <div className="chero__grade" aria-hidden="true" />
      </motion.div>

      {/* 3–5 · volumetric light, drifting fog, dust motes */}
      <Ambient rays dust fog tone="dark" />

      {/* 6a · the messenger himself, standing in the nave — behind the type,
              graded down so the words keep the light */}
      <motion.div
        className="chero__figure"
        style={reduce ? staticStyle : { y: figureY, x: figureX }}
        aria-hidden="true"
      >
        <img src={prophetCutout} alt="" />
      </motion.div>

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
            <motion.span className="chero__kicker" variants={reduce ? undefined : word}>
              {site.founder}
            </motion.span>

            <h1 className="chero__title">
              <motion.span className="chero__word chero__word--1" variants={reduce ? undefined : word}>Encounter</motion.span>
              <motion.span className="chero__word chero__word--2 accent" variants={reduce ? undefined : word}>Christ.</motion.span>
            </h1>

            <motion.div className="chero__meta" variants={reduce ? undefined : word}>
              <Ornament center={false} small />
              <span className="chero__ref">Isaiah&nbsp;II&nbsp;·&nbsp;3</span>
            </motion.div>

            {/* what this ministry actually does — the subjects of the work */}
            <motion.ul className="chero__subjects" variants={reduce ? undefined : word}>
              {focusAreas.slice(0, 3).map((f) => (
                <li key={f}><span className="chero__subject-mark" aria-hidden="true" />{f}</li>
              ))}
            </motion.ul>

            {/* the two ways in — arriving last, after the scene has settled */}
            <motion.div className="chero__actions" variants={reduce ? undefined : word}>
              <Magnetic><Link to="/invite" className="btn btn-outline">Invite the Prophet</Link></Magnetic>
              <Magnetic>
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-youtube"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" className="btn-youtube__icon" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000" />
                    <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF" />
                  </svg>
                  <span>Watch on YouTube</span>
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* the proof, set quietly along the floor of the nave */}
      <motion.div
        className="chero__ledger"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container chero__ledger-row">
          {stats.map((s) => (
            <div className="chero__stat" key={s.label}>
              <span className="chero__stat-num">{s.value}{s.suffix}</span>
              <span className="chero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* the plate's own controls, on the ledge just above the ledger */}
      <HeroSlideRail {...slides} />

      {/* silent scroll cue */}
      <motion.div
        className="chero__scroll"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.0, duration: 2.0 }}
      >
        <span className="chero__scroll-line" />
      </motion.div>

      {/* hidden semantic link for the CTA the eye doesn't need yet */}
      <Link to="/invite" className="chero__enter">Enter</Link>
    </section>
  )
}

export default CathedralHero
