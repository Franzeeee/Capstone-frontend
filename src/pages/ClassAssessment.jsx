
import React, { useState, useEffect } from 'react';
import styles from '../assets/css/pages/class-assessment.module.css';
import logo from '../assets/img/logoCodelab.png';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';
import { useNavigate, useLocation } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import AssessmentContent from '../components/AssessmentContent';
import lessons from '../utils/data';
import ExitScreen from '../components/ExitScreen';
import perfectRobot from '../assets/img/perfect-assessment-robot.png';
import customFetch from '../utils/fetchApi';
import LoadingPage from './LoadingPage';

export default function ClassAssessment() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [assessment, setAssessment] = useState(location.state?.item || {});
    const [startAssessment, setStartAssessment] = useState(false);
    const [inFullscreen, setInFullscreen] = useState(false);
    const [assessmentData, setAssessmentData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

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
    const [show, setShow] = useState(false);

    const getNextLesson = () => {
        setCurrentLesson(lessonTitle[lessonTitle.indexOf(currentLesson) + 1]);
    };

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        
        const activityId = location.state?.item?.id;

        // Call customFetch directly here
        customFetch(`/activity/${activityId}/auth`, 'GET')
            .then(data => {
                setAssessmentData(data);
            })
            .catch(error => {
                navigate('/not-found');
            })
            .finally(() => {
                setIsFetching(false);
            });
    }, []);

    const handleShow = () => {
        setShow(true);
        setStartAssessment(true);
        setInFullscreen(true);

        // Request fullscreen mode
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    };

    const returnFullscreen = () => {
        setInFullscreen(true);
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && startAssessment) {
                setInFullscreen(false);
            }
        };

        // Add event listener for fullscreen change
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [startAssessment]);

    const handleBack = () => {
        const currentPath = location.pathname;
        const newPath = currentPath.substring(0, currentPath.lastIndexOf('/') - 2);
        navigate(newPath);
    };

    const timesup = () => {
        setStartAssessment(false);
    };


    if (isFetching) {
        return <LoadingPage />;
    }

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
                            <Accordion.Header className={styles.accordionHeader}>Default</Accordion.Header>
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
                            <Accordion.Header className={styles.accordionHeader}>Classworks</Accordion.Header>
                            <Accordion.Body className={styles.accordionBody}>
                                <ul className={styles.classworkContainer}>
                                    <li>No Classwork Yet.</li>
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
                        <li className={`${styles.active}`}>{assessmentData?.title }</li>
                    </ul>
                </div>
                <div className={styles.lessonContent}>
                    <div className={styles.contentContainer} style={{width: '80%'}}>
                        <AssessmentContent status='pending' data={assessmentData} startButton={handleShow}/>
                        {/* <div className={styles.robotContainer}>
                            <img src={perfectRobot} alt="" />
                            <p>Great did an excellent job!</p>
                        </div> */}
                    </div>
                </div>
                    <div className={`${styles.control}`}>
                        <button className={`${styles.back}`}>Back</button>
                        <button onClick={() => getNextLesson()} className={styles.nextButton}>Next</button>
                    </div>
                <Offcanvas backdrop="static" keyboard={false} show={show} onHide={handleClose} placement='bottom' className={styles.fullscreenOffcanvas}>
                    <Offcanvas.Body>
                        <CodeEditor data={assessmentData}  options={{ mode: 'Assessment', closeOverlay: () => setShow(false), timesup: () => setStartAssessment(false) }}/>
                    </Offcanvas.Body>
                </Offcanvas>
                <Offcanvas  
                style={canvasStyle}
                backdrop="static" keyboard={false} show={startAssessment && !inFullscreen} onHide={handleClose} >
                <Offcanvas.Body>
                        <ExitScreen handleFullscreen={returnFullscreen}/>
                </Offcanvas.Body>
                </Offcanvas>
            </div>
        </div>
    )
}


const canvasStyle = {
    width: '100vw',       // Full width
    height: '100vh',      // Full height
    position: 'fixed',     // Fixed position
    top: 0,                // Align to top
    left: 0,               // Align to left
    zIndex: 1050,          // Ensure it is above other content
    transition: 'none'     // Disable transition for immediate pop-up
    
}

