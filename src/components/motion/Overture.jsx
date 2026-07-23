import { useEffect, useState } from 'react'
import { useAnimate } from 'framer-motion'
import { site } from '../../data/siteContent'
import flameMark from '../../assets/images/site/flame-mark.png'
import './Overture.css'

/**
 * The Overture — GPU-Accelerated Smooth Loading Reveal.
 *
 * 1. Flame logo materialises with GPU scale + opacity transition
 * 2. Ministry title & tagline gracefully slide up
 * 3. Particle sparks burst outward radially
 * 4. Hardware-accelerated golden halo ring expands smoothly
 * 5. Soft curtain dissolve reveals the main website seamlessly
 */
function Overture({ onDone }) {
  const [scope, animate] = useAnimate()
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function run() {
      // Smooth entrance curve
      const entranceEase = [0.16, 1, 0.3, 1]
      // Ultra-gentle slow cinematic exit curve
      const exitEase = [0.25, 1, 0.4, 1]

      // ── 1. Flame logo materialises gracefully ──
      await animate('.ov__flame', {
        opacity: [0, 1],
        scale: [0.8, 1],
        y: [12, 0]
      }, { duration: 0.8, ease: entranceEase })
      if (cancelled) return

      // ── 2. Name + tagline appear ──
      animate('.ov__name', {
        opacity: [0, 1],
        y: [10, 0],
        letterSpacing: ['0.6em', '0.45em']
      }, { duration: 0.7, ease: entranceEase })

      await animate('.ov__tagline', {
        opacity: [0, 0.7],
        y: [8, 0]
      }, { duration: 0.6, delay: 0.1, ease: entranceEase })
      if (cancelled) return

      // Hold for 600ms so user absorbs the logo
      await new Promise((r) => setTimeout(r, 600))
      if (cancelled) return

      // ── 3. Sparks drift outward slowly ──
      animate('.ov__sparks', { opacity: [0, 1] }, { duration: 0.3 })

      const sparkEls = scope.current?.querySelectorAll('.ov__sparks span')
      if (sparkEls && sparkEls.length > 0) {
        const count = sparkEls.length
        sparkEls.forEach((spark, i) => {
          const angle = ((360 / count) * i * Math.PI) / 180
          const dist = 160 + Math.random() * 80
          const tx = Math.cos(angle) * dist
          const ty = Math.sin(angle) * dist
          animate(spark, {
            x: [0, tx],
            y: [0, ty],
            opacity: [1, 0],
            scale: [1, 0.2]
          }, { duration: 1.4, delay: i * 0.02, ease: exitEase })
        })
      }

      // ── 4. Golden halo ring expands slowly over 1.6s ──
      animate('.ov__ring', {
        scale: [0.2, 16],
        opacity: [0.9, 0]
      }, { duration: 1.6, ease: exitEase })

      // ── 5. Flame + text dissolve slowly & gently ──
      animate('.ov__flame', {
        opacity: [1, 0],
        scale: [1, 1.2],
        y: [0, -16]
      }, { duration: 1.2, ease: exitEase })

      // ── 6. Background curtain smoothly fades out over 1.2s ──
      await animate('.ov__bg', {
        opacity: [1, 0],
        scale: [1, 1.05]
      }, { duration: 1.2, delay: 0.15, ease: exitEase })
      if (cancelled) return

      // Final smooth fade out
      await animate(scope.current, { opacity: 0 }, { duration: 0.4 })
      if (!cancelled) onDone()
    }
    run()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function skip() {
    if (skipped) return
    setSkipped(true)
    animate(scope.current, { opacity: 0 }, { duration: 0.25 }).then(onDone)
  }

  return (
    <div className="ov" ref={scope} role="presentation">
      <div className="ov__bg" />

      {/* Hardware-accelerated expanding ring */}
      <div className="ov__ring" aria-hidden="true" />

      {/* Spark particles */}
      <div className="ov__sparks" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => <span key={i} />)}
      </div>

      {/* Centre flame + text */}
      <div className="ov__flame">
        <div className="ov__flame-glow" aria-hidden="true" />
        <img className="ov__flame-img" src={flameMark} alt="" />
        <div className="ov__title-wrap">
          <span className="ov__name">{site.name}</span>
          <span className="ov__tagline">Encounter Christ</span>
        </div>
      </div>

      <button className="ov__skip" onClick={skip}>Enter →</button>
    </div>
  )
}

export default Overture
