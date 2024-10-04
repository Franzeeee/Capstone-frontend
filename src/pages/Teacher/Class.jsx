import React from 'react'
import HomeTemplate from '../../templates/HomeTemplate'
import styles from '../../assets/css/pages/class.module.css'
import profile from '../../assets/img/user.png'
import { faChartSimple, faCheckSquare, faClock, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

// Component Imports
import  AnnouncementForm  from '../../components/AnnouncementForm';
import ClassContents from '../../components/ClassContents';


export default function Class() {

    const navigate = useNavigate()

  return (
    <HomeTemplate>
        <div className={`${styles.container}`}>
            <div className={`${styles.contentContainer}`}>
                <div className={`${styles.header}`}>
                    <div className={`${styles.create}`}>
                        <div>
                            <ul>
                                <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                                <li>/</li>
                                <li className={`${styles.active}`}>Class</li>
                            </ul>
                        </div>
                        <p>Subject Name</p>
                    </div>
                </div>
                <AnnouncementForm />
                <ClassContents />
            </div>

            <div className={`${styles.profileContainer}`}>
            <div className={`${styles.profileHeader}`}>
                    <p className={`${styles.profileText}`}>Profile</p>
                </div>
                <div className={`${styles.userInfo}`}>
                    <img src={profile} alt="" />
                    <p className={`${styles.userName}`}>Leonel Abanilla <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></p>
                    <p>Instructor</p>
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
            </div>
        </div>
    </HomeTemplate>
  )
}
