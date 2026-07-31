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
import HeroLogo from './HeroLogo'
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
      <HeroLogo />
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
            <h1 className="chero__title">
              <motion.span className="chero__word chero__word--1" variants={reduce ? undefined : word}>Encounter</motion.span>
              <motion.span className="chero__word chero__word--2 accent" variants={reduce ? undefined : word}>
                <span>C</span><span>H</span><span>R</span><span>I</span><span>S</span><span>T</span>
              </motion.span>
            </h1>

            <motion.div className="chero__meta" variants={reduce ? undefined : word}>
              <span className="chero__meta-line" aria-hidden="true" />
              <span className="chero__ref">ISAIAH 11 : 3</span>
            </motion.div>

            <motion.div className="chero__features" variants={reduce ? undefined : word}>
              <div className="chero__feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17.5 19C17.5 19 19 17.5 19 15C19 11 12 4 12 4C12 4 5 11 5 15C5 17.5 6.5 19 6.5 19" />
                  <path d="M12 21C14 21 15.5 19.5 15.5 17.5C15.5 15 12 11 12 11C12 11 8.5 15 8.5 17.5C8.5 19.5 10 21 12 21Z" fill="currentColor"/>
                </svg>
                <span>PROPHETIC<br/>TRAINING</span>
              </div>
              <div className="chero__feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21C12 21 21 16 21 9.5C21 6 18.5 3.5 15.5 3.5C13.5 3.5 12 5 12 5C12 5 10.5 3.5 8.5 3.5C5.5 3.5 3 6 3 9.5C3 16 12 21 12 21Z" />
                </svg>
                <span>HEALING &<br/>DELIVERANCE</span>
              </div>
              <div className="chero__feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" />
                  <path d="M9 12L11 14L15 10" />
                </svg>
                <span>IMPARTATION OF<br/>THE ANOINTING</span>
              </div>
              <div className="chero__feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <ellipse cx="12" cy="12" rx="4" ry="10" />
                  <path d="M2 12H22" />
                </svg>
                <span>KINGDOM<br/>OUTREACH</span>
              </div>
            </motion.div>

            {/* the two ways in — arriving last, after the scene has settled */}
            <motion.div className="chero__actions" variants={reduce ? undefined : word}>
              <Magnetic>
                <Link to="/invite" className="btn btn-primary-glow">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20C4 16 8 14 12 14C16 14 20 16 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>INVITE THE PROPHET</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" className="btn-youtube__icon" aria-hidden="true" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 8L16 12L10 16V8Z" />
                  </svg>
                  <span>WATCH ON YOUTUBE</span>
                </a>
              </Magnetic>
              
              {/* Prophet card inline with actions */}
              <motion.div className="chero__prophet-card inline" variants={reduce ? undefined : word} initial={reduce ? false : 'hidden'} animate={reduce ? undefined : 'show'}>
                 <div className="prophet-card__signature">Prophet</div>
                 <div className="prophet-card__name">DANIEL BENNET</div>
                 <div className="prophet-card__sub">SERVING GOD. IMPACTING NATIONS.</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* the proof, set quietly along the floor of the nave */}
      <div className="chero__ledger">
        <div className="container">
          <motion.div
            className="chero__ledger-row"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={reduce ? undefined : { duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="chero__stat-block">
              <span className="chero__stat-val">6+</span>
              <span className="chero__stat-lbl">YEARS OF MINISTRY</span>
            </div>
            <div className="chero__stat-divider" />
            <div className="chero__stat-block">
              <span className="chero__stat-val">15+</span>
              <span className="chero__stat-lbl">NATIONS REACHED</span>
            </div>
            <div className="chero__stat-divider" />
            <div className="chero__stat-block">
              <span className="chero__stat-val">120+</span>
              <span className="chero__stat-lbl">CHURCHES MINISTERED</span>
            </div>
            <div className="chero__stat-divider" />
            <div className="chero__stat-block">
              <span className="chero__stat-val">10K+</span>
              <span className="chero__stat-lbl">LIVES TOUCHED</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* the plate's own controls, on the ledge just above the ledger */}
      {/* Removed HeroSlideRail as per redesign exact matching */}

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
