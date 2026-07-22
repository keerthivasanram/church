import { useEffect, useState } from 'react'
import { useAnimate } from 'framer-motion'
import { site } from '../../data/siteContent'
import flameMark from '../../assets/images/site/flame-mark.png'
import './Overture.css'

/**
 * The Overture — a radial iris reveal.
 *
 * 1. Flame logo materialises with a warm pulsing glow
 * 2. Ministry name fades in beneath
 * 3. Sparks burst outward from the flame
 * 4. A golden ring expands from centre
 * 5. The entire overlay scales up + fades, revealing the page
 *
 * Total runtime: ~2.2s — fast, elegant, smooth.
 */
function Overture({ onDone }) {
  const [scope, animate] = useAnimate()
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function run() {
      const snap = [0.22, 1, 0.36, 1]
      const silk = [0.16, 1, 0.3, 1]

      // ── 1. Flame logo materialises ──
      await animate('.ov__flame', {
        opacity: [0, 1],
        scale: [0.6, 1],
        filter: ['blur(10px)', 'blur(0px)']
      }, { duration: 0.5, ease: snap })
      if (cancelled) return

      // ── 2. Name + tagline appear ──
      animate('.ov__name', {
        opacity: [0, 1],
        y: [14, 0],
        letterSpacing: ['0.7em', '0.5em']
      }, { duration: 0.4, ease: snap })

      await animate('.ov__tagline', {
        opacity: [0, 0.55],
        y: [10, 0]
      }, { duration: 0.35, delay: 0.08, ease: snap })
      if (cancelled) return

      // Brief hold
      await new Promise((r) => setTimeout(r, 350))
      if (cancelled) return

      // ── 3. Sparks burst outward ──
      animate('.ov__sparks', { opacity: [0, 1] }, { duration: 0.15 })

      const sparkEls = scope.current?.querySelectorAll('.ov__sparks span')
      if (sparkEls) {
        const angles = []
        const count = sparkEls.length
        for (let i = 0; i < count; i++) {
          angles.push((360 / count) * i)
        }
        sparkEls.forEach((spark, i) => {
          const angle = (angles[i] * Math.PI) / 180
          const dist = 120 + Math.random() * 80
          const tx = Math.cos(angle) * dist
          const ty = Math.sin(angle) * dist
          animate(spark, {
            x: [0, tx],
            y: [0, ty],
            opacity: [1, 0],
            scale: [1, 0.3]
          }, { duration: 0.6, ease: silk })
        })
      }

      // ── 4. Golden ring expands from centre ──
      const vw = Math.max(window.innerWidth, window.innerHeight) * 2.5
      animate('.ov__ring', {
        width: [0, vw],
        height: [0, vw],
        opacity: [0.9, 0]
      }, { duration: 0.8, ease: snap })

      // Flame + text lift away
      animate('.ov__flame', {
        opacity: [1, 0],
        scale: [1, 1.3],
        filter: ['blur(0px)', 'blur(6px)']
      }, { duration: 0.4, ease: snap })

      animate('.ov__title-wrap', {
        opacity: [1, 0],
        y: [0, -20]
      }, { duration: 0.3, ease: snap })

      // ── 5. Background scales up + fades — reveals page ──
      await animate('.ov__bg', {
        scale: [1, 1.3],
        opacity: [1, 0]
      }, { duration: 0.6, delay: 0.15, ease: silk })
      if (cancelled) return

      // Final dissolve
      await animate(scope.current, { opacity: 0 }, { duration: 0.15 })
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

      {/* Expanding ring */}
      <div className="ov__ring" aria-hidden="true" />

      {/* Spark particles */}
      <div className="ov__sparks" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
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
