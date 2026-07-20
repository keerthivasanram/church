import { useEffect, useState } from 'react'
import { useAnimate } from 'framer-motion'
import { site } from '../../data/siteContent'
import './Overture.css'

/**
 * The Overture — a choreographed cinematic entrance played once per session on
 * the home route. Black → a shaft of light opens → the ministry name settles →
 * the great doors part → the cathedral is revealed. Nothing simultaneous.
 */
function Overture({ onDone }) {
  const [scope, animate] = useAnimate()
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function run() {
      const ease = [0.16, 1, 0.3, 1]
      // 1 — a hairline of gold light appears and grows into a shaft
      await animate('.ov__light', { opacity: [0, 1], scaleY: [0.1, 1] }, { duration: 1.3, ease })
      if (cancelled) return
      // 2 — dust ignites in the light
      animate('.ov__dust', { opacity: [0, 1] }, { duration: 1.6, ease })
      // 3 — the ministry name settles in
      await animate('.ov__name', { opacity: [0, 1], y: [16, 0], letterSpacing: ['0.6em', '0.42em'] }, { duration: 1.4, ease })
      if (cancelled) return
      await animate('.ov__verse', { opacity: [0, 1], y: [12, 0] }, { duration: 1.1, ease })
      if (cancelled) return
      await new Promise((r) => setTimeout(r, 650))
      if (cancelled) return
      // 4 — the light floods, text lifts away
      animate('.ov__title-wrap', { opacity: [1, 0], y: [0, -20] }, { duration: 0.8, ease })
      animate('.ov__light', { opacity: [1, 0.9], scaleX: [1, 6] }, { duration: 1.4, ease })
      // 5 — the great doors part
      animate('.ov__door--l', { x: '-101%' }, { duration: 1.6, ease })
      await animate('.ov__door--r', { x: '101%' }, { duration: 1.6, ease })
      if (cancelled) return
      // 6 — dissolve the veil, reveal the nave
      await animate(scope.current, { opacity: 0 }, { duration: 0.5, ease })
      if (!cancelled) onDone()
    }
    run()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function skip() {
    if (skipped) return
    setSkipped(true)
    animate(scope.current, { opacity: 0 }, { duration: 0.5 }).then(onDone)
  }

  return (
    <div className="ov" ref={scope} role="presentation">
      <div className="ov__door ov__door--l" aria-hidden="true" />
      <div className="ov__door ov__door--r" aria-hidden="true" />
      <div className="ov__light" aria-hidden="true" />
      <div className="ov__dust" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => <span key={i} />)}
      </div>
      <div className="ov__title-wrap">
        <span className="ov__name">{site.name}</span>
        <span className="ov__verse">“Come, let us go up to the mountain of the Lord.”</span>
      </div>
      <button className="ov__skip" onClick={skip}>Enter →</button>
    </div>
  )
}

export default Overture
