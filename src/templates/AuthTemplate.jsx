import React from 'react'
import styles from '../assets/css/templates/auth-template.module.css'

export const AuthTemplate = ({children}) => {
  return (
    <div className={`container-lg center ${styles.container}`}>
        <div className={`row ${styles.row}`}>
            {children}
            <div className={`col-md-6 ${styles.rightPanel}`}>
            </div>
        </div>
    </div>
  )
}
