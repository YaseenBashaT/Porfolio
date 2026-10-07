import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import useReveal from '../../hooks/useReveal'
import './index.scss'

const rowA = ['Python', 'JavaScript', 'Java', 'SQL', 'C', 'React', 'FastAPI', 'Node.js', 'Tailwind', 'D3.js']
const rowB = ['PyTorch', 'TRL / GRPO', 'LangChain', 'RAG', 'Vector search', 'Knowledge graphs', 'Docker', 'PostgreSQL', 'MongoDB', 'Linux']

const facts = [
  ['Studying', 'B.Tech, AI & ML · Vignan\'s Lara Institute of Technology, 2022–26'],
  ['Based in', 'Guntur, India'],
  ['Focus', 'LLM tooling, RL fine-tuning, full-stack'],
  ['Open source', 'Merged PRs in TRL and LiteLLM'],
  ['Certified', 'Scrimba AI Engineer Path · Apna College DSA'],
]

const Row = ({ items, reverse }) => (
  <div className={`marquee ${reverse ? 'rev' : ''}`}>
    <div className="track">
      {[...items, ...items].map((t, i) => (
        <span key={t + i} aria-hidden={i >= items.length}>{t}</span>
      ))}
    </div>
  </div>
)

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  useReveal()

  useEffect(() => {
    const t = setTimeout(() => setLetterClass('text-animate-hover'), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="about">
      <div className="about-grid">
        <div className="about-text">
          <p className="kicker" data-reveal><span>01</span> About</p>
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={6}
            />
          </h1>
          <p className="lead" data-reveal style={{ '--d': 150 }}>
            I'm a final-year <em>AI &amp; ML</em> student who builds AI-assisted
            tools end to end, from data pipeline to live demo.
          </p>
          <p data-reveal style={{ '--d': 250 }}>
            Most of what I build starts from a problem I actually hit: a repo
            analyzer for unfamiliar 2,000-file codebases, an incident-memory
            tool because on-call knowledge walks out the door.
          </p>
          <p data-reveal style={{ '--d': 350 }}>
            Our RL agent placed 12th of 31,000+ registrations at the OpenEnv
            hackathon by Meta, Hugging Face and PyTorch. I also send fixes
            upstream to the libraries I use, with merged PRs in TRL and
            LiteLLM. I use Claude Code and Copilot daily.
          </p>
        </div>

        <aside className="about-card" data-reveal style={{ '--d': 300 }}>
          <span className="card-label">profile.json</span>
          <dl>
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className="skills" data-reveal>
        <p className="kicker"><span>—</span> Tools I reach for</p>
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </div>
  )
}

export default About
