import React from 'react';
import { Link } from 'react-router-dom';
import LogoTitle from '../../assets/images/logo-y.png'
import Me from '../../assets/images/me.png'
import './index.scss';

function Home() {
    const myImg = document.querySelector(".myImg");
    const Imge = document.querySelector(".image");

    if (myImg && Imge) {
        myImg.addEventListener("mousemove", (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

            Imge.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    } else {
        console.error("One or both of the elements (.myImg or .image) not found.");
    }
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

                    <img className='Me' src={Me}/>
                </div>
            </div>
        </div>
    );
}

export default Home;
