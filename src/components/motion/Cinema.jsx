import { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import './Cinema.css'

/* Deterministic pseudo-random so the field is identical between renders/SSR. */
function seeded(i) {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

/**
 * CINEMA — the air of the basilica, held over the whole journey.
 *
 * A single fixed plane that never stops moving: gilded embers rising through the
 * room, two slow blooms of light breathing across the page, and a fine film
 * grain. The light also answers the scroll — travel quickly and the room blooms,
 * come to rest and it settles. This is what makes the page feel continuously
 * alive rather than a stack of sections that animate once.
 *
 * Rendered through a portal on <body>: the route-transition wrapper in Layout
 * animates `filter`, which makes it a containing block and would otherwise pin
 * this layer to the top of the document instead of the viewport.
 */
function Cinema({ embers = 26 }) {
  const reduce = useReducedMotion()

  const motes = useMemo(
    () =>
      Array.from({ length: embers }, (_, i) => ({
        left: seeded(i + 1) * 100,
        size: 1 + seeded(i + 40) * 2.2,
        duration: 20 + seeded(i + 80) * 26,
        delay: -seeded(i + 120) * 40,
        sway: 20 + seeded(i + 160) * 70,
        opacity: 0.28 + seeded(i + 200) * 0.5,
      })),
    [embers],
  )

  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { stiffness: 60, damping: 24, mass: 0.6 })
  // travel fast and the light blooms; come to rest and the room settles
  const rush = useTransform(smooth, [-2600, 0, 2600], [1, 0, 1], { clamp: true })
  const bloomOpacity = useTransform(rush, [0, 1], [0.32, 0.85])
  const streakOpacity = useTransform(rush, [0, 1], [0, 0.5])
  const streakScale = useTransform(rush, [0, 1], [1, 1.35])

  /* ── the candle you carry ──
     A warm light that follows the pointer at a lag, so the whole page reads as
     lit by something being carried through it rather than evenly floodlit. One
     element, transform only. */
  const px = useMotionValue(-1000)
  const py = useMotionValue(-1000)
  const candleX = useSpring(px, { stiffness: 42, damping: 20, mass: 0.9 })
  const candleY = useSpring(py, { stiffness: 42, damping: 20, mass: 0.9 })

  useEffect(() => {
    if (reduce) return
    // fine pointers only — on touch there is nothing to follow
    if (!window.matchMedia('(pointer: fine)').matches) return
    const move = (e) => {
      px.set(e.clientX)
      py.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [px, py, reduce])

  if (reduce || typeof document === 'undefined') return null

  return createPortal(
    <div className="cinema" aria-hidden="true">
      {/* two slow blooms of warm light, breathing out of phase */}
      <motion.span className="cinema__bloom cinema__bloom--a" style={{ opacity: bloomOpacity }} />
      <motion.span className="cinema__bloom cinema__bloom--b" style={{ opacity: bloomOpacity }} />

      {/* light streaks that only appear while the camera is travelling */}
      <motion.span
        className="cinema__streaks"
        style={{ opacity: streakOpacity, scaleY: streakScale }}
      />

      {/* gilded embers rising continuously through the whole page */}
      <span className="cinema__embers">
        {motes.map((m, i) => (
          <span
            key={i}
            style={{
              left: `${m.left}%`,
              width: `${m.size}px`,
              height: `${m.size}px`,
              opacity: m.opacity,
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`,
              '--sway': `${m.sway}px`,
            }}
          />
        ))}
      </span>

      {/* the light being carried through the halls */}
      <motion.span className="cinema__candle" style={{ x: candleX, y: candleY }} />

      <span className="cinema__grain" />
    </div>,
    document.body,
  )
}

export default Cinema
