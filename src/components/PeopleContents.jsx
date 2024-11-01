import React from 'react'
import styles from '../assets/css/components/people-content.module.css'
import profile from '../assets/img/user.png'

export default function PeopleContents() {
  return (
    <div className={styles.container}>
        <div className={styles.instructorContainer}>
            <p className={styles.instructorHeader}>Instructor</p>
            <div className={styles.itemCard}>
                <img src={profile} alt="" />
                <p>Name of the user here</p>
            </div>
        </div>
    </div>
  )
}
