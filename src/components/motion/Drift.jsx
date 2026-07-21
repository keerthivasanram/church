import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * DRIFT — keeps a block of copy moving with the camera.
 *
 * Text planes travel at their own rate against the imagery, so the page reads as
 * one continuous move rather than a series of things that arrive and stop. The
 * block also settles into focus at the centre of the viewport and softens again
 * as it leaves, which is what gives the scroll its depth of field.
 *
 * `speed` px of vertical travel · `lateral` px of sideways drift · `fade` dim at the edges
 */
function Drift({ children, className, speed = 40, lateral = 0, fade = true, as = 'div' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  // Lenis smooths the scroll itself — no spring needed on top of it.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const y = useTransform(p, [0, 1], [speed, -speed])
  const x = useTransform(p, [0, 0.5, 1], [lateral, 0, -lateral])
  const opacity = useTransform(p, [0, 0.2, 0.82, 1], fade ? [0.35, 1, 1, 0.4] : [1, 1, 1, 1])

  if (reduce) return <div className={className} ref={ref}>{children}</div>

  return (
    <MotionTag ref={ref} className={className} style={{ y, x, opacity }}>
      {children}
    </MotionTag>
  )
}

export default Drift
