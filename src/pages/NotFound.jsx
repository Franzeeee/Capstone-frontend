import React from 'react'
import styles from '../assets/css/pages/notFound.module.css'
import logo from '../assets/img/logoCodelab.png'
import notFound from '../assets/img/notFound.png'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <img src={logo} alt="" />
      </div>
  
      <div className={styles.notfound}>
        <img src={notFound} alt="" />
      </div>
      <div className={styles.Message}>
          <p className={styles.Ftext}>
            Something went wrong.
          </p>
          <p className={styles.Stext}>  
            Sorry for the inconvenience
          </p>
      </div>
      <div className={styles.BButton}>
        <button>Go back</button>
      </div>
    </div>
  )
}
