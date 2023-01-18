import React, { Component } from 'react'
import video from './girl-typing.mp4'
import './Home.css'
import { Link } from "react-router-dom";
import store from "../store/store";
import { useSelector, useDispatch } from "react-redux";

function Home() {
    const idUser = useSelector((state) => state.idUser);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    return (
        <div className='hero'>
            <div className= 'hero-text'>
                <h2>A lot of people write on Journey Journal</h2>
                <h2>Do <span>you </span> wanna join?</h2>
                { !isLoggedIn ? (
                <Link to="/login" className="nav-link">
                        Post now!
                </Link>
                ) : (
                    <Link to="/newPost" className="nav-link">
                        Post now!
                    </Link>
                )}
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