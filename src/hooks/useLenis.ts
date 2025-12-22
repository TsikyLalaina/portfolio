import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useMobile } from './useMobile'

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  const isMobile = useMobile()

  useEffect(() => {
    if (isMobile) {
      // Don't initialize Lenis on mobile, use native scroll
      lenisRef.current = null
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false, // Ensure this is false or just relying on conditional init
    })
    lenisRef.current = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [isMobile])

  return lenisRef
}


