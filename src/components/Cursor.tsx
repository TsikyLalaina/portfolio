import { useEffect, useRef } from 'react'

// Champagne dot + trailing ring. Renders nothing on touch devices (CSS hides it).
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let x = -100, y = -100
    let rx = -100, ry = -100
    let raf = 0

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], .work-row, input, textarea, select')
      ring.classList.toggle('hovering', !!interactive)
    }

    const tick = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      const size = ring.offsetWidth
      ring.style.transform = `translate(${rx - size / 2}px, ${ry - size / 2}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  )
}
