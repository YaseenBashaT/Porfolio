import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters';
import LogoTitle from '../../assets/images/logo-y.png'
import Me from '../../assets/images/me.png'
import './index.scss'


const Home = () => {
   
    const [letterClass, setLetterClass] = useState('text-animate')   
    const nameArray = ['a', 's', 'e', 'e', 'n']
    
    useEffect(() => {
        setTimeout(() => {
        return setLetterClass('text-animate-hover')
        }, 4000)
      }, [])

    return (
        <>
             
        <div className='home'>
            <div className='text-zone'>
                <h1>Hello there, <br />  I'm
                <img className='title-img ' src={LogoTitle} alt='Y'/>
                <AnimatedLetters letterClass={letterClass} strArray = {nameArray} idx={15}/>
                <br/>
                developer
                </h1>
                <h2>Frontend Developer / Expert in Javascript, DSA / Student </h2>
                <Link to='/contact' className='redirect-contact'>Contact Me</Link> 
            </div>
            
        </div>
        </>
    );
}

export default Home;
