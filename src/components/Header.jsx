import React, {useState} from 'react'
import styles from '../assets/css/components/header.module.css'
import { IoMdAnalytics } from 'react-icons/io';
import { MdAnnouncement } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaCode } from 'react-icons/fa';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate();

  const showMenu = () => {
    setShow(!show)
  }
  return (
    <div className={`col-2 ${styles.headerContainer} ${show && (styles.show)}`}>
        <div className={`${styles.logo} ${styles.show}`}>
            <FontAwesomeIcon icon={faBars} onClick={showMenu}/>
        </div>
        <nav className={`${styles.nav}`}>
          <ul>
            <li className='d-flex align-items-center justify-content-start'>
                <Tooltip title="Home" placement="right">
                  <FaHome className={`${styles.icons}`} />{show && "Home"}
                </Tooltip>
            </li>
            <li className='d-flex align-items-center justify-content-start' onClick={() => navigate('/playground')}>
              <Tooltip title="Playground" placement='right'>
                <FaCode className={`${styles.icons}`}/>{show && "Playground"}
              </Tooltip>
            </li>
            <li className='d-flex align-items-center justify-content-start'>
              <Tooltip title="Dashboard" placement='right'>
                <IoMdAnalytics className={`${styles.icons}`}/>{show && "Dashboard"}
              </Tooltip>
            </li>
            <li className='d-flex align-items-center justify-content-start'>
              <Tooltip title="Announcements" placement='right'>
                <MdAnnouncement className={`${styles.icons}`}/>{show && "Announcement"}
              </Tooltip>
            </li>
          </ul>
        </nav>
    </div>
  )
}
