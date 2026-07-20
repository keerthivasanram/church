import { motion, useScroll, useSpring } from 'framer-motion'
import './ScrollProgress.css'

/** Thin accent bar at the very top that tracks page scroll. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

export default ScrollProgress
