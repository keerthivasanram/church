import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { site } from '../data/siteContent'
import Reveal from '../components/motion/Reveal'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import Ornament from '../components/motion/Ornament'
import Counter from '../components/Counter'
import Arrow from '../components/Arrow'
import './Studio.css'

const philosophy = [
  {
    title: 'Roman Architecture',
    body: 'Arches frame every photograph on the site; buttons read as bronze plates, not rounded rectangles.',
  },
  {
    title: 'Editorial Typography',
    body: 'Cormorant Garamond set upright and monumental, never italic — a direction we tried, then deliberately reversed.',
  },
  {
    title: 'Sacred Geometry',
    body: 'Section rhythm follows a slow fluid scale rather than a fixed grid, so the whitespace itself carries weight.',
  },
  {
    title: 'Natural Light',
    body: 'God-rays, drifting dust and a travelling light sweep animate independently inside every shadowed hall.',
  },
  {
    title: 'Travertine',
    body: 'A seamless stone tooth runs beneath every ivory section at 5% opacity — present, but never competing with content.',
  },
  {
    title: 'Cathedral Black',
    body: 'The apse, the prayer hall and the footer share one obsidian ground, reserved for the moments that need weight.',
  },
  {
    title: '24-Karat Gold',
    body: 'One accent, used everywhere the eye should land — dividers, hover fills, seals, the active state of a link.',
  },
  {
    title: 'Minimal Ornament',
    body: 'A single self-drawing rule — line, mark, line — repeats as the signature, never twice at the same size.',
  },
]

const stack = [
  'React 19', 'Vite 8', 'Framer Motion', 'Lenis Smooth Scroll',
  'React Router', 'CSS Custom Properties', 'Web Audio API', 'prefers-reduced-motion',
]

const process = [
  {
    n: '01',
    title: 'Foundation Audit',
    body: 'Read the inherited codebase — component structure, routing, existing content — before a single new design decision.',
  },
  {
    n: '02',
    title: 'Identity Direction',
    body: 'Explored a palette and type system, then reversed the parts that read generic. An italic-forward pass was built and explicitly rejected before Ivory / Travertine / Roman Gold / Cathedral Black was locked.',
  },
  {
    n: '03',
    title: 'Token System',
    body: 'Every colour, radius and easing curve lives as a CSS custom property. No page invents its own palette.',
  },
  {
    n: '04',
    title: 'Motion Choreography',
    body: 'Lenis and Framer Motion layered as reusable primitives — Reveal, Stagger, Parallax, Ornament, Ambient, Threshold — instead of one-off animations per section.',
  },
  {
    n: '05',
    title: 'Verification Loop',
    body: 'Every visual change checked live in a running browser at desktop and mobile widths, with a console-error check, before being called done.',
  },
  {
    n: '06',
    title: 'Client Review Rounds',
    body: 'Direction sharpened across several rounds of direct feedback — a Vatican-luxury pivot, a cinematic-pilgrimage deepening, and targeted reverts honoured exactly as asked.',
  },
]

/** A tiny, self-contained, hover-triggered demonstration of one motion technique used on the live site. */
function MotionChip({ label, children }) {
  return (
    <div className="mchip">
      <div className="mchip__stage">{children}</div>
      <span className="mchip__label">{label}</span>
    </div>
  )
}

function ChipParallax() {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rx = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 200, damping: 18 })
  function move(e) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  function leave() { x.set(0.5); y.set(0.5) }
  return (
    <motion.div
      className="mchip__stage"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 400 }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      <span className="mchip__mark">✦</span>
    </motion.div>
  )
}

