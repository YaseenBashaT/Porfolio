import './index.scss'
import LogoY from '../../assets/images/logo-y.png'
import LogoSubtitle from '../../assets/images/logo_sub.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  faLayerGroup,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', icon: faHome, label: 'Home', end: true },
  { to: '/about', icon: faUser, label: 'About' },
  { to: '/work', icon: faLayerGroup, label: 'Work' },
  { to: '/contact', icon: faEnvelope, label: 'Contact' },
]

const Sidebar = () => (
  <div className="nav-bar">
    <Link className="logo" to="/">
      <img src={LogoY} alt="Yaseen" />
      <img className="sub-logo" src={LogoSubtitle} alt="" />
    </Link>
    <nav>
      {links.map(({ to, icon, label, end }) => (
        <NavLink key={to} to={to} end={end} data-label={label} aria-label={label}>
          <FontAwesomeIcon icon={icon} />
        </NavLink>
      ))}
    </nav>
    <ul>
      <li>
        <a href="https://www.linkedin.com/in/yaseen-basha/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </li>
      <li>
        <a href="https://github.com/yaseenbashat" target="_blank" rel="noreferrer" aria-label="GitHub">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </li>
    </ul>
  </div>
)

export default Sidebar
