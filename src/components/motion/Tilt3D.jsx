import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'

/**
 * Pointer-tracking 3D tilt with a moving glare highlight.
 * Wrap any card in it; children with `transform: translateZ()` pop forward.
 */
function Tilt3D({ children, className, max = 9, glare = true }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 18 })

  const gx = useTransform(px, [0, 1], ['0%', '100%'])
  const gy = useTransform(py, [0, 1], ['0%', '100%'])
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255, 210, 160, 0.22), transparent 55%)`
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
    glareOpacity.set(1)
  }
  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
    glareOpacity.set(0)
  }

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
    >
      {children}
      {glare && (
        <motion.span className="tilt-glare" aria-hidden="true" style={{ background: glareBg, opacity: glareOpacity }} />
      )}
    </motion.div>
  )
}

export default Tilt3D
