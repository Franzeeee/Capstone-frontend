import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/pages/class-lesson.module.css'
import logo from '../../assets/img/logoCodelab.png'

import Accordion from 'react-bootstrap/Accordion';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import { faSquare as regularSquare } from '@fortawesome/free-regular-svg-icons';
import { useNavigate, useLocation, useParams,useSearchParams } from 'react-router-dom';
import CodeEditor from '../CodeEditor';
import TextFormatter from '../../components/TextFormatter';
import PythonLesson from '../../utils/data';
import webLessons from '../../utils/BASIC_WEB';
import rlessons from '../../utils/Rlessons';
import customFetch from '../../utils/fetchApi';
import HomeTemplate from '../../templates/HomeTemplate';
import { decryptData, encryptData } from '../../utils/cryptoUtils';


export default function ClassLesson() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const lessonData = searchParams.get('info');

    const decryptedData  = decryptData(lessonData);
    if(decryptedData === null) {
        window.location.href = "/not-found";
    }

    useEffect(() => {
        if (!lessonData || decryptedData  === null || !decryptData) {
            navigate('/not-found');
        }
        console.log(decryptedData , " Test: 2");
    }, [lessonData, navigate]);

    const { code } = useParams();

    const navigateBack = () => navigate(`/c/${code}`);

    const [activeLesson, setActiveLesson] = useState(0);
    const [className, setClassname] = useState(location.state?.name || decryptedData?.name);
    const [subject, setSubject] = useState(location.state?.subject || decryptedData?.subject);

    const [lessons, setLessons] = useState(subject=== 'Python' ? PythonLesson : subject === 'Web Development' ? webLessons : rlessons);

    const [lessonIndex, setLessonIndex] = useState(location.state?.lesson || decryptedData?.lesson);

    const [currentLesson, setCurrentLesson] = useState(lessons[lessonIndex]?.title);
    
    const [lessonTitle, setLessonTitle] = useState(lessons.map(lesson => lesson.title));

    const [lesson, setLesson] = useState(lessons.find(lesson => lesson.title === currentLesson));

    // useEffect(() => {
    //      // Check if encryptedData is present in the query params
    //     if (!lessonData) {
    //         navigate('/not-found'); // Redirect if data is not present
    //         return null;
    //     } 
    //     const decryptedData = decryptData(lessonData);
    //     if(decryptedData === null) {
    //         navigate('/not-found');
    //     }
    //     if(location.state === null) {
    //         setSubject(decryptedData.subject);
    //         setClassname(decryptedData.name);
    //         setLessonIndex(decryptedData.lesson);
    //         setCurrentLesson(lessons[decryptedData.lesson].title);
    //     }
    // }, [subject, lessonData, location.state, navigate, lessonIndex, lessons]);

    // useEffect(() => {
    //     setLesson(lessons.find(lesson => lesson.title === currentLesson));
    // }, [lessonIndex]);

    const getNextLesson = () => {
        setCurrentLesson(lessonTitle[lessonTitle.indexOf(currentLesson) + 1]);
    };

    const [show, setShow] = useState(false);


    const handleClose = () => {
        setShow(false);
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
    <HomeTemplate>
    <div className={`${styles.container}`}>
        {/* <div className={`${styles.sideNav}`}>
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
                    <Accordion.Item eventKey="1" className={styles.accordion}>
                        <Accordion.Header className={styles.accordionHeader}>Class Default Activity</Accordion.Header>
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
                    <Accordion.Item eventKey="2" className={styles.accordion}>
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
        </div> */}
        <div className={`${styles.content}`}>
            <div className={styles.breadcrumbs}>
                <ul>
                    <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                    <li>/</li>
                    <li onClick={handleBack}>{className}</li>
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
                    {/* <button className={`${styles.back}`}>Back</button> */}
                    <button className={`${styles.back}`} onClick={navigateBack}>Back to Class</button>
                    <button onClick={handleShow} className={`${styles.try}`}>Try on Editor</button>
                    {/* <button onClick={() => getNextLesson()} className={styles.nextButton}>Next</button> */}
                </div>
            <Offcanvas show={show} onHide={handleClose} placement='bottom' className={styles.fullscreenOffcanvas}>
                <Offcanvas.Body>
                    <CodeEditor options={{ mode: 'LessonTest', closeOverlay: () => setShow(false) }} />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    </div>
    </HomeTemplate>
  )
}
