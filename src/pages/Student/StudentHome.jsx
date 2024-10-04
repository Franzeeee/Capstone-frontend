import React, {useState} from 'react'
import HomeTemplate from '../../templates/HomeTemplate'
import styles from '../../assets/css/pages/student-home.module.css'
import headImage from '../../assets/img/studentHead.png'
import book from '../../assets/img/book.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faPlus } from '@fortawesome/free-solid-svg-icons'
import CryptoJS from 'crypto-js';
import ProfileSide from '../../components/ProfileSide'
import { useNavigate } from 'react-router-dom'

export default function StudentHome() {

    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8)));
    const navigate = useNavigate();

    return (
    <HomeTemplate>
        <div className={`${styles.container}`}>
            <div className={`${styles.contentContainer}`}>
                <div className={`${styles.header}`}>
                    <div className={`${styles.create}`}>
                        <p>Dashboard</p>
                    </div>
                    <div className={`${styles.headBox}`}>
                        <div className={`${styles.headText}`}>
                            <p>Hello, {user.name}!</p>
                            <p>
                                Welcome to your coding journey! Explore lessons, solve challenges, and enhance your skills.
                            </p>
                        </div>
                        <div className={`${styles.headImage}`}>
                            <img src={headImage} alt="" />
                        </div>
                    </div>
                </div>
                <div className={`${styles.create} ${styles.cardHead}`}>
                        <p>Courses</p>
                    </div>
                <div className={`${styles.cardContainer}`}>

                    <div className={`${styles.card} ${styles.joinClassCard}`}>
                        <p><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></p>
                        <p>Join Class</p>
                    </div>

                    <div className={`${styles.card}`}>
                        <div className={`${styles.courseImage}`}>
                            <img src={book} alt="" />
                        </div>
                        <div className={`${styles.courseText}`}>
                            <p>Course Name</p>
                            <p>12 Lessons</p>
                        </div>
                        <div className={`${styles.goTo}`}>
                            <div className={`${styles.viewButton}`} onClick={() => navigate('/c/testurl')}>
                                <p><FontAwesomeIcon icon={faGreaterThan}></FontAwesomeIcon></p>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            <div className={`${styles.profileContainer}`}>
                <ProfileSide info={user}/>
            </div>
        </div>
    </HomeTemplate>
    )
}
