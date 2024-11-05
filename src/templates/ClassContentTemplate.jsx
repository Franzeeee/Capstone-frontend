import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import styles from '../assets/css/templates/class-content-template.module.css'
import logo from '../assets/img/logoCodelab.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons'
import { Accordion } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import lessons from '../utils/data'


export default function ClassContentTemplate({children}) {
    const navigate = useNavigate();
    const location = useLocation();

    const lessonIndex = location.state?.lesson || 0;

    const [currentLesson, setCurrentLesson] = useState(lessons[lessonIndex].title);

    const [lessonTitle, setLessonTitle] = useState(lessons.map(lesson => lesson.title));

    const handleBack = () => {
        navigate('/dashboard');
    }


    return (
        <div className={styles.container}>
            <div className={`${styles.sideNav}`}>
                
                <div className={`${styles.logo}`}>
                    <img src={logo} alt="" />
                </div>
                <div className={styles.backButton} onClick={handleBack}>
                    <p><FontAwesomeIcon icon={faArrowLeft} /> Back to Class Page</p>
                </div>
                <div className={`${styles.lessons}`}>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0" className={styles.accordion}>
                            <Accordion.Header className={styles.accordionHeader}>Default</Accordion.Header>
                            <Accordion.Body className={styles.accordionBody}>
                                <ul>
                                    {lessonTitle.length > 0 && lessonTitle.map((lesson, index) => (
                                        <li key={index} className={`${lesson ===  currentLesson ? styles.activeLesson : ""}`} onClick={() => setCurrentLesson(lesson)}>
                                            <FontAwesomeIcon icon={faLock} /> {lesson}
                                        </li>
                                    ))
                                    }
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className={styles.accordion}>
                            <Accordion.Header className={styles.accordionHeader}>Classwork</Accordion.Header>
                            <Accordion.Body className={styles.accordionBody}>
                                <ul>
                                    {lessonTitle.length > 0 && lessonTitle.map((lesson, index) => (
                                        <li key={index} className={`${lesson ===  currentLesson ? styles.activeLesson : ""}`} onClick={() => setCurrentLesson(lesson)}>
                                            <FontAwesomeIcon icon={faLock} /> {lesson}
                                        </li>
                                    ))
                                    }
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
            <div className={`${styles.content}`}>
            <ToastContainer />
                <div className={styles.breadcrumbs}>
                    <ul>
                        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                        <li>/</li>
                        <li onClick={handleBack}>{location.state?.name || "Class Name"}</li>
                        <li>/</li>
                        <li className={`${styles.active}`}>{currentLesson}</li>
                    </ul>
                </div>
                <div className={styles.lessonContent}>
                    <div className={styles.contentContainer}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