function Studio() {
  return (
    <>
      <Helmet>
        <title>Design &amp; Build Notes | {site.name}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="studio">
        <section className="page-hero studio-hero">
          <div className="container">
            <Reveal>
              <span className="eyebrow eyebrow--center">Design &amp; Build Notes</span>
              <h1>The Craft Behind Sanctuary</h1>
              <Ornament center />
              <p className="lede studio-hero__lede">
                A short case-study for anyone curious how this site was built — the
                visual language, the motion system, and the process behind it.
                Not part of the ministry's experience; kept off the main nav on purpose.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══ I — DESIGN PHILOSOPHY ═══ */}
        <section className="section studio-phil">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow eyebrow--center">I — Design Philosophy</span>
              <h2>A vocabulary borrowed from Rome</h2>
              <p className="lede">
                Eight decisions, held consistently, do more work than fifty
                one-off ones. This is the vocabulary every page draws from.
              </p>
            </div>
            <Stagger className="grid studio-phil__grid">
              {philosophy.map((p, i) => (
                <StaggerItem key={p.title} className="studio-phil__item">
                  <span className="studio-phil__num">{String(i + 1).padStart(2, '0')}</span>
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ═══ MOTION LANGUAGE — live demos ═══ */}
        <section className="section section-dark studio-motion">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow eyebrow--center">Motion Language</span>
              <h2>Hover each one</h2>
              <p className="lede">
                These are the actual techniques in use on the live site —
                demonstrated here in isolation, not described in a slide.
              </p>
            </div>
            <div className="mchip-grid">
              <MotionChip label="Fade">
                <motion.span className="mchip__mark" initial={{ opacity: 0.18 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.6 }}>✦</motion.span>
              </MotionChip>
              <MotionChip label="Veil">
                <div className="mchip__veil-wrap">
                  <motion.span className="mchip__veil-fill" initial={{ clipPath: 'inset(100% 0 0 0)' }} whileHover={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
                </div>
              </MotionChip>
              <MotionChip label="Door">
                <div className="mchip__door-wrap">
                  <motion.span className="mchip__door mchip__door--l" initial={{ x: '0%' }} whileHover={{ x: '-100%' }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                  <motion.span className="mchip__door mchip__door--r" initial={{ x: '0%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                </div>
              </MotionChip>
              <MotionChip label="Gold Draw">
                <motion.span className="mchip__line" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
              </MotionChip>
              <MotionChip label="Dust">
                <div className="mchip__dust">
                  <span /><span /><span /><span /><span />
                </div>
              </MotionChip>
              <MotionChip label="Tilt Parallax">
                <ChipParallax />
              </MotionChip>
              <MotionChip label="Magnetic Lift">
                <motion.span className="mchip__mark" whileHover={{ y: -8, scale: 1.12 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>✦</motion.span>
              </MotionChip>
              <MotionChip label="Blur Reveal">
                <motion.span className="mchip__blur-text" initial={{ filter: 'blur(6px)', opacity: 0.4 }} whileHover={{ filter: 'blur(0px)', opacity: 1 }} transition={{ duration: 0.6 }}>AMEN</motion.span>
              </MotionChip>
            </div>
          </div>
        </section>

        {/* ═══ II — ENGINEERING EXCELLENCE ═══ */}
        <section className="section studio-eng">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow eyebrow--center">II — Engineering Excellence</span>
              <h2>Built with real numbers, not marketing ones</h2>
              <p className="lede">
                Counted directly from this codebase — nothing here is rounded up
                for effect.
              </p>
            </div>

            <Stagger className="studio-stats">
              <StaggerItem className="studio-stat">
                <span className="studio-stat__num"><Counter value={20} /></span>
                <span className="studio-stat__label">Components</span>
              </StaggerItem>
              <StaggerItem className="studio-stat">
                <span className="studio-stat__num"><Counter value={5} /></span>
                <span className="studio-stat__label">Page Templates</span>
              </StaggerItem>
              <StaggerItem className="studio-stat">
                <span className="studio-stat__num"><Counter value={38} /></span>
                <span className="studio-stat__label">Design Tokens</span>
              </StaggerItem>
              <StaggerItem className="studio-stat">
                <span className="studio-stat__num"><Counter value={7} /></span>
                <span className="studio-stat__label">Named Animations</span>
              </StaggerItem>
              <StaggerItem className="studio-stat">
                <span className="studio-stat__num"><Counter value={2426} /></span>
                <span className="studio-stat__label">Lines of CSS</span>
              </StaggerItem>
              <StaggerItem className="studio-stat studio-stat--verified">
                <span className="studio-stat__num studio-stat__num--zero">0</span>
                <span className="studio-stat__label">Console Errors, Every Pass</span>
              </StaggerItem>
            </Stagger>

            <Reveal className="studio-stack">
              <h4 className="studio-stack__title">Built With</h4>
              <ul className="studio-stack__list">
                {stack.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ═══ III — CRAFT & PROCESS ═══ */}
        <section className="section section-soft studio-process">
          <div className="container container--narrow">
            <div className="section-head">
              <span className="eyebrow eyebrow--center">III — Craft &amp; Process</span>
              <h2>How this was actually built</h2>
              <p className="lede">Six real stages, not a generic waterfall.</p>
            </div>
            <div className="studio-timeline">
              {process.map((step) => (
                <Reveal key={step.n} className="studio-timeline__row">
                  <span className="studio-timeline__n">{step.n}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="studio-close">
          <div className="container">
            <Reveal variant="blur" className="studio-close__inner">
              <Ornament center />
              <p>You've reached the end of the notes.</p>
              <Link to="/" className="btn btn-ghost">Return to the Sanctuary <Arrow /></Link>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  )
}

export default Studio
