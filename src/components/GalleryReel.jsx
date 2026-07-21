import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Magnetic from './motion/Magnetic'
import './GalleryReel.css'

/** How far outside the frame a plate may start, scaled to the room available.
 *  The approach distances are tuned for a desktop stage; on a phone they are
 *  wider than the screen, so a plate would simply appear at the edge instead of
 *  being seen to travel. */
function useReach() {
  const [reach, setReach] = useState(1)
  useEffect(() => {
    const measure = () => setReach(Math.min(1, window.innerWidth / 1180))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  return reach
}

/* Each photograph is carried in from a different quarter of the room and set
   down square in the same frame. The variety is in the approach, not the
   landing — every plate lands at exactly 0,0 with no rotation, so the frame
   reads as a fixed point the images are being placed into. */
const APPROACH = [
  { x: -340, y: -250, rot: -14 },  // over the left shoulder
  { x: 400, y: -50, rot: 12 },     // in from the right
  { x: -310, y: 270, rot: -9 },    // up from below left
  { x: 350, y: -260, rot: 14 },    // down from the right
  { x: -400, y: 70, rot: -12 },    // straight in from the left
  { x: 310, y: 260, rot: 9 },      // up from below right
]

/**
 * One plate in the sequence. Its whole life — arrive, hold, leave — is scrubbed
 * by the section's scroll progress across the slice of the timeline it owns, so
 * exactly one photograph is ever on the frame.
 */
function ReelPlate({ progress, img, index, count, reach }) {
  const slice = 1 / count
  const start = index * slice
  const end = start + slice
  const isLast = index === count - 1

  /* Each plate starts its approach *before* its own slot so it is already on
     its way in while the previous one recedes. Without this lead the frame
     flashes empty at every hand-off (measured: opacity peaked at 0.10 between
     photographs). The first plate has no room to lead, so it simply arrives
     quickly rather than leaving the frame blank as the stage pins. */
  const lead = slice * 0.28
  const appear = Math.max(0, start - lead)
  const landed = start + slice * 0.3
  const leaving = start + slice * 0.7
  const gone = start + slice * 0.9
  /* The arriving plate goes solid almost at once. It reads as arriving from the
     scale and travel alone, so fading it in as well only produced a stretch
     where two half-transparent photographs overlapped and the whole stage
     looked washed out. Solid card slides over the receding one instead — and
     since it is always the later index, DOM order already puts it on top. */
  const lit = appear + (landed - appear) * 0.12

  const base = APPROACH[index % APPROACH.length]
  const a = { x: base.x * reach, y: base.y * reach, rot: base.rot }

  // the last photograph holds where it landed while the stage unpins, rather
  // than receding out of an empty frame
  const stops = isLast ? [appear, landed, 1] : [appear, landed, leaving, end]
  const hold = (from, to) => (isLast ? [from, 0, 0] : [from, 0, 0, to])

  const x = useTransform(progress, stops, hold(a.x, a.x * 0.22))
  const y = useTransform(progress, stops, hold(a.y, a.y * 0.22 - 40))
  const rotate = useTransform(progress, stops, hold(a.rot, a.rot * -0.3))
  const scale = useTransform(
    progress,
    stops,
    isLast ? [0.52, 1, 1] : [0.52, 1, 1, 0.86],
  )
  const opacity = useTransform(
    progress,
    isLast ? [appear, lit, 1] : [appear, lit, leaving, gone],
    isLast ? [0, 1, 1] : [0, 1, 1, 0],
  )

  /* ── depth ──
     The plate banks in three dimensions on the way in: a card coming from the
     left is turned away from the eye and rotates square as it registers. Derived
     from the approach vector so the turn always agrees with the travel. */
  const ry = Math.max(-22, Math.min(22, (-a.x / 400) * 20))
  const rx = Math.max(-14, Math.min(14, (a.y / 300) * 11))
  const rotateY = useTransform(progress, stops, hold(ry, ry * -0.35))
  const rotateX = useTransform(progress, stops, hold(rx, rx * -0.35))

  /* The photograph inside lags the card, so the frame reads as a window with
     something behind it rather than a flat print. */
  const innerX = useTransform(progress, [appear, landed], [-a.x * 0.13, 0])
  const innerY = useTransform(progress, [appear, landed], [-a.y * 0.13, 0])

  /* A cast shadow that is wide and soft while the plate is far out, and draws
     in tight as it sets down. */
  const shadeScale = useTransform(progress, stops, hold(1.35, 1.2))
  const shadeOpacity = useTransform(
    progress,
    [appear, landed, leaving, end],
    [0.45, 0.85, 0.85, 0],
  )

  /* A bar of gold light crossing the glass at the moment it registers. */
  const flareX = useTransform(progress, [lit, landed, landed + slice * 0.16], ['-130%', '10%', '140%'])
  const flareOpacity = useTransform(progress, [lit, landed, landed + slice * 0.16], [0, 1, 0])

  return (
    <motion.figure
      className="reel__plate"
      style={{ x, y, rotate, rotateX, rotateY, scale, opacity, transformPerspective: 1500 }}
    >
      <motion.span
        className="reel__shade"
        style={{ scale: shadeScale, opacity: shadeOpacity }}
        aria-hidden="true"
      />
      <div className="reel__photo">
        <motion.img
          src={img.thumb}
          alt={`Gallery photo ${img.id}`}
          style={{ x: innerX, y: innerY }}
        />
        <motion.span
          className="reel__flare"
          style={{ x: flareX, opacity: flareOpacity }}
          aria-hidden="true"
        />
      </div>
    </motion.figure>
  )
}

/**
 * THE REEL — the gallery as a sequence rather than a wall.
 *
 * The stage pins while the section passes, and the photographs are dealt into a
 * single small square frame at the centre one after another: each flies in from
 * a different quarter, squares up perfectly in the frame, holds, then recedes as
 * the next one arrives. Nothing fades in place and nothing scrolls past — the
 * scroll is driving a sequence, not moving a layout.
 *
 * Under reduced motion the whole conceit collapses to a plain static grid.
 */
function GalleryReel({ images }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const reach = useReach()
  const count = images.length

  // progress runs 0 → 1 over exactly the span the stage stays pinned
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const activeIndex = useTransform(scrollYProgress, (v) =>
    Math.min(count, Math.floor(v * count) + 1),
  )
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  if (reduce) {
    return (
      <div className="reel reel--static">
        {images.map((img) => (
          <figure className="reel__plate" key={img.id}>
            <img src={img.thumb} alt={`Gallery photo ${img.id}`} />
          </figure>
        ))}
      </div>
    )
  }

  return (
    <div
      className="reel"
      ref={ref}
      /* one viewport to pin in, plus a beat of travel per photograph */
      style={{ height: `calc(100vh + ${count * 78}vh)` }}
    >
      <div className="reel__stage">
        <div className="reel__frame">
          {/* the frame the photographs are being set into — it never moves */}
          <span className="reel__corner reel__corner--tl" aria-hidden="true" />
          <span className="reel__corner reel__corner--tr" aria-hidden="true" />
          <span className="reel__corner reel__corner--bl" aria-hidden="true" />
          <span className="reel__corner reel__corner--br" aria-hidden="true" />

          <div className="reel__window">
            {images.map((img, i) => (
              <ReelPlate key={img.id} progress={scrollYProgress} img={img} index={i} count={count} reach={reach} />
            ))}
          </div>
        </div>

        <div className="reel__meta">
          <motion.span className="reel__count">{activeIndex}</motion.span>
          <span className="reel__rail" aria-hidden="true">
            <motion.span className="reel__rail-fill" style={{ scaleX: railScale }} />
          </span>
          <span className="reel__total">{String(count).padStart(2, '0')}</span>
        </div>

        <Magnetic className="reel__cta"><Link to="/gallery" className="btn btn-ghost">View Full Gallery</Link></Magnetic>
      </div>
    </div>
  )
}

export default GalleryReel
