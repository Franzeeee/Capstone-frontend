import React from 'react'
import styles from '../assets/css/pages/notFound.module.css'
import logo from '../assets/img/logoCodelab.png'
import notFound from '../assets/img/notFound.png'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {

  const navigate = useNavigate()

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
        <button onClick={() => navigate('/dashboard')}>Go back</button>
      </div>
    </div>
  )
}
