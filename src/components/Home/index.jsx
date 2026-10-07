import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLetters from '../AnimatedLetters'
import LogoTitle from '../../assets/images/logo-y.png'
import useMagnetic from '../../hooks/useMagnetic'
import './index.scss'

const roles = [
  'Full-stack developer',
  'Open-source contributor',
  'Hackathon builder',
  'RL & LLM tooling',
]

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [role, setRole] = useState(0)
  const portrait = useRef(null)
  const nameArray = ['a', 's', 'e', 'e', 'n']

  useMagnetic()

  useEffect(() => {
    const t = setTimeout(() => setLetterClass('text-animate-hover'), 3200)
    const r = setInterval(() => setRole((n) => (n + 1) % roles.length), 2600)
    return () => {
      clearTimeout(t)
      clearInterval(r)
    }
  }, [])

  // photo card tilts toward the pointer, layers move at different depths
  const onMove = (e) => {
    const el = portrait.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-py * 7).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`)
    el.style.setProperty('--px', px.toFixed(3))
    el.style.setProperty('--py', py.toFixed(3))
  }
  const onLeave = () => {
    const el = portrait.current
    ;['--rx', '--ry', '--px', '--py'].forEach((v) => el.style.removeProperty(v))
  }

  return (
    <div className="home">
      <div className="text-zone">
        <p className="eyebrow">
          <span className="dot" /> Final-year AI &amp; ML · open to internships
        </p>
        <h1>
          Hello there, <br /> I'm
          <img className="title-img" src={LogoTitle} alt="Y" />
          <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
          <br />
          developer
        </h1>
        <h2>
          <span className="role-window">
            <span key={role} className="role">{roles[role]}</span>
          </span>
          <span className="sep">/</span> Python, React, RL
        </h2>
        <div className="cta">
          <Link to="/work" className="btn btn-fill" data-magnetic>
            <span>View my work</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link to="/contact" className="btn btn-line" data-magnetic>
            <span>Contact me</span>
          </Link>
          <a
            className="btn btn-text"
            href="/Yaseen_Basha_Thippaluri_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            data-magnetic
          >
            <span>Resume</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
            </svg>
          </a>
        </div>
      </div>

      <div
        className="portrait"
        ref={portrait}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="portrait-frame" />
        <div className="portrait-card">
          <div className="portrait-grid" />
          <span className="portrait-big">YB</span>
          <div className="portrait-empty">
            <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="60" cy="46" r="20" />
              <path d="M20 108c4-24 20-36 40-36s36 12 40 36" />
            </svg>
            <span>Photo coming soon</span>
          </div>
          <span className="chip chip-a">Final-year · AI &amp; ML</span>
          <span className="chip chip-b">12th of 31,000+ · OpenEnv</span>
        </div>
        <svg className="badge" viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text>
            <textPath href="#circ">SHIPPING · LEARNING · SHIPPING · LEARNING ·</textPath>
          </text>
          <circle cx="60" cy="60" r="4" />
        </svg>
      </div>
    </div>
  )
}

export default Home
