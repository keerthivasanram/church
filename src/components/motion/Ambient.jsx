import { useReducedMotion } from 'framer-motion'
import './Ambient.css'

/**
 * Cinematic atmosphere layer — volumetric god-rays, drifting incense/dust motes,
 * and slow fog. Drop inside any position:relative section, behind its content.
 * `tone`: 'gold' (light halls) | 'dark' (shadowed naves).
 */
function Ambient({ rays = true, dust = true, fog = false, sparkles = false, tone = 'gold' }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <div className={`ambient ambient--${tone}`} aria-hidden="true">
      {rays && (
        <div className="ambient__rays">
          <span /><span /><span />
        </div>
      )}
      {fog && <div className="ambient__fog" />}
      {dust && (
        <div className="ambient__dust">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      )}
      {sparkles && (
        <div className="ambient__sparkles">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Ambient
