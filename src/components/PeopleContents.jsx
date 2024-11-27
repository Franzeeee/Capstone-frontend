import React, { useEffect, useState } from 'react'
import styles from '../assets/css/components/people-content.module.css'
import profile from '../assets/img/user.png'
import customFetch from '../utils/fetchApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ConfirmationModal from '../components/ConfirmationModal';
import { toast } from 'react-toastify';
import { getUserData } from '../utils/userInformation';

export default function PeopleContents({classId, classInfo}) {
    
    const user = getUserData();

    const [loading, setLoading] = useState(false);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClose = () => setShowConfirmation(false);

    const [people, setPeople] = useState({
        instructor: {
            name: classInfo.teacher.name
        },
        classmates: []
    });

    useEffect(() => {

        customFetch(`/class/${classId}/students`)
            .then(data => {
                setPeople({
                    instructor: {
                        name: classInfo.teacher.name,
                        profile_path: classInfo.teacher.profile.profile_path
                    },
                    classmates: data
                });
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, []);

    const [id, setId] = useState(null);

    const handleShow = (id) => {
        setShowConfirmation(true);
        setId(id);
    };

    const removeStudent = () => {
        const formData = new FormData();
        formData.append('class_id', classId);
        formData.append('student_id', id);
        customFetch('/student/remove', {
            method: 'POST',
            body: formData,
        })
        .then(data => {
            toast.success(data.message);
            setPeople({
                instructor: {
                    name: classInfo.teacher.name
                },
                classmates: people.classmates.filter(classmate => classmate.id !== id)
            });
        })
        .catch(error => {
            console.error('Error:', error.message);
        })
        .finally(() => {
            handleClose();
        });
    }

    return (
        <div className={styles.container}>
            <ConfirmationModal 
            show={showConfirmation} 
            handleClose={handleClose} 
            modalData={{title: "Confirm Removal", 
                        body: "Are you sure you want to remove student?", 
                        action: () => removeStudent(),
                        iconColor: "red",}}
            />
            <div className={styles.instructorContainer}>
                <p className={styles.instructorHeader}>Instructor</p>
                <div className={styles.itemCard}>
                    <img src={people?.instructor?.profile_path !== null ? `https://codelabbucket.s3.us-east-1.amazonaws.com/${people.instructor.profile_path}` : profile} alt="" />
                    <p>{people.instructor.name}</p>
                </div>
            </div>
            <div className={styles.instructorContainer}>
                <div className={styles.infoContainer}>
                    <p className={styles.instructorHeader}>Students</p>
                    <p>Students ({people?.classmates.length || 0})</p>
                </div>
                {
                    people?.classmates.map((classmate, index) => (
                        <div key={index} className={styles.itemCard}>
                            <img src={`https://codelabbucket.s3.us-east-1.amazonaws.com/${classmate?.profile.profile_path}` || profile} alt="" />
                            <p>{classmate.name}</p>
                            { user.role === 'teacher' && (
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id={`tooltip-test`}>Remove Student</Tooltip>}
                                >
                                    <p onClick={() => handleShow(classmate?.id)} className={styles.deleteStudent}><FontAwesomeIcon icon={faTrash} /></p>
                                </OverlayTrigger>
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
