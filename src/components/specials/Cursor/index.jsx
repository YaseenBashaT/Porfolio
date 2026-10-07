import { useEffect, useRef } from 'react'
import './index.scss'

// Dot snaps to the pointer, outline trails it. Links grow the outline;
// anything with data-cursor="label" turns it into a labelled disc.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.documentElement.classList.add('has-cursor')

    let x = -100, y = -100, rx = -100, ry = -100, raf
    const ringEl = ring.current

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      ringEl.classList.remove('is-hidden')
      dot.current.classList.remove('is-hidden')
    }
    const onOver = (e) => {
      const t = e.target.closest?.('a, button, [data-cursor]')
      const custom = t?.dataset.cursor
      ringEl.dataset.state = custom ? 'label' : t ? 'link' : ''
      label.current.textContent = custom || ''
    }
    const onDown = () => ringEl.classList.add('is-down')
    const onUp = () => ringEl.classList.remove('is-down')
    const onLeave = () => {
      ringEl.classList.add('is-hidden')
      dot.current.classList.add('is-hidden')
    }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot is-hidden" />
      <div ref={ring} className="cursor-outline is-hidden">
        <span ref={label} className="cursor-label" />
      </div>
    </>
  )
}
