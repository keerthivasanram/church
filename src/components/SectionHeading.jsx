import Reveal from './motion/Reveal'
import Ornament from './motion/Ornament'

/** Consistent eyebrow + display title (+ optional lede) used across sections. */
function SectionHeading({ eyebrow, title, children, align = 'center' }) {
  const centered = align === 'center'
  return (
    <Reveal className={centered ? 'section-head' : undefined}>
      {eyebrow && (
        <span className={`eyebrow ${centered ? 'eyebrow--center' : ''}`}>{eyebrow}</span>
      )}
      <h2>{title}</h2>
      {centered && <Ornament small />}
      {children && <p className="lede">{children}</p>}
    </Reveal>
  )
}

export default SectionHeading
