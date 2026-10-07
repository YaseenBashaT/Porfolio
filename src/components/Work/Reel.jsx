import { useEffect, useRef, useState } from 'react'

// Pinned horizontal reel. The tall outer box gives vertical scroll distance;
// the sticky stage stays on screen while that distance is converted into
// sideways travel of the track. A thread through the card pins draws as you go.
const MQ = '(min-width: 1101px) and (min-height: 860px)'
const pad = (n) => String(n).padStart(2, '0')

const Reel = ({ count, children }) => {
  const reel = useRef(null)
  const stage = useRef(null)
  const track = useRef(null)
  const base = useRef(null)
  const thread = useRef(null)
  const fill = useRef(null)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia(MQ)
    const scroller = reel.current.closest('.page')
    let travel = 0, len = 0, raf = 0, startX = 0, endX = 1

    const update = () => {
      raf = 0
      if (!mq.matches) return
      const top = reel.current.getBoundingClientRect().top
      const p = travel ? Math.min(1, Math.max(0, -top / travel)) : 0
      const reach = p * travel + stage.current.clientWidth
      const drawn = Math.min(1, Math.max(0, (reach - startX) / (endX - startX)))
      track.current.style.transform = `translate3d(${-p * travel}px, 0, 0)`
      thread.current.style.strokeDashoffset = len * (1 - drawn)
      fill.current.style.transform = `scaleX(${p})`
      setIdx(Math.round(p * (count - 1)))
    }
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const layout = () => {
      if (!mq.matches) {
        reel.current.style.height = ''
        track.current.style.width = ''
        stage.current.style.width = ''
        track.current.style.transform = ''
        return
      }
      // run to the real screen edge, even where .work is width-capped
      stage.current.style.width = ''
      const right = scroller.getBoundingClientRect().left + scroller.clientWidth
      stage.current.style.width = `${right - stage.current.getBoundingClientRect().left}px`
      // size the track from the cards themselves: `width: max-content` is
      // measured differently by Firefox and over-counts this flex row
      const cards = [...track.current.querySelectorAll('.card')]
      const last = cards[cards.length - 1]
      const padRight = parseFloat(getComputedStyle(track.current).paddingRight)
      const w = last.offsetLeft + last.offsetWidth + padRight
      track.current.style.width = `${w}px`
      travel = Math.max(0, w - stage.current.clientWidth)
      reel.current.style.height = `${stage.current.clientHeight + travel}px`

      // thread: smooth S-curves through each card's pin
      const pts = cards.map((c) => [
        c.offsetLeft + c.offsetWidth / 2,
        c.offsetTop,
      ])
      startX = Math.max(0, pts[0][0] - 220)
      endX = pts[pts.length - 1][0]
      let [px, py] = [startX, pts[0][1] + 30]
      let d = `M ${px} ${py}`
      pts.forEach(([x, y]) => {
        const mx = (px + x) / 2
        d += ` C ${mx} ${py} ${mx} ${y} ${x} ${y}`
        ;[px, py] = [x, y]
      })
      base.current.setAttribute('d', d)
      thread.current.setAttribute('d', d)
      len = thread.current.getTotalLength()
      thread.current.style.strokeDasharray = len
      update()
    }

    layout()
    scroller.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', layout)
    mq.addEventListener('change', layout)
    const ro = new ResizeObserver(layout)
    ro.observe(track.current)
    document.fonts?.ready.then(layout)
    return () => {
      cancelAnimationFrame(raf)
      scroller.removeEventListener('scroll', request)
      window.removeEventListener('resize', layout)
      mq.removeEventListener('change', layout)
      ro.disconnect()
    }
  }, [count])

  return (
    <div className="reel" ref={reel}>
      <div className="reel-stage" ref={stage}>
        <div className="reel-track" ref={track}>
          <svg className="thread" aria-hidden="true">
            <path ref={base} className="thread-base" />
            <path ref={thread} className="thread-line" />
          </svg>
          {children}
        </div>
        <div className="reel-hud" aria-hidden="true">
          <span className="reel-label">01 · Selected projects</span>
          <span className="reel-count">
            <b>{pad(idx + 1)}</b> / {pad(count)}
          </span>
          <i className="reel-bar">
            <b ref={fill} />
          </i>
        </div>
      </div>
    </div>
  )
}

export default Reel
