import React from 'react';
import HomeTemplate from '../templates/HomeTemplate';
import styles from '../assets/css/pages/teacher-assessment.module.css';
import { useNavigate } from 'react-router-dom';
import ProfileSide from '../components/ProfileSide';
import { getUserData } from '../utils/userInformation';
import book from '../assets/img/book.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCog, faCopy, faEye, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import customFetch from '../utils/fetchApi';
import LessonCardLoader from '../components/LazyLoaders/LessonCardLoader';
import faFinalGrade from '../assets/img/finalGrade-logo.png';

export default function ClassGradeList() {
    const navigate = useNavigate();
    const user = getUserData();

    // Example array of class items
    const [classItems, setClassItems] = useState(null);

    useEffect(() => {
        customFetch(`/class/all`, 'GET')
            .then(data => {
                setClassItems(data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, []);


    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success('Class code copied to clipboard');
    }

    return (
        <HomeTemplate>
            <div className={`${styles.container}`}>
                <div className={`${styles.contentContainer}`}>
                    <div className={`${styles.header}`}>
                        <div className={`${styles.create}`}>
                            <p>Classes</p>
                        </div>
                    </div>
                    <div className={`${styles.cardContainer}`}>
                        { classItems ? classItems.length === 0 ? <p className='text-center'>No classes found</p> : null : <LessonCardLoader />}
                        { classItems && classItems.length > 0 &&    
                            classItems.map((classItem, index) => (
                            <div key={index} className={`${styles.card}`}>
                                <div className={`${styles.courseImage}`}>
                                    <img src={book} alt="" />
                                </div>
                                <div className={`${styles.courseText}`}>
                                    <p>{classItem.name}</p>
                                    <p className={`${styles.classCode}`}>Class Code: <span>{classItem.class_code.code}</span> <FontAwesomeIcon onClick={() => copyCode(classItem.class_code.code)} icon={faCopy} /></p>
                                </div>
                                <div className={`${styles.goTo}`}>
                                    <OverlayTrigger
                                        placement="auto" // Adjust placement as needed
                                        overlay={<Tooltip id={`tooltip-${index}`}>Manage Final Grades</Tooltip>}
                                    >
                                    <div className={`${styles.viewButton}`}  onClick={() => navigate(`/teacher/grades/class/${classItem.class_code.code}/final-grades`, {state: {verified: true, data: classItem}})} >
                                        <p className='m-0' title='Overview'><FontAwesomeIcon icon={faUserGraduate} fade /></p>
                                    </div>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`${styles.profileContainer}`}>
                    <ProfileSide info={user} />
                </div>
            </div>
        </HomeTemplate>
    );
}
