import { useState } from 'react'
import { flushSync } from 'react-dom'
import './index.scss'

// The decorative <body> tag is the theme switch. Click the value and the new
// theme spreads out from the tag as a circle.
const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'dark'
  )
  const next = theme === 'dark' ? 'light' : 'dark'

  const commit = () => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch (e) {}
    setTheme(next)
  }

  const toggle = (e) => {
    const root = document.documentElement
    const r = e.currentTarget.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || reduce) {
      root.classList.add('theme-fade')
      commit()
      setTimeout(() => root.classList.remove('theme-fade'), 700)
      return
    }

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
    const t = document.startViewTransition(() => flushSync(commit))
    t.ready.then(() =>
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1100,
          easing: 'cubic-bezier(0.65, 0, 0.25, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    )
  }

  return (
    <button
      className="theme-tag"
      onClick={toggle}
      data-cursor={next}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      &lt;body <span className="attr">data-theme=</span>
      <span className="val-window">
        <span className="q">"</span><span key={theme} className="val">{theme}</span><span className="q">"</span>
      </span>
      &gt;
    </button>
  )
}

export default ThemeToggle
