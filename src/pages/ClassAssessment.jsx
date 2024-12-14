
import React, { useState, useEffect } from 'react';
import styles from '../assets/css/pages/class-assessment.module.css';
import logo from '../assets/img/logoCodelab.png';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';
import { useNavigate, useLocation, useSearchParams, useParams } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import AssessmentContent from '../components/AssessmentContent';
import lessons from '../utils/data';
import ExitScreen from '../components/ExitScreen';
import perfectRobot from '../assets/img/perfect-assessment-robot.png';
import customFetch from '../utils/fetchApi';
import LoadingPage from './LoadingPage';
import HomeTemplate from '../templates/HomeTemplate';
import LogicAssessmentPage from './AssessmentPage/LogicAssessmentPage';
import { getUserData } from '../utils/userInformation';
import { decryptData } from '../utils/cryptoUtils';

export default function ClassAssessment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { code } = useParams();

    const navigateBack = () => navigate(`/c/${code}`);

    const [searchParams] = useSearchParams();

    const dataAssessment = searchParams.get('info');

    const decryptedData  = decryptData(dataAssessment);
    if(decryptedData === null) {
        window.location.href = "/not-found";
    }

    useEffect(() => {
        if (!dataAssessment || decryptedData  === null || !decryptData) {
            navigate('/not-found');
        }
        console.log(decryptedData);
    }, [dataAssessment, navigate]);

    const [totalLeaveFullsreen, setTotalLeaveFullscreen] = useState(0);
    const [totalAltTab, setTotalAltTab] = useState(0);
    
    const [className, setClassname] = useState(location.state?.name || decryptedData?.name);
    const [assessment, setAssessment] = useState(location.state?.item || {});
    const [startAssessment, setStartAssessment] = useState(false);
    const [inFullscreen, setInFullscreen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [assessmentData, setAssessmentData] = useState(null);
    const [rank, setRank] = useState({
        rank: 0,
        total: 0
    });
    const [timeTaken, setTimeTaken] = useState(0);
    const [isFetching, setIsFetching] = useState(true);

    const [done, setDone] = useState(null);
    const [submissionData, setSubmissionData] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [submittedCode, setSubmittedCode] = useState();

    const [classSubject, setClassSubject] = useState(location.state?.classSubject || decryptedData?.classSubject);

    const user = getUserData();
    const lessonIndex = location.state?.progress?.last_completed_lesson || decryptedData?.progress?.last_completed_lesson;
    const [currentLesson, setCurrentLesson] = useState(() => {
        if (user.role === 'teacher') {
            return lessons[0].title || "Introduction";
        }
        return lessons[lessonIndex].title || "Variables";
    });
    
    // const [lessonTitle, setLessonTitle] = useState(lessons.map(lesson => lesson.title));
    const [show, setShow] = useState(false);

    const getNextLesson = () => {
        setCurrentLesson(lessonTitle[lessonTitle.indexOf(currentLesson) + 1]);
    };

    const handleClose = () => {
        setShow(false);
    };

    const [activityId, setActivityId] = useState(location.state?.item?.id || decryptedData?.item?.id);

    useEffect(() => {

        setActivityId(location.state?.item?.id || decryptedData?.item?.id);

        if (!activityId) {
            navigate('/not-found'); // Navigate away if `activityId` is null
            return;
        }

        // Call customFetch directly here
        customFetch(`/activity/${activityId}/auth`, 'GET')
            .then(data => {
                setAssessmentData(data);
            })
            .catch(error => {
                navigate('/not-found');
            })

        customFetch(`/submission/${activityId}/${user?.id}`, 'GET')
            .then(data => {
                setSubmissionData(data.data);
                setFeedback(data?.feedback);
                setTimeTaken(prev => prev + data?.data?.time_taken);
                setDone(data.exists);
                setRank({
                    rank: data?.rank,
                    total: data?.total_submissions
                });
                setSubmittedCode(data?.coding_problem_submissions);
                if(data?.cheating_record && data?.cheating_record !== null) {
                    setTotalLeaveFullscreen(data?.cheating_record?.exit_fullscreen);
                    setTotalAltTab(data?.cheating_record?.change_tab);
                }
            })
            .catch(error => {
                // navigate('/not-found');
            })
            .finally(() => {
                setIsFetching(false);
            });
    }, [activityId]);

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
        setFocused(true);
        clearClipboard();
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
        window.addEventListener("focus", setFocused(true));

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [startAssessment]);
    

    useEffect(() => {
        window.addEventListener("focus", setFocused(true));
    }, [focused]);

    window.addEventListener("blur", () => {
        setFocused(false);
    });

    const handleBack = () => {
        const currentPath = location.pathname;
        const newPath = currentPath.substring(0, currentPath.lastIndexOf('/') - 2);
        navigate(newPath);
    };
    

    if (isFetching) {
        return <LoadingPage />;
    }

    if(!isFetching && assessmentData?.coding_problems.length === 0) {
        return <LogicAssessmentPage assessmentData={assessmentData} class={location?.state || decryptedData} />
    }

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
            </div> */}
            <div className={`${styles.content}`}>
                <div className={styles.breadcrumbs}>
                    <ul>
                        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                        <li>/</li>
                        <li onClick={navigateBack}>{className}</li>
                        <li>/</li>
                        <li className={`${styles.active}`}>{assessmentData?.title || "Assessment Title"}</li>
                    </ul>
                </div>
                <div className={styles.lessonContent}>
                    <div className={styles.contentContainer} style={{width: '80%'}}>
                        { activityId && assessmentData !== null && (
                            <AssessmentContent submittedCode={submittedCode} antiCheat={[totalAltTab, totalLeaveFullsreen]} feedback={feedback} status={done} rank={rank} data={assessmentData} time={timeTaken} submission={submissionData} startButton={handleShow}/>
                            )
                        }
                        {/* <div className={styles.robotContainer}>
                            <img src={perfectRobot} alt="" />
                            <p>Great did an excellent job!</p>
                        </div> */}
                    </div>
                </div>
                    {/* <div className={`${styles.control}`}>
                        <button className={`${styles.back}`}>Back</button>
                        <button onClick={() => getNextLesson()} className={styles.nextButton}>Next</button>
                    </div> */}
                { done !== null && !done && (
                    <>
                        <Offcanvas backdrop="static" keyboard={false} show={show} onHide={handleClose} placement='bottom' className={styles.fullscreenOffcanvas}>
                            <Offcanvas.Body>
                            <CodeEditor 
                                data={assessmentData}
                                classSubject={classSubject}
                                options={{ 
                                    mode: 'Assessment', 
                                    cheatingData: [totalLeaveFullsreen, totalAltTab],
                                    closeOverlay: () => setShow(false), 
                                    timesup: () => setStartAssessment(false),
                                    closeEditor: () => setShow(false),
                                    finished: () => setDone(true),
                                    setRank: (rank) => setRank(rank),
                                    setSubmissionData: (data) => setSubmissionData(data),
                                    setTimeTaken: (time) => setTimeTaken(time),
                                    setFeedback: (feedback) => setFeedback(feedback),
                                }} 
                            />
                            </Offcanvas.Body>
                        </Offcanvas>
                        <Offcanvas  
                        style={canvasStyle}
                        backdrop="static" keyboard={false} show={startAssessment && !inFullscreen || startAssessment && !focused} onHide={handleClose} >
                        <Offcanvas.Body>
                                <ExitScreen 
                                    handleFullscreen={returnFullscreen}
                                    focus={focused} 
                                    addLeaveFullscreen={() => setTotalLeaveFullscreen(prev => prev + 1)}
                                    addAltTab={() => setTotalAltTab(prev => prev + 1)}
                                />
                        </Offcanvas.Body>
                        </Offcanvas>
                    </>
                )

                }
            </div>
        </div>
        </HomeTemplate>
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


async function clearClipboard() {
    try {
        await navigator.clipboard.writeText('');
    } catch (err) {
        console.error('Failed to clear clipboard:', err);
    }
}

