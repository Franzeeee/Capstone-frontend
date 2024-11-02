import React from 'react';
import HomeTemplate from '../templates/HomeTemplate';
import styles from '../assets/css/pages/teacher-assessment.module.css';
import { useNavigate } from 'react-router-dom';
import ProfileSide from '../components/ProfileSide';
import { getUserData } from '../utils/userInformation';
import book from '../assets/img/book.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCog, faCopy, faEye } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import customFetch from '../utils/fetchApi';

export default function TeacherAssessmentPage() {
    const navigate = useNavigate();
    const user = getUserData();

    // Example array of class items
    const [classItems, setClassItems] = useState(null);

    useEffect(() => {
        customFetch(`/class/all`, 'GET')
            .then(data => {
                console.log('Data:', data);
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
                            <p>Class</p>
                        </div>
                    </div>
                    <div className={`${styles.cardContainer}`}>
                        { classItems &&
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
                                        overlay={<Tooltip id={`tooltip-${index}`}>Preview Class</Tooltip>}
                                    >
                                        <div className={`${styles.viewButton}`} onClick={() => navigate(`/c/${classItem.class_code.code}`)}>
                                            <p className='m-0'><FontAwesomeIcon icon={faEye} /></p>
                                        </div>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="auto" // Adjust placement as needed
                                        overlay={<Tooltip id={`tooltip-${index}`}>Class Dashboard</Tooltip>}
                                    >
                                    <div className={`${styles.viewButton}`} >
                                        <p className='m-0' title='Overview'><FontAwesomeIcon icon={faArrowRight} fade /></p>
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
