import { motion, useReducedMotion } from 'framer-motion'

/**
 * Gilded divider whose two halves draw outward from a central cross-star as it
 * scrolls into view. `center` centres it; `small` is the compact section variant.
 */
function Ornament({ center = true, small = false, className = '' }) {
  const reduce = useReducedMotion()
  const line = {
    hidden: { scaleX: 0, opacity: 0 },
    show: { scaleX: 1, opacity: 1 },
  }
  const mark = {
    hidden: { scale: 0, rotate: -90, opacity: 0 },
    show: { scale: 1, rotate: 0, opacity: 1 },
  }
  const t = { duration: 1.1, ease: [0.16, 1, 0.3, 1] }

  return (
    <motion.div
      className={`ornament ${small ? 'ornament--sm' : ''} ${center ? 'ornament--center' : ''} ${className}`}
      aria-hidden="true"
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, margin: '-40px' }}
    >
      <motion.span className="ornament__line ornament__line--l" variants={reduce ? undefined : line} transition={t} />
      <motion.span className="ornament__mark" variants={reduce ? undefined : mark} transition={{ ...t, delay: 0.15 }}>
        ✦
      </motion.span>
      <motion.span className="ornament__line ornament__line--r" variants={reduce ? undefined : line} transition={t} />
    </motion.div>
  )
}

export default Ornament
