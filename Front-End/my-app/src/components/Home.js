import React, { Component } from 'react'
import video from './girl-typing.mp4'
import './Home.css'
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className='hero'>
            <div className= 'hero-text'>
                <h2>A lot of people write on Journey Journal</h2>
                <h2>Do <span>you </span> wanna join?</h2>
                <Link to="/login" className="nav-link">
                        Post now!
                </Link>
            </div>
            <div className='hero-video'>
                <video className = 'hero-video-content' src={video} autoPlay muted loop >
                    Your browser is not supported!
                </video>
            </div>
        </div>
    )
  }
  
export default Home;