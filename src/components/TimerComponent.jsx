import React from 'react'
import styles from '../assets/css/components/timer.module.css'

export default function TimerComponent() {
  return (
    <div className={`${styles.timerContainer}`}>
        <p>Time Left: 00:00</p>
    </div>
  )
}
