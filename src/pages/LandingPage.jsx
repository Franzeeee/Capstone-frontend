import React, { useEffect } from 'react'
import styles from '../assets/css/pages/landing-page.module.css'
import logo from '../assets/img/logoCodelab.png'
import robot from '../assets/img/LoginPic.png'
import vector1 from '../assets/img/vector1.png'
import vector2 from '../assets/img/vector2.png'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {

    const navigate = useNavigate()

  return (
    <div className={styles.container}>
        <header>
            <img src={logo} alt="" />
            <button onClick={() => navigate('/login')}>Login</button>
        </header>
        <div className={styles.content}>
            <div>
                <h1>
                    Learn <span>Programming</span> <br />
                    Master <span>Skills</span><br />
                    Grow Your <span>Career</span>
                </h1>
                <p>
                    Empowering Students to Build Confidence and Skills in Coding. <br />
                    Your Journey to Becoming a Programmer Starts Here
                </p>
                <button onClick={() => navigate('/register')}>Get Started</button>
            </div>
            <div>
                <img src={robot} alt="" />
            </div>
        </div>
        <img className={`${styles.vector1}`} src={vector1} alt="" />
        <img className={`${styles.vector2}`} src={vector2} alt="" />
    </div>
  )
}
