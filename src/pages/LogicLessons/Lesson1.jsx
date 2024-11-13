import React from 'react'
import HomeTemplate from '../../templates/HomeTemplate'
import { getUserData } from '../../utils/userInformation'
import styles from '../../assets/css/pages/LogicLesson/lesson1.module.css'
import ProfileSide from '../../components/ProfileSide'

export default function Lesson1() {

  const user = getUserData();

  return (
    <HomeTemplate>
        <div className={`${styles.container} ${styles.classDashboard}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.header}`}>
              <div className={`${styles.create}`}>
                  <div>
                      <ul>
                          <li>Grades</li>
                      </ul>
                  </div>
              </div>
          </div>
          <div className={styles.content}>
            Lesson 1
          </div>
        </div>
        <div className={`${styles.profileContainer}`}>
            <ProfileSide info={user} />
        </div>
      </div>
    </HomeTemplate>
  )
}
