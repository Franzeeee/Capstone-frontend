import React from 'react'
import styles from '../assets/css/components/header.module.css'
import { RxDashboard } from 'react-icons/rx'
import { LuGraduationCap } from "react-icons/lu";
import { LuUserCheck2 } from "react-icons/lu";
import { VscTools } from "react-icons/vsc";

export const Header = () => {
  return (
    <div className={`col-sm-2 border border-1 p-4 ${styles.headerContainer}`}>
        <div className={`${styles.logo}`}>
            Logo Here
        </div>
        <nav className={`${styles.nav}`}>
          <ul>
            <li className='d-flex align-items-center justify-content-start'>
                <RxDashboard className={`${styles.icons}`} /> Dashboard
            </li>
            <li className='d-flex align-items-center justify-content-start'>
                <LuGraduationCap className={`${styles.icons}`} /> Courses
            </li>
            <li className='d-flex align-items-center justify-content-start'>
                <LuUserCheck2 className={`${styles.icons}`} /> Attendance
            </li>
            <li className='d-flex align-items-center justify-content-start'>
                <VscTools className={`${styles.icons}`} /> Tools
            </li>
          </ul>
        </nav>
    </div>
  )
}
