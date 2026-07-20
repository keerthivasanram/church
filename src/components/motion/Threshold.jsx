import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Ornament from './Ornament'
import './Threshold.css'

/**
 * A transitional space between chapters — a breathing room rather than a hard
 * seam. A shaft of warm light drifts across as it passes, incense motes rise,
 * and a gilded ornament draws itself. Keeps the journey continuous.
 *
 * `tone`: 'light' (between ivory halls) | 'dark' (inside shadowed rooms)
 */
const GROUND = {
  ivory: 'var(--ivory)',
  soft: 'var(--bg-soft)',
  dark: 'var(--cathedral)',
}

function Threshold({ tone = 'light', label, from = 'ivory', to = 'ivory' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // sunlight travelling across the floor as you pass through
  const sweepX = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])
  const sweepOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <div
      className={`threshold threshold--${tone}`}
      ref={ref}
      aria-hidden={!label}
      style={{ '--th-from': GROUND[from] || GROUND.ivory, '--th-to': GROUND[to] || GROUND.ivory }}
    >
      {!reduce && (
        <motion.span
          className="threshold__sweep"
          style={{ x: sweepX, opacity: sweepOpacity }}
        />
      )}
      <span className="threshold__motes">
        <span /><span /><span /><span /><span />
      </span>
      <div className="threshold__inner">
        <Ornament center small />
        {label && <span className="threshold__label">{label}</span>}
      </div>
    </div>
  )
}

export default Threshold
