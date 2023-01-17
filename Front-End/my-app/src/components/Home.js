import React, { Component } from 'react'
import video from './girl-typing.mp4'
import './Home.css'
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className='hero'>
            <div className= 'hero-text'>
                <h2>O mulțime de oameni scriu pe Journey Journal</h2>
                <h2>Vrei să scrii <span>și tu</span> ?</h2>
                <Link to="/newPost" className="nav-link">
                        Postează acum!
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