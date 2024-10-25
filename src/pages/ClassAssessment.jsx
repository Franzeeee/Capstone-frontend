import React, { useState, useEffect } from 'react'
import styles from '../assets/css/pages/class-assessment.module.css'
import logo from '../assets/img/logoCodelab.png'

import Accordion from 'react-bootstrap/Accordion';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';

import { useNavigate, useLocation } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import TextFormatter from '../components/TextFormatter';
import lessonContent from '../utils/lessons';
import lessons from '../utils/data';
import AssessmentContent from '../components/AssessmentContent';

export default function ClassAssessment() {
    const navigate = useNavigate()

    const location = useLocation();

    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(
        JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8))
    );

    const lessonIndex = location.state?.progress?.last_completed_lesson || 0;

    const [currentLesson, setCurrentLesson] = useState(() => {
        if (user.role === 'teacher') {
            return lessons[0].title || "Introduction";
        }
        return lessons[lessonIndex].title || "Variables";
    });

    
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

        // Request fullscreen mode
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
            // blockBackNavigation();
    window.addEventListener('popstate', blockBackNavigation);
        } else if (document.documentElement.webkitRequestFullscreen) { // For Safari
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // For IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    };


    const handleBack = () => {
        // Get the current URL path
        const currentPath = location.pathname;

        // Remove the last segment from the URL
        const newPath = currentPath.substring(0, currentPath.lastIndexOf('/') - 2);

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
                            <Accordion.Header className={styles.accordionHeader}>Hello World</Accordion.Header>
                            <Accordion.Body className={styles.accordionBody}>
                                <ul>
                                    {lessonTitle.length > 0 && lessonTitle.map((lesson, index) => (
                                        <li key={index} className={`${lesson ===  currentLesson ? styles.activeLesson : ""} ${styles.active}`} onClick={() => setCurrentLesson(lesson)}> <FontAwesomeIcon icon={faLock} /> {lesson}</li>
                                    ))
                                    }
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className={styles.accordion}>
                            <Accordion.Header className={styles.accordionHeader}>Loops</Accordion.Header>
                            <Accordion.Body className={styles.accordionBody}>
                                <ul>
                                    <li>While Loop</li>
                                    <li>Do While Loop</li>
                                    <li>For Loop</li>
                                    <li>Foreach Loop</li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2" className={styles.accordion}>
                            <Accordion.Header className={styles.accordionHeader}>Array</Accordion.Header>
                            <Accordion.Body className={styles.accordionBody}>
                                <ul>
                                    <li>Introduction to Arrays</li>
                                    <li>Array Methods</li>
                                    <li>Multidimensional Arrays</li>
                                    <li>Array Iteration</li>
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
                        <li className={`${styles.active}`}>{currentLesson} (Assessment)</li>
                    </ul>
                </div>
                <div className={styles.lessonContent}>
                    <div className={styles.contentContainer}>
                        <AssessmentContent startButton={handleShow}/>
                    </div>
                </div>
                    <div className={`${styles.control}`}>
                        <button className={`${styles.back}`}>Back</button>
                        <button onClick={() => getNextLesson()} className={styles.nextButton}>Next</button>
                    </div>
                <Offcanvas show={show} onHide={handleClose} placement='bottom' className={styles.fullscreenOffcanvas}>
                    <Offcanvas.Body>
                        <CodeEditor options={{ mode: 'Assessment', closeOverlay: () => setShow(false) }} />
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </div>
    )
}
