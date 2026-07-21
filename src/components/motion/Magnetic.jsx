import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * MAGNETIC — a plate that leans toward the hand reaching for it.
 *
 * The pull is small and heavily damped on purpose: enough that a button feels
 * weighted and aware, never enough to look playful. Only for fine pointers —
 * there is nothing to lean toward on a touch screen.
 */
function Magnetic({ children, strength = 0.28, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 })

  function onMove(e) {
    if (reduce || !ref.current) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  if (reduce) return <span className={className}>{children}</span>

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.span>
  )
}

export default Magnetic
