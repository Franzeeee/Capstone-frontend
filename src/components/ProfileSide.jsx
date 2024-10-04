import React from 'react'
import styles from '../assets/css/components/profile-side.module.css'
import { faCheckSquare, faClock, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import profile from '../assets/img/user.png'

export default function ProfileSide({info}) {
  return (
    <>
    <div className={`${styles.profileHeader}`}>
        <p className={`${styles.profileText}`}>Profile</p>
    </div>
    <div className={`${styles.userInfo}`}>
        <img src={profile} alt="" />
        <p className={`${styles.userName}`}>{info ? info.name : "Undefined User"} <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></p>
        <p className='text-capitalize'>{info ? info.role : "Undefined Role"}</p>
    </div>
    <div className={`${styles.schedule}`}>
        <p className={`${styles.scheduleText}`}>Tooday's Schedule</p>
        
        <div className={`${styles.activityContainer}`}>
        <div className={`${styles.card}`}>
            <div className={`${styles.activityInfo}`}>
                <p>Activity 1</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <div className={`${styles.taskInfo}`}>
                    <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                    <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                </div>
                <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
            </div>
        </div>

        <div className={`${styles.card}`}>
            <div className={`${styles.activityInfo}`}>
                <p>Activity 1</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <div className={`${styles.taskInfo}`}>
                    <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                    <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                </div>
                <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
            </div>
        </div>

        <div className={`${styles.card}`}>
            <div className={`${styles.activityInfo}`}>
                <p>Activity 1</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <div className={`${styles.taskInfo}`}>
                    <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                    <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                </div>
                <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
            </div>
        </div>

        <div className={`${styles.card}`}>
            <div className={`${styles.activityInfo}`}>
                <p>Activity 1</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <div className={`${styles.taskInfo}`}>
                    <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                    <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                </div>
                <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
            </div>
        </div>
        <div className={`${styles.card}`}>
            <div className={`${styles.activityInfo}`}>
                <p>Activity 1</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <div className={`${styles.taskInfo}`}>
                    <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                    <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                </div>
                <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
            </div>
        </div>
        </div>
        
    </div>
    </>
  )
}
