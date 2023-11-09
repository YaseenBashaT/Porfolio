import React from 'react';
import { Link } from 'react-router-dom';
import LogoTitle from '../../assets/images/logo-y.png'
import './index.scss';
function Home() {
    return (
        <div>
            <div className='text-zone'>
                <h1>Hello there, <br />  I'm
                <img className='title-img' src={LogoTitle} alt='dev-logo'/>
                <span className='name'>aseen</span>
                <br/>
                web developer
                </h1>
                <h2>Frontend Developer / Adept in Javascript / Student </h2>
                <Link to='/contact' className='redirect-contact'>Contact Me</Link> 
            </div>
        </div>
    );
}

export default Home;
