import React from 'react'
import styles from '../assets/css/templates/auth-template.module.css'
import LoginPic from '../assets/img/LoginPic.png'

export const AuthTemplate = ({children}) => {
  return (
    <div className={`container-lg center ${styles.container}`}>
        <div className={`row ${styles.row}`}>
            {children}
            <div className={`col-md-6 ${styles.rightPanel}`}>
              <img src={LoginPic} alt="" className={ `${styles.loginPic}`}/>
            </div>
        </div>
    </div>
  )
}
