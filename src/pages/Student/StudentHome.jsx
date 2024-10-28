import React, {useEffect, useState} from 'react'
import HomeTemplate from '../../templates/HomeTemplate'
import styles from '../../assets/css/pages/student-home.module.css'
import headImage from '../../assets/img/studentHead.png'
import book from '../../assets/img/book.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faGreaterThan, faPlus } from '@fortawesome/free-solid-svg-icons'
import CryptoJS from 'crypto-js';
import ProfileSide from '../../components/ProfileSide'
import { useNavigate } from 'react-router-dom'
import JoinClassModal from '../../components/JoinClassModal'
import { toast } from 'react-toastify'
import LessonCardLoader from '../../components/LazyLoaders/LessonCardLoader'

export default function StudentHome() {

    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8)));
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [classData, setClassData] = useState(null);
    const api = import.meta.env.VITE_API_URL;''

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(`${api}/student/${user.id}/classes`, {  // Replace with your actual API endpoint
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setClassData(data);
                } else {
                    toast.error(data.message || 'An error occurred.');
                }
            } catch (err) {
                toast.error(err.message);
            }
        };

        fetchClasses();
    }, [user.id]);

    const handleJoinSuccess = (data) => {
        setClassData(data);
        toast.success(data.message, {autoClose: 5000})
    };

    return (
    <HomeTemplate>
        <div className={`${styles.container}`}>
        <JoinClassModal 
            show={showModal} 
            handleClose={() => setShowModal(false)} 
            handleJoinSuccess={handleJoinSuccess} 
            studentID={user.id}
        />
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
                        <p>Class Courses</p>
                    </div>
                <div className={`${styles.cardContainer}`}>

                    { classData !== null ?
                        <>
                            <div className={`${styles.card} ${styles.joinClassCard}`} onClick={() => setShowModal(true)}>
                                <p><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></p>
                                <p>Join Class</p>
                            </div>

                            { classData.length > 0 ?
                                classData.map((classItem, index) => (
                                <div key={index} className={`${styles.card}`}>
                                    <div className={`${styles.courseImage}`}>
                                        <img src={book} alt="" />
                                    </div>
                                    <div className={`${styles.courseText}`}>
                                        <p>{classItem.name}</p>
                                        <p>{classItem.subject.toLowerCase() === 'python' ? '12 Lessons' : '10 Lessons'}</p>
                                    </div>
                                    <div className={`${styles.goTo}`}>
                                        <div className={`${styles.viewButton}`} onClick={() => navigate(`/c/${classItem.class_code.code}`)}>
                                            <p className='m-0'><FontAwesomeIcon icon={faArrowRight} fade /></p>
                                        </div>
                                    </div>
                                </div>
                            )) : ""
                        }
                        </>
                        :
                        <LessonCardLoader />
                    }

                    
                    
                </div>
            </div>
            <div className={`${styles.profileContainer}`}>
                <ProfileSide info={user}/>
            </div>
        </div>
    </HomeTemplate>
    )
}
