import React from 'react'
import styles from '../assets/css/components/exit-screen.module.css'
import logo from '../assets/img/logoCodelab.png'
import img from '../assets/img/exit-robot.png'

export default function ExitScreen({handleFullscreen}) {
    return (
        <div className={styles.container}>
        <div className={styles.head}>
            <img src={logo} alt="" />
        </div>
        <div className={styles.loader}>
            <img src={img} alt="" />
            <div className={styles.text}>
                <h4>Whoopps...</h4>
                <p>Go back to fullscreen mode to continue the assessment.</p>
                <button onClick={handleFullscreen}>Go Back</button>
            </div>  
        </div>
        </div>
    )
}
