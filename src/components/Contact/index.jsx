import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import useReveal from '../../hooks/useReveal'
import useMagnetic from '../../hooks/useMagnetic'
import './index.scss'

const EMAIL = 'tyaseenbasha@gmail.com'
const socials = [
  ['GitHub', 'https://github.com/yaseenbashat'],
  ['LinkedIn', 'https://www.linkedin.com/in/yaseen-basha/'],
  ['LeetCode', 'https://leetcode.com/u/yaseenbashat/'],
  ['Resume', '/Yaseen_Basha_Thippaluri_Resume.pdf'],
]

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [copied, setCopied] = useState(false)
  useReveal()
  useMagnetic()

  useEffect(() => {
    const t = setTimeout(() => setLetterClass('text-animate-hover'), 3200)
    return () => clearTimeout(t)
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (e) {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <div className="contact">
      <p className="kicker" data-reveal><span>03</span> Contact</p>
      <h1>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={"Let's talk".split('')}
          idx={6}
        />
      </h1>
      <p className="sub" data-reveal style={{ '--d': 200 }}>
        Internships, open-source collaboration, hackathon teams, or just a good
        problem. My inbox is open.
      </p>

      <a className="mail" href={`mailto:${EMAIL}`} data-reveal style={{ '--d': 300 }} data-cursor="Write">
        <span>{EMAIL}</span>
      </a>
      <button className="copy" onClick={copy} data-reveal style={{ '--d': 380 }} data-magnetic>
        {copied ? 'Copied ✓' : 'Copy address'}
      </button>

      <ul className="socials" data-reveal style={{ '--d': 450 }}>
        {socials.map(([name, href]) => (
          <li key={name}>
            <a href={href} target="_blank" rel="noreferrer">
              {name} <span>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Contact
