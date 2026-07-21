import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'
import './FlyImage.css'

/* Where the plate flies in from, and where it turns away to.
   Values are read at progress 0 (entering) → 0.5 (level with the eye) → 1 (gone). */
const APPROACH = {
  left:  { rotateY: [16, 0, -10], x: [-64, 0, 30] },
  right: { rotateY: [-16, 0, 10], x: [64, 0, -30] },
  depth: { rotateY: [0, 0, 0],    x: [0, 0, 0] },
}

/**
 * FLY IMAGE — a plate that never stops travelling.
 *
 * Rather than revealing once and freezing, the image is bound to the scroll for
 * its whole passage through the viewport: it approaches out of depth, turns to
 * face the eye as it reaches the centre, then banks away as it leaves, while a
 * bar of gold light wipes across the glass as you pass.
 *
 * Two modes, because the two situations are genuinely different:
 *
 *  `plate` (default) — the element itself flies. For free-standing imagery
 *    (the prophet, the mission plates) where the travelling edge is the drama.
 *
 *  `inset` — the element holds its place in the layout and an *overscanned*
 *    inner layer carries the motion. For imagery locked into a tile (ministry
 *    niches, gallery windows), where a flying frame would tear away from its
 *    card and expose the ground behind it. Travel is gentler and the scale
 *    never drops below 1, so no edge can ever be revealed.
 *
 * `from`   left | right | depth — the arc it flies along
 * `depth`  0–1, how far the plate travels
 * `speed`  vertical parallax in px (negative to counter-travel)
 * `blur`   soften the plate at the extremes. Animating `filter` re-rasterises
 *          the photograph every frame — leave it off unless one hero plate
 *          really needs it.
 * `sheen`  the travelling bar of light; on by default for feature plates only,
 *          since a dozen extra animated layers in the grids buys very little.
 */
function FlyImage({
  src,
  alt = '',
  mode = 'plate',
  from = 'depth',
  depth = 1,
  speed = 48,
  blur = false,
  sheen = mode === 'plate',
  className = '',
  children,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inset = mode === 'inset'

  // Driven straight off scroll progress — Lenis already smooths the scroll, so
  // an extra spring per plate only doubles the motion values recalculated each
  // frame (and keeps ticking after the scroll has stopped).
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const arc = APPROACH[from] || APPROACH.depth
  // inset plates bank only slightly — the tile has to stay legible
  const turn = inset ? 0.26 : 1
  const s = (arr, k = 1) => arr.map((v) => v * depth * k)

  const y = useTransform(p, [0, 0.5, 1], [speed, 0, -speed])
  const x = useTransform(p, [0, 0.5, 1], s(arc.x, inset ? 0.3 : 1))
  const rotateY = useTransform(p, [0, 0.5, 1], s(arc.rotateY, turn))
  const rotateX = useTransform(p, [0, 0.5, 1], s([7, 0, -5], turn))
  const scale = useTransform(
    p,
    [0, 0.5, 1],
    // never below 1 in inset mode, or the overscan stops covering the frame
    inset ? [1.06, 1, 1.04] : [1 - 0.12 * depth, 1, 1 - 0.05 * depth],
  )
  const opacity = useTransform(
    p,
    [0, 0.16, 0.9, 1],
    inset ? [0, 1, 1, 1] : [0, 1, 1, 0.72],
  )

  const blurPx = useTransform(p, [0, 0.22, 0.8, 1], [10, 0, 0, 5])
  const filter = useMotionTemplate`blur(${blurPx}px)`

  // the bar of gold light that wipes across the glass on the way past
  const sheenX = useTransform(p, [0.1, 0.9], ['-130%', '130%'])
  const sheenOpacity = useTransform(p, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0])

  const photo = (
    <>
      {src && <img src={src} alt={alt} />}
      {children}
      {sheen && !reduce && (
        <motion.span
          className="flyimg__sheen"
          style={{ x: sheenX, opacity: sheenOpacity }}
          aria-hidden="true"
        />
      )}
    </>
  )

  if (reduce) {
    return (
      <div className={`flyimg ${inset ? 'flyimg--inset ' : ''}${className}`} ref={ref}>
        <div className="flyimg__frame">{src && <img src={src} alt={alt} />}{children}</div>
      </div>
    )
  }

  const frameClass = 'flyimg__frame'

  // ── inset · the tile holds still, an overscanned layer inside it travels ──
  if (inset) {
    return (
      <div
        className={`flyimg flyimg--inset ${className}`}
        ref={ref}
        // overscan must out-reach the travel, or the edge shows
        style={{ '--fly-overscan': `${Math.abs(speed) + 28}px` }}
      >
        <motion.div
          className={frameClass}
          style={{ y, x, rotateX, rotateY, scale, opacity, transformPerspective: 1400 }}
        >
          {photo}
        </motion.div>
      </div>
    )
  }

  // ── plate · the whole element flies ──
  return (
    <motion.div
      ref={ref}
      className={`flyimg ${className}`}
      style={{
        y,
        x,
        rotateX,
        rotateY,
        scale,
        opacity,
        transformPerspective: 1200,
        ...(blur ? { filter } : null),
      }}
    >
      <div className={frameClass}>{photo}</div>
    </motion.div>
  )
}

export default FlyImage
