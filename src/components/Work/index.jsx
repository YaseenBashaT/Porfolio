import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLetters from '../AnimatedLetters'
import ProjectArt, { Peek } from './ProjectArt'
import HangTag from './HangTag'
import Reel from './Reel'
import useReveal from '../../hooks/useReveal'
import { featured, more, opensource, more_os, hackathons } from './data'
import './index.scss'

// per-card layout on the reel: width, drop from the top, resting tilt
const deal = [
  { '--w': '560px', '--y': '0px', '--r': '-1.1deg' },
  { '--w': '620px', '--y': '34px', '--r': '0.9deg' },
  { '--w': '520px', '--y': '14px', '--r': '-0.7deg' },
  { '--w': '580px', '--y': '56px', '--r': '1.2deg' },
  { '--w': '520px', '--y': '6px', '--r': '-1deg' },
  { '--w': '560px', '--y': '56px', '--r': '0.8deg' },
]

const sections = [
  { id: 'projects', n: '01', label: 'Projects' },
  { id: 'opensource', n: '02', label: 'Open source' },
  { id: 'hackathons', n: '03', label: 'Hackathons & more' },
]

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
)

// count 0 → value once visible
const Counter = ({ value }) => {
  const el = useRef(null)
  useEffect(() => {
    const node = el.current
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1)
        node.textContent = Math.round(value * (1 - Math.pow(1 - p, 4)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(node)
    return () => io.disconnect()
  }, [value])
  return <span ref={el}>0</span>
}

// card tilts and a hairline highlight follows the pointer
const tiltMove = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.style.setProperty('--mx', `${x * 100}%`)
  el.style.setProperty('--my', `${y * 100}%`)
  el.style.setProperty('--rx', `${((0.5 - y) * 5).toFixed(2)}deg`)
  el.style.setProperty('--ry', `${((x - 0.5) * 6).toFixed(2)}deg`)
  const a = el.querySelector('.card-art').getBoundingClientRect()
  el.style.setProperty('--ax', `${e.clientX - a.left}px`)
  el.style.setProperty('--ay', `${e.clientY - a.top}px`)
}
const tiltLeave = (e) => {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

// GitHub-style diff squares from "+86 −2"
const DiffBlocks = ({ diff }) => {
  const [, a, d] = diff.match(/\+(\d+)(?:\s*[−-](\d+))?/) || []
  const add = Number(a), del = Number(d || 0)
  const dels = del ? Math.max(1, Math.round((5 * del) / (add + del))) : 0
  return (
    <span className="diff" title={diff} aria-label={diff}>
      {[0, 1, 2, 3, 4].map((n) => (
        <i key={n} className={n < 5 - dels ? 'add' : 'del'} style={{ '--n': n }} />
      ))}
    </span>
  )
}

const Work = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [active, setActive] = useState('projects')
  const [tag, setTag] = useState(null)
  useReveal()

  useEffect(() => {
    const t = setTimeout(() => setLetterClass('text-animate-hover'), 2600)
    return () => clearTimeout(t)
  }, [])

  // highlight the section currently crossing the middle of the viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach(({ id }) => io.observe(document.getElementById(id)))
    return () => io.disconnect()
  }, [])

  const goTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const mergedCount = opensource.reduce(
    (n, o) => n + o.prs.filter((p) => p.status === 'merged').length,
    0
  )
  const openCount = opensource.reduce(
    (n, o) => n + o.prs.filter((p) => p.status === 'open').length,
    0
  )

  return (
    <div className="work">
      <HangTag item={tag} />
      <header className="work-hero">
        <p className="kicker" data-reveal>
          <span>Index</span> 2023 — now
        </p>
        <h1 className="work-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={['W', 'o', 'r', 'k']}
            idx={6}
          />
        </h1>
        <p className="lede" data-reveal style={{ '--d': 200 }}>
          Things I have <em>built</em>, code I have <em>merged</em> into projects
          other people depend on, and what I made in a weekend with a deadline.
        </p>
        <dl className="stats" data-reveal style={{ '--d': 350 }}>
          <div>
            <dt>Projects</dt>
            <dd><Counter value={featured.length + more.length} /></dd>
          </div>
          <div>
            <dt>Merged PRs</dt>
            <dd><Counter value={mergedCount} /></dd>
          </div>
          <div>
            <dt>Open PRs</dt>
            <dd><Counter value={openCount} /></dd>
          </div>
          <div>
            <dt>Hackathons</dt>
            <dd><Counter value={hackathons.filter((h) => h.tag === 'Hackathon').length} /></dd>
          </div>
        </dl>
      </header>

      <div className="work-body">
        <aside className="rail">
          <ul>
            {sections.map((s) => (
              <li key={s.id} className={active === s.id ? 'on' : ''}>
                <a href={`#${s.id}`} onClick={goTo(s.id)}>
                  <b>{s.n}</b>
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="work-main">
          {/* ---------------- 01 projects ---------------- */}
          <section id="projects">
            <div className="sec-head" data-reveal>
              <span className="sec-n">01</span>
              <h2>Selected <em>projects</em></h2>
            </div>

            <Reel count={featured.length}>
              {featured.map((p, i) => (
                <article
                  key={p.id}
                  className="card"
                  data-reveal
                  style={{ '--d': 0, ...deal[i % deal.length] }}
                  onMouseMove={tiltMove}
                  onMouseLeave={tiltLeave}
                >
                  <div className="card-inner">
                    <div className="card-art">
                      <ProjectArt name={p.art} />
                      <Peek name={p.art} items={p.peek} />
                      <span className="card-idx">0{i + 1}</span>
                      <span className="card-hint">move over me</span>
                    </div>
                    <div className="card-meta">
                      <span>{p.kind}</span>
                      <span>{p.year}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.blurb}</p>
                    <ul className="points">
                      {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                    </ul>
                    <ul className="tags-row">
                      {p.stack.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                    <div className="card-links">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="lnk lnk-main">
                          Live <Arrow />
                        </a>
                      )}
                      {p.model && (
                        <a href={p.model} target="_blank" rel="noreferrer" className="lnk">
                          Model <Arrow />
                        </a>
                      )}
                      <a href={p.repo} target="_blank" rel="noreferrer" className="lnk">
                        Source <Arrow />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </Reel>

            <ul className="more">
              <li className="more-head" data-reveal>
                <span>Also built</span>
              </li>
              {more.map((m, i) => (
                <li key={m.title} data-reveal style={{ '--d': i * 70 }}>
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setTag(m)}
                    onMouseLeave={() => setTag(null)}
                  >
                    <span className="m-year">{m.year}</span>
                    <span className="m-title">{m.title}</span>
                    <span className="m-note">{m.note}</span>
                    <span className="m-stack">{m.stack}</span>
                    <span className="m-go"><Arrow /></span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* ---------------- 02 open source ---------------- */}
          <section id="opensource">
            <div className="sec-head" data-reveal>
              <span className="sec-n">02</span>
              <h2>Open <em>source</em></h2>
            </div>
            <p className="sec-lede" data-reveal>
              Bug fixes and features in the libraries the LLM ecosystem runs on.
              One TRL fix was found while training my own agent; the rest came
              from reading a big codebase until I found the real cause.
            </p>

            <div className="os-list">
              {opensource.map((o, i) => (
                <div key={o.repo} className="os" data-reveal style={{ '--d': i * 60 }}>
                  <div className="os-repo">
                    <a href={`https://github.com/${o.repo}`} target="_blank" rel="noreferrer">
                      {o.repo}
                    </a>
                    {o.stars && <span className="stars">★ {o.stars}</span>}
                    <p>{o.note}</p>
                  </div>
                  <ul className="os-prs">
                    {o.prs.map((pr) => (
                      <li key={pr.n}>
                        <a
                          href={`https://github.com/${o.repo}/pull/${pr.n}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className={`status ${pr.status}`}>{pr.status}</span>
                          <span className="pr-title">{pr.title}</span>
                          <span className="pr-meta">
                            #{pr.n} · {pr.date}
                            {pr.diff && <> · <i>{pr.diff}</i></>}
                            {pr.diff && <DiffBlocks diff={pr.diff} />}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <a className="os-foot" data-reveal href={more_os.href} target="_blank" rel="noreferrer">
              {more_os.title} <Arrow />
            </a>
          </section>

          {/* ---------------- 03 hackathons ---------------- */}
          <section id="hackathons">
            <div className="sec-head" data-reveal>
              <span className="sec-n">03</span>
              <h2>Hackathons <em>&amp; more</em></h2>
            </div>

            <ol className="timeline">
              {hackathons.map((h, i) => (
                <li key={h.title} data-reveal style={{ '--d': i * 40 }}>
                  <span className="tl-when">{h.when}</span>
                  <span className="tl-dot" />
                  <a href={h.href} target="_blank" rel="noreferrer" className="tl-body" data-cursor="Open">
                    {h.stamp && (
                      <span className="stamp" aria-hidden="true">
                        <b>{h.stamp[0]}</b>
                        <small>{h.stamp[1]}</small>
                      </span>
                    )}
                    <span className="tl-tag">{h.tag}</span>
                    <h3>{h.title}</h3>
                    <p>{h.text}</p>
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <footer className="work-end" data-reveal>
            <p>Want to build something together?</p>
            <Link to="/contact" className="end-link" data-cursor="Say hi">
              Get in touch <Arrow />
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Work
