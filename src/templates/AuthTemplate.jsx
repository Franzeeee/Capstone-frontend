import React from 'react'
import styles from '../assets/css/templates/auth-template.module.css'

export const AuthTemplate = ({children}) => {
  return (
    <div className={`container-lg center ${styles.container}`}>
        <div className={`row ${styles.row}`}>
            {children}
            <div className={`col-md-5 ${styles.rightPanel}`}>
                <h5>Logo here</h5>
            </div>
        </div>
    </div>
  )
}
