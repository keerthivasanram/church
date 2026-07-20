import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import Header from './Header'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import ScrollToTop from './ScrollToTop'
import Overture from './motion/Overture'
import Ambience from './Ambience'

function Layout() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const lenisRef = useRef(null)

  // The Overture plays once per session, at the entrance (home), unless reduced motion.
  const [overture, setOverture] = useState(
    () => !reduce && pathname === '/' && typeof sessionStorage !== 'undefined' && !sessionStorage.getItem('overture-seen'),
  )

  // Cinematic smooth scroll — slow, weighted, like gliding through a basilica.
  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis
    let raf
    function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduce])

  // Lock scroll while the Overture holds the threshold.
  useEffect(() => {
    if (overture) {
      lenisRef.current?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenisRef.current?.start()
      document.body.style.overflow = ''
    }
  }, [overture])

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  function finishOverture() {
    sessionStorage.setItem('overture-seen', '1')
    setOverture(false)
  }

  return (
    <>
      <AnimatePresence>{overture && <Overture key="overture" onDone={finishOverture} />}</AnimatePresence>
      <ScrollProgress />
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={reduce ? false : { opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduce ? undefined : { opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
      <Ambience />
    </>
  )
}

export default Layout
