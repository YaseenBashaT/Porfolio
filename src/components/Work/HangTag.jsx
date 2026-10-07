import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import ProjectArt from './ProjectArt'

// A project tag hanging from the cursor on a string. It swings with how fast
// the pointer moves sideways (damped pendulum).
const HangTag = ({ item }) => {
  const root = useRef(null)
  const swing = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let x = -200, y = -200, px = -200, ang = 0, vel = 0, raf
    const move = (e) => {
      x = e.clientX
      y = e.clientY
    }
    const loop = () => {
      const dx = x - px
      px = x
      const target = Math.max(-38, Math.min(38, dx * 1.4))
      vel += (target - ang) * 0.07
      vel *= 0.9
      ang += vel
      root.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      swing.current.style.transform = `rotate(${ang.toFixed(2)}deg)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    window.addEventListener('mousemove', move)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
    }
  }, [])

  // portal: .route's entrance animation would otherwise trap position:fixed
  return createPortal(
    <div ref={root} className={`hang ${item ? 'on' : ''}`} aria-hidden="true">
      <div ref={swing} className="hang-swing">
        <i className="hang-string" />
        <div className="hang-card">
          {item && <ProjectArt name={item.art} />}
          <b>{item?.title}</b>
          <span>{item?.stack}</span>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default HangTag
