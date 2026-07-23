import { motion, useReducedMotion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] },
  },
}

/** Grid/list container that cascades its <StaggerItem> children into view. */
export function Stagger({ children, className }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : containerVariants}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, margin: '-70px' }}
    >
      {children}
    </motion.div>
  )
}

/** A single cascading child. `hover` adds a slow, graceful lift (no bounce). */
export function StaggerItem({ children, className, hover = false, ...rest }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : itemVariants}
      whileHover={reduce || !hover ? undefined : { y: -6 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
