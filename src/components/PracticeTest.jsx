import React from 'react'
import styles from '../assets/css/components/practice-test.module.css'
import practiceImage from '../assets/img/practice-test.png'
import { useNavigate } from 'react-router-dom'

export default function PracticeTest() {
    const navigate = useNavigate()
  return (
    <div className={`${styles.practiceContainer}`}>
        <div className={`${styles.box}`}>
            <img src={practiceImage} alt="" />
            <div className={styles.buttonContainer}>
                <p>Practice Makes Perfect</p>
                <p className={styles.qoute}>Consistency builds lasting mastery.</p>
                <button onClick={() => navigate('/playground')}>
                    Start Practice
                </button>
            </div>
        </div>
    </div>
  )
}
