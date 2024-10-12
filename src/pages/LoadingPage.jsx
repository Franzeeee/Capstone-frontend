import React from 'react'
import styles from '../assets/css/pages/loading-page.module.css'
import logo from '../assets/img/logoCodelab.png'
import loading from '../assets/img/loading-codelab.gif'

export default function LoadingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <img src={logo} alt="" />
      </div>
      <div className={styles.loader}>
        <img src={loading} alt="" />
        <p>Loading... Your coding journey is about to level up.</p>
      </div>
    </div>
  )
}
