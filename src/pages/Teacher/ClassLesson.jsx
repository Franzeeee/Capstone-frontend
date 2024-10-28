import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/pages/class-lesson.module.css'
import logo from '../../assets/img/logoCodelab.png'

import Accordion from 'react-bootstrap/Accordion';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import { faSquare as regularSquare } from '@fortawesome/free-regular-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import CodeEditor from '../CodeEditor';
import TextFormatter from '../../components/TextFormatter';
import lessonContent from '../../utils/lessons';
import lessons from '../../utils/data';

export default function ClassLesson() {
    const navigate = useNavigate()

    const location = useLocation();

    const lessonIndex = location.state?.lesson|| 0;

    const [currentLesson, setCurrentLesson] = useState(lessons[lessonIndex].title);
    
    const [lessonTitle, setLessonTitle] = useState(lessons.map(lesson => lesson.title));
    

    const getNextLesson = () => {
        setCurrentLesson(lessonTitle[lessonTitle.indexOf(currentLesson) + 1]);
    };

    const lesson = lessons.find(lesson => lesson.title === currentLesson);


    const [show, setShow] = useState(false);

    // Function to handle the Escape key press
    const handleKeyPress = (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            alert('Escape key was pressed!');
        }
    };

    useEffect(() => {
        // Add key press event listener when component mounts
        window.addEventListener('keydown', handleKeyPress);
        
        // Cleanup the event listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleClose = () => {
        setShow(false);
        alert()
        // Exit fullscreen mode when the Offcanvas is closed
        // if (document.exitFullscreen) {
        //     document.exitFullscreen();
        // } else if (document.webkitExitFullscreen) { // For Safari
        //     document.webkitExitFullscreen();
        // } else if (document.msExitFullscreen) { // For IE/Edge
        //     document.msExitFullscreen();
        //}
    };

    const handleShow = () => {
        // Open the off-canvas
        setShow(true);

        // // Request fullscreen mode
        // if (document.documentElement.requestFullscreen) {
        //     document.documentElement.requestFullscreen();
        // } else if (document.documentElement.webkitRequestFullscreen) { // For Safari
        //     document.documentElement.webkitRequestFullscreen();
        // } else if (document.documentElement.msRequestFullscreen) { // For IE/Edge
        //     document.documentElement.msRequestFullscreen();
        //}
    };


    const handleBack = () => {
        // Get the current URL path
        const currentPath = location.pathname;

        // Remove the last segment from the URL
        const newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));

        // Navigate to the new path without the last segment
        navigate(newPath);
    };
  return (
    <div className={`${styles.container}`}>
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
                        <Accordion.Header className={styles.accordionHeader}>Class Lesson</Accordion.Header>
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
                    <TextFormatter lessonContent={lesson}/>
                </div>
            </div>
                <div className={`${styles.control}`}>
                    <button className={`${styles.back}`}>Back</button>
                    <button onClick={handleShow} className={`${styles.try}`}>Try on Editor</button>
                    <button onClick={() => getNextLesson()} className={styles.nextButton}>Next</button>
                </div>
            <Offcanvas show={show} onHide={handleClose} placement='bottom' className={styles.fullscreenOffcanvas}>
                <Offcanvas.Body>
                    <CodeEditor options={{ mode: 'LessonTest', closeOverlay: () => setShow(false) }} />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    </div>
  )
}
