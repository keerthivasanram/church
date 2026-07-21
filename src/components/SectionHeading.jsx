import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Reveal from './motion/Reveal'
import Ornament from './motion/Ornament'

/**
 * Title whose words are lit in sequence *by the scroll* rather than by a
 * one-shot reveal that fires and freezes. Each word owns a slice of the
 * heading's approach, so the line assembles as you walk toward it.
 */
function ScrubbedTitle({ text }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  /* Completes shortly after the heading enters, not when it reaches the middle
     of the screen. Anything later leaves headings resting visibly half-lit —
     with this page's very large section padding a title can sit low in the
     viewport for a long time, and a half-faded word reads as a rendering fault
     rather than an effect. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.72'] })

  const words = String(text).split(' ')

  if (reduce) return <h2 ref={ref}>{text}</h2>

  /* Real space text nodes between the words, and normal inline flow rather than
     a flex row. Laying the words out as flex children drops the spaces from
     textContent — the heading read as "HallsofMinistry" to a screen reader and
     to anyone copying it. Inline-block words in normal flow keep the sentence
     intact and still wrap correctly. */
  return (
    <h2 ref={ref} className="scrub">
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <Word word={w} index={i} count={words.length} progress={scrollYProgress} />
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </h2>
  )
}

function Word({ word, index, count, progress }) {
  // words overlap generously — a hard sequence reads as a stutter, not a phrase
  const span = 1 / count
  const start = index * span * 0.62
  const end = start + span * 1.5

  const opacity = useTransform(progress, [start, end], [0, 1])
  const y = useTransform(progress, [start, end], [22, 0])
  const blurish = useTransform(progress, [start, end], [0.86, 1])

  return (
    <motion.span className="scrub__word" style={{ opacity, y, scale: blurish }}>
      {word}
    </motion.span>
  )
}

/** Consistent eyebrow + display title (+ optional lede) used across sections. */
function SectionHeading({ eyebrow, title, children, align = 'center' }) {
  const centered = align === 'center'
  return (
    <Reveal className={centered ? 'section-head' : undefined}>
      {eyebrow && (
        <span className={`eyebrow ${centered ? 'eyebrow--center' : ''}`}>{eyebrow}</span>
      )}
      <ScrubbedTitle text={title} />
      {centered && <Ornament small />}
      {children && <p className="lede">{children}</p>}
    </Reveal>
  )
}

export default SectionHeading
