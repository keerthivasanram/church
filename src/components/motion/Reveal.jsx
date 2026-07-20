import { motion, useReducedMotion } from 'framer-motion'

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -44 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -64 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 64 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, y: 28, filter: 'blur(18px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } },
  /* Veil — imagery/panels rise from behind a drawn curtain (clip from bottom). */
  veil: {
    hidden: { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
    show: { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' },
  },
}

/**
 * Reveals children into view once on scroll — slow and reverent, no bounce.
 * `variant`: up | down | left | right | scale | blur | veil. `delay` staggers.
 */
function Reveal({ children, delay = 0, variant = 'up', className, as = 'div' }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  const v = VARIANTS[variant] || VARIANTS.up

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : v.hidden}
      whileInView={reduce ? undefined : v.show}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: variant === 'veil' ? 1.3 : 1.0, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}

export default Reveal
