import React from 'react'
import { Link } from 'react-router-dom'
import AuthConsumer from '../hooks/useAuth'

import "../styles/landing_styles.css"
import logoVideo from '../assets/VAIBE_logo_video.mp4'


const LandingPage = () => {
    const [{ isAuth }] = AuthConsumer();

    return (
        <>
            <div className='allLanding'>
                <div className='bodyLanding'>
                    <video src={logoVideo} autoPlay muted playsInline onEnded={(e) => {e.target.pause()}} id="logoLanding"></video>
                    <div className='cardLanding'>
                        <h1 className='title'>The AI powered Recommendation System</h1>
                        <br></br>
                        <p className='text'>Would you like to try something new?<br></br><br></br>
                            With VAIBe, you will be able to discover your next favorite band. Our application, powered by artificial intelligence, will allow you to explore new sensations that will make you vibrate.</p>
                        <p className='text'>We are ready to surprise you. And you, are you ready?</p>
                        {isAuth ?
                            <Link to="/home">
                                <button className='landingButton'>
                                    <span>Start Now</span>
                                    <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80V384 336 288C0 146.6 114.6 32 256 32s256 114.6 256 256v48 48 16c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48V304c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80z" /></svg>

                                </button>
                            </Link>
                            :
                            <Link to="/login">
                                <button className='landingButton'>
                                    <span>Start Now</span>
                                    <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80V384 336 288C0 146.6 114.6 32 256 32s256 114.6 256 256v48 48 16c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48V304c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80z" /></svg>

                                </button>
                            </Link>
                        }
                    </div>
                </div>

                <div className='bottomLanding'>
                    <h2>How does it work?</h2>

                    <div className='stepsCont'>
                        <div className='steps'>
                            <h4>Step 1</h4>
                            <p>Sign up to access to our app</p>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='arrow'>
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>

                        <div className='steps'>
                            <h4>Step 2</h4>
                            <p>Log in with your Spotify account</p>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='arrow'>
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>

                        <div className='steps'>
                            <h4>Step 3</h4>
                            <p>Insert the name of two artists or bands</p>
                        </div>
                    </div>

                    <div className='textLanding'>
                        <p>
                            We along with our AI powered search engine are going to help you. We bring the power of the model 
                            behind <b>ChatGPT</b> for you to enjoy music like never before.
                        </p>
                        <p>
                            It's easy. Insert two of your favorite bands or artists, we'll take care of the rest,
                            it's that simple! You will receive three <b>Spotify</b> recommendations of bands or artists that for sure will
                            surprise you.
                        </p>
                        <p>
                            VAIBe is an artificial intelligence platform that helps users quickly find the music, band
                            or artist they are looking for. You will receive a high quality response. Thanks  to  <b>AI  technology</b> powered  by
                            ChatGPT you will stop wasting time chasing that song, artist or band you want to find
                            now.<br></br></p>
                        <p>
                            It seems like magic, yes, but it's <b>VAIBe</b>.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;