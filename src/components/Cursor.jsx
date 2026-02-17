import { useEffect, useRef, useState } from 'react'
import '../styles/components.css'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0

    const move = (e) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', move)

    const tick = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`
      }
      requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)
    document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={`cursor-ring ${hovered ? 'hovered' : ''}`} />
    </>
  )
}