import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import './Colonnade.css'

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

function assetUrl(file) {
  return new URL(`../assets/images/ministries/${file}`, import.meta.url).href
}
function iconUrl(file) {
  return new URL(`../assets/images/ministries/icons/${file}`, import.meta.url).href
}

/**
 * One lit niche in the colonnade.
 *
 * Because the track is translated linearly, a niche is dead-centre at exactly
 * `index / (count - 1)` of the section's progress — so its focus can be derived
 * from the same scroll value rather than measuring positions every frame. The
 * centred niche stands up into the light; its neighbours sink back and dim.
 */
function Niche({ progress, item, index, count }) {
  const step = count > 1 ? 1 / (count - 1) : 1
  const centre = index * step

  /* A plateau around the centre, not a simple peak. With a straight linear
     falloff nothing is ever fully lit except at the exact instant a niche is
     dead-centre — measured brightest-niche opacity sagged to 0.72 for most of
     the travel and the whole hall read as washed out. This holds a niche at
     full light while it is in front of you and only dims in the gap between. */
  const focus = useTransform(
    progress,
    [centre - step, centre - step * 0.34, centre, centre + step * 0.34, centre + step],
    [0, 0.92, 1, 0.92, 0],
    { clamp: true },
  )
  const scale = useTransform(focus, [0, 1], [0.88, 1])
  const y = useTransform(focus, [0, 1], [22, -12])
  const opacity = useTransform(focus, [0, 1], [0.5, 1])
  const glow = useTransform(focus, [0, 1], [0, 1])

  return (
    <motion.div className="colonnade__niche" style={{ scale, y, opacity }}>
      <div className="colonnade__recess arch">
        <img src={assetUrl(item.image)} alt={item.name} />
        {/* the shaft of light that falls into the niche when it is centred */}
        <motion.span className="colonnade__light" style={{ opacity: glow }} aria-hidden="true" />
      </div>

      <motion.span className="colonnade__medallion" style={{ opacity: glow }}>
        <img src={iconUrl(item.icon)} alt="" />
      </motion.span>

      <span className="colonnade__label">
        <em className="colonnade__numeral">{NUMERALS[index] || index + 1}</em>
        {item.name}
      </span>
    </motion.div>
  )
}

/**
 * THE COLONNADE — the ministries as a hall you are carried down.
 *
 * The stage pins and the arcade of niches travels sideways past a fixed eye, so
 * scrolling down the page reads as walking along a wall. Only the niche in front
 * of you is fully lit; the rest are set back in shadow.
 *
 * Deliberately name-and-image only: five of the six ministries still carry CMS
 * placeholder copy, and repeating that filler six times would cheapen the hall.
 */
function Colonnade({ items }) {
  const ref = useRef(null)
  const stageRef = useRef(null)
  const trackRef = useRef(null)
  const reduce = useReducedMotion()
  const count = items.length

  // how far the track has to travel for its last niche to reach the eye
  const [span, setSpan] = useState(0)
  useEffect(() => {
    if (reduce) return
    const measure = () => {
      const track = trackRef.current
      const stage = stageRef.current
      if (!track || !stage) return
      setSpan(Math.max(0, track.scrollWidth - stage.clientWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    if (stageRef.current) ro.observe(stageRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [reduce, count])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -span])
  const sweep = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  if (reduce) {
    return (
      <div className="colonnade colonnade--static">
        {items.map((item, i) => (
          <div className="colonnade__niche" key={item.name}>
            <div className="colonnade__recess arch">
              <img src={assetUrl(item.image)} alt={item.name} />
            </div>
            <span className="colonnade__medallion"><img src={iconUrl(item.icon)} alt="" /></span>
            <span className="colonnade__label">
              <em className="colonnade__numeral">{NUMERALS[i] || i + 1}</em>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="colonnade" ref={ref} style={{ height: `calc(100vh + ${count * 42}vh)` }}>
      <div className="colonnade__stage" ref={stageRef}>
        <motion.div className="colonnade__track" ref={trackRef} style={{ x }}>
          {items.map((item, i) => (
            <Niche key={item.name} progress={scrollYProgress} item={item} index={i} count={count} />
          ))}
        </motion.div>

        {/* the floor of the hall, with the light you carry along it */}
        <div className="colonnade__floor" aria-hidden="true">
          <motion.span className="colonnade__floor-light" style={{ left: sweep }} />
        </div>
      </div>
    </div>
  )
}

export default Colonnade
