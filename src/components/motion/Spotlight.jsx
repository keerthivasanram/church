import { motion, useReducedMotion } from 'framer-motion'
import './Spotlight.css'

/**
 * Animated color-gradient highlight that brightens as its section scrolls into
 * the centre of the viewport and dims as it leaves — so each new section/card
 * gets "lit" as you reach it. Place inside a position:relative section, behind
 * its content.
 */
function Spotlight({ x = '50%', y = '40%', size = 760, color = 'rgba(234, 106, 10, 0.22)' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="spotlight"
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, scale: 0.72 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ margin: '-28% 0px -28% 0px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: `radial-gradient(${size}px ${Math.round(size * 0.78)}px at ${x} ${y}, ${color}, transparent 68%)`,
      }}
    />
  )
}

export default Spotlight
