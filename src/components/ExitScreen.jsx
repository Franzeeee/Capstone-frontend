import React, { useEffect } from 'react'
import styles from '../assets/css/components/exit-screen.module.css'
import logo from '../assets/img/logoCodelab.png'
import img from '../assets/img/exit-robot.png'

export default function ExitScreen({handleFullscreen, focus, addLeaveFullscreen, addAltTab}) {

    useEffect(() => {
        if(focus) {
            addLeaveFullscreen();
        }else {
            addAltTab();
        }
    }, [])

    return (
        <div className={styles.container}>
        <div className={styles.head}>
            <img src={logo} alt="" />
        </div>
        <div className={styles.loader}>
            <img src={img} alt="" />
            <div className={styles.text}>
                <h4>Whoopps...</h4>
                <p>Go back to {focus ? "fullscreen mode" : "the assessment tab"} to continue the assessment.</p>
                <p>This action is monitored and being recorded by your teacher.</p>
                <button onClick={handleFullscreen}>Go Back</button>
            </div>  
        </div>
        </div>
    )
}
