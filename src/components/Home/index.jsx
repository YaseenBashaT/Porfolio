import React from 'react';
import { Link } from 'react-router-dom';
import LogoTitle from '../../assets/images/logo-y.png'
import Me from '../../assets/images/me.png'
import './index.scss';

function Home() {
    return (
        
            
        <div className='home'>
            <div className='text-zone'>
                <h1>Hello there, <br />  I'm
                
                <img className='title-img' src={LogoTitle} alt='Y'/>
                <span className='name'>aseen</span>
                <br/>
                web developer
                </h1>
                <h2>Frontend Developer / Adept in Javascript / Student </h2>
                <Link to='/contact' className='redirect-contact'>Contact Me</Link> 
            </div>
            <div className='myImg'>
                <div className="image">
                <div class="Me" data-tilt >
                    <img className='Me' src={Me}/>
                </div>
                </div>
            </div>
            <script type="text/javascript" src="vanilla-tilt.js"></script>
        </div>
    );
}

export default Home;
