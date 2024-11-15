import React from 'react';
import HomeTemplate from '../templates/HomeTemplate';
import styles from '../assets/css/pages/teacher-assessment.module.css';
import { useNavigate } from 'react-router-dom';
import ProfileSide from '../components/ProfileSide';
import { getUserData } from '../utils/userInformation';
import book from '../assets/img/book.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCog, faCopy, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import customFetch from '../utils/fetchApi';
import LessonCardLoader from '../components/LazyLoaders/LessonCardLoader';
import ConfirmationTextModal from '../components/Modals/ConfirmationTextModal';

export default function TeacherAssessmentPage() {
    const navigate = useNavigate();
    const user = getUserData();

    // Example array of class items
    const [classItems, setClassItems] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);

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

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const showDeleteConfirmationModal = (id) => {
        setSelectedClass(id);
        setShowDeleteConfirmation(true);
    }
    const deleteClass = (id) => {
        // Delete class logic here
        setShowDeleteConfirmation(false);
        customFetch(`/class/${selectedClass}/delete`, {
            method: 'DELETE',
        })
            .then(data => {
                toast.success('Class deleted successfully');
                setClassItems(classItems.filter(item => item.id !== selectedClass));
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }

    return (
        <HomeTemplate>
            <div className={`${styles.container}`}>
                <ConfirmationTextModal 
                    show={showDeleteConfirmation} 
                    handleClose={() => setShowDeleteConfirmation(false)} 
                    modalData={{
                        title: 'Delete Class',
                        inputMessage: 'delete class',
                        action: () => deleteClass(),
                        confirmText: 'Delete',
                        cancelText: 'Cancel',
                    }}
                />
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
                                        overlay={<Tooltip id={`tooltip-${index}`}>Delete Class</Tooltip>}
                                    >
                                        <div className={`${styles.viewButton} ${styles.deleteClass}`} onClick={() => showDeleteConfirmationModal(classItem.id)}>
                                            <p className='m-0'><FontAwesomeIcon icon={faTrashAlt} /></p>
                                        </div>
                                    </OverlayTrigger>
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
                                    <div className={`${styles.viewButton}`} onClick={() => navigate(`${classItem.class_code.code}/dashboard`, {state: {verified: true, data: classItem}})} >
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
