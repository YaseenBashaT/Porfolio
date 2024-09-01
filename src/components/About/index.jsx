import { useEffect, useState } from 'react'
import {
  faJava,
  faCss3,
  faPython,
  faHtml5,
  faJsSquare,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
     setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
          I’m currently pursuing a BTech in AI and Machine Learning, with a solid grasp of Data Structures, Algorithms, and web development. I have hands-on experience with HTML, CSS, JavaScript, and React.
          </p>
          <p align="LEFT">
          I’ve worked on several projects, including a dynamic portfolio, a market risk monitoring dashboard, and a movie recommendation system. These projects reflect my passion for building effective and user-friendly solutions.
          </p>
          <p>
          I am passionate about developing innovative applications and working in dynamic, collaborative environments. I am eager to contribute my skills to impactful projects and continue growing as a developer.
          </p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
            <FontAwesomeIcon icon={faJava} />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faPython}  />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About