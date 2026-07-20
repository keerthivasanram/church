import { useEffect, useRef, useState } from 'react'
import './Ambience.css'

/**
 * Optional cathedral ambience — a soft air bed with an occasional distant bell,
 * synthesised with the Web Audio API (no assets). Muted by default; only ever
 * starts from an explicit click, so it never violates autoplay policy.
 */
function Ambience() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const bellTimer = useRef(null)
  const nodesRef = useRef([])

  function buildAir(ctx, master) {
    // Pink-ish noise bed → gentle low-pass → very low gain, slowly breathing.
    const len = ctx.sampleRate * 3
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let b0 = 0, b1 = 0, b2 = 0
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99765 * b0 + white * 0.0990460
      b1 = 0.96300 * b1 + white * 0.2965164
      b2 = 0.57000 * b2 + white * 1.0526913
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.05
    }
    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.loop = true
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 480
    const g = ctx.createGain()
    g.gain.value = 0.5
    // slow breathing
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.06
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.18
    lfo.connect(lfoGain).connect(g.gain)
    src.connect(lp).connect(g).connect(master)
    src.start()
    lfo.start()
    nodesRef.current.push(src, lfo)
  }

  function strikeBell(ctx, master) {
    const now = ctx.currentTime
    const partials = [
      { f: 220, g: 0.5, d: 3.4 },
      { f: 220 * 2.0, g: 0.28, d: 2.4 },
      { f: 220 * 2.76, g: 0.18, d: 1.8 },
      { f: 220 * 5.4, g: 0.08, d: 1.1 },
    ]
    const bellGain = ctx.createGain()
    bellGain.gain.value = 0.06
    bellGain.connect(master)
    partials.forEach((p) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = p.f
      const env = ctx.createGain()
      env.gain.setValueAtTime(0.0001, now)
      env.gain.exponentialRampToValueAtTime(p.g, now + 0.012)
      env.gain.exponentialRampToValueAtTime(0.0001, now + p.d)
      osc.connect(env).connect(bellGain)
      osc.start(now)
      osc.stop(now + p.d + 0.1)
    })
  }

  function scheduleBell(ctx, master) {
    const next = 14000 + Math.random() * 12000
    bellTimer.current = setTimeout(() => {
      strikeBell(ctx, master)
      scheduleBell(ctx, master)
    }, next)
  }

  function enable() {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    ctxRef.current = ctx
    masterRef.current = master
    buildAir(ctx, master)
    // ease the master volume up
    master.gain.setValueAtTime(0.0001, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2.2)
    strikeBell(ctx, master)
    scheduleBell(ctx, master)
  }

  function disable() {
    clearTimeout(bellTimer.current)
    const ctx = ctxRef.current
    const master = masterRef.current
    if (ctx && master) {
      master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8)
      setTimeout(() => { ctx.close(); }, 900)
    }
    nodesRef.current = []
    ctxRef.current = null
    masterRef.current = null
  }

  function toggle() {
    setOn((v) => {
      const next = !v
      if (next) enable()
      else disable()
      return next
    })
  }

  useEffect(() => () => disable(), [])

  return (
    <button
      className={`ambience ${on ? 'is-on' : ''}`}
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute cathedral ambience' : 'Play cathedral ambience'}
      title={on ? 'Ambience on' : 'Ambience off'}
    >
      <span className="ambience__waves" aria-hidden="true">
        <span /><span /><span /><span />
      </span>
      <span className="ambience__label">{on ? 'Sound On' : 'Sound'}</span>
    </button>
  )
}

export default Ambience
