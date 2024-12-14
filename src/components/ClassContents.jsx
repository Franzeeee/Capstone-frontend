import React, { useEffect, useState } from 'react';
import styles from '../assets/css/components/course-content.module.css';
import book from '../assets/img/book.png';
import { useNavigate } from 'react-router-dom';
import pythonLesson from '../utils/data';
import webLesson from '../utils/BASIC_WEB'
import rlessons from '../utils/Rlessons';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import customFetch from '../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFilter, faKey, faLock } from '@fortawesome/free-solid-svg-icons';
import { encryptData } from '../utils/cryptoUtils';

export default function ClassContents({ data, code, className }) {
    const navigate = useNavigate();
    const { courseId } = data;

    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        switch (data.subject) {
            case 'Python':
                setLessons(pythonLesson);
                break;
            case 'Web Development':
                setLessons(webLesson);
                break;
            case 'R Programming':
                setLessons(rlessons);
                break;
            default:
                setLessons(pythonLesson);
        }
    }, [data.subject]);

    const [defaultAssessment, setDefaultAssessment] = useState([]);
    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(
        JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8))
    );
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("all"); // "all" for lessons & quizzes, "quizzes" for only quizzes, "lessons" for only lessons

    const [logicLesson, setLogicLesson] = useState([
        {
            title: 'Lesson 1: Introduction to Pseudocode',
            description: 'This is a logic lesson',
            id: 0,
            path: `/c/${code}/logical/1`,
        },
        {
            title: 'Lesson 2: Basic Control Structures in Pseudocode',
            description: 'This is a logic lesson',
            id: 1,
            path: `/c/${code}/logical/2`,
        },
        {
            title: 'Lesson 3: Introduction to Flowcharts',
            description: 'This is a logic lesson',
            id: 2,
            path: `/c/${code}/logical/3`,
        },
        {
            title: 'Lesson 4: Creating Flowcharts for Algorithms',
            description: 'This is a logic lesson',
            id: 3,
            path: `/c/${code}/logical/4`,
        }
    ]);


    const [activatedLogicLesson, setActivatedLogicLesson] = useState(data?.activatedLogicLesson);

    const [completedQuiz, setCompletedQuiz] = useState(null);

    useEffect(() => {
        setActivatedLogicLesson(data?.activatedLogicLesson);
    }, [data]);

    useEffect(() => {
        
        customFetch(`/activity/default/${data.courseId}`, {
            method: 'GET',
        })
            .then(response => {
                setDefaultAssessment(response);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, []);

    const [open, setOpen] = useState({
        lesson: 0,
        quiz: 0
    });

    useEffect(() => {
        if (progress) {
            // If there's no last completed lesson, start with the first lesson
            if (progress?.last_completed_lesson === null) {
                const assessmentLessonId = defaultAssessment.length > 0 ? defaultAssessment[0]?.lessonId : null;
                setOpen({
                    lesson: assessmentLessonId,
                    quiz: assessmentLessonId,
                });
            } else {
                // When there is progress, update lesson and quiz based on last completed
                if(data.subject === 'Python') {
                    if(lessons[progress?.last_completed_lesson + 1]?.hasAssessment) {
                        setOpen({
                            lesson: progress?.last_completed_lesson + 1,
                            quiz: progress?.last_completed_lesson + 1,
                        });
                    } else {
                        setOpen({
                            lesson: progress?.last_completed_lesson + 2,
                            quiz: progress?.last_completed_lesson + 2,
                        });
                    }
                } else {
                    setOpen({
                        lesson: progress?.last_completed_lesson + 1,
                        quiz: progress?.last_completed_quiz + 1,
                    });
                }
            }
        }

    }, [progress, defaultAssessment]);
    

    const isLessonUnlocked = (lessonId, hasAssessment = true) => {
        // Allow access to the first lesson (id 0) for all users if there's no progress
        if (!progress || progress?.last_completed_lesson === null) {
            return lessonId <= open.lesson || user.role === 'teacher';
        }
    
        const baseUnlock = lessonId <=open?.lesson;
        const extraUnlock = hasAssessment && lessonId <=open?.lesson;
    
        return (
            baseUnlock ||
            extraUnlock ||
            (!hasAssessment && lessonId === progress?.last_completed_lesson) ||
            user.role === 'teacher'
        );
    };
    
    const isAssessmentUnlocked = (lessonId, hasAssessment = true) => {
        // Allow access to the first quiz (id 0) for all users if there's no progress
        if (!progress || progress?.last_completed_quiz === null) {
            return lessonId <= open.quiz || user.role === 'teacher';
        }
    
        const baseUnlock = lessonId <=open?.quiz;
        const extraUnlock = hasAssessment && lessonId <=open?.quiz;
    
        return (
            baseUnlock ||
            extraUnlock ||
            (!hasAssessment && lessonId === progress?.last_completed_quiz) ||
            user.role === 'teacher'
        );
    };
    

    useEffect(() => {
        customFetch(`/student/${courseId}/progress?student_id=${user.id}`)
            .then(data => {
                setProgress(data.filter(item => item.course_class_id === courseId)[0]);
                toast.dismiss();
            })
            .catch(error => {
                console.error('Error:', error.message);
                toast.dismiss();
                toast.error('Failed to fetch student progress');
            });
    }, [user.id]);

    const handleSelectChange = (e) => {
        setViewMode(e.target.value);
    };

    const activateLogicLesson = () => {
        setActivatedLogicLesson((prev) => {
            if (prev?.status === 'active') {
                return { ...prev, status: 'inactive' };
            } else {
                return { ...prev, status: 'active' };
            }
        });

        if (activatedLogicLesson?.status === 'active') {
            customFetch(`/class/${data.courseId}/deactivate-logic`, {
                method: 'GET',
            })
            .then(data => {
                toast.success(data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        } else {
            customFetch(`/class/${data.courseId}/activate-logic`, {
                method: 'GET',
            })
            .then(data => {
                toast.success(data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        }
    }

    const navigateToLesson = (lesson) => {
        const encryptedInfo = encryptData(JSON.stringify({ name: className, lesson: lesson.id, subject: data.subject }));
        navigate(`/c/${code}/${lesson.id}?info=${encryptedInfo}`, { state: { name: className, lesson: lesson.id, subject: data.subject } });
    }


    return (
        <div className={styles.contentContainer}>
            <div className={styles.controls}>
                <div>
                    <p><FontAwesomeIcon icon={faFilter} /></p>
                    <select name="" id="" onChange={handleSelectChange}>
                        <option value="all">All</option>
                        <option value="lessons">Lessons Only</option>
                        <option value="quizzes">Assessments Only</option>
                    </select>
                </div>

                {
                    user.role === 'teacher' && (
                        <div>
                            <p className={styles.activateButton} onClick={activateLogicLesson}>
                                <FontAwesomeIcon icon={ activatedLogicLesson?.status !== 'active' ? faKey : faLock} /> 
                                {
                                    activatedLogicLesson?.status == 'active' ? 'Deactivate Logic Lesson' : 'Activate Logic Lesson'
                                }
                            </p>
                        </div>
                    )

                }

            </div>

            {/* <button className={`${progress === null ? "d-none" : ""}`} onClick={toggleViewMode}>
                {viewMode === "all" && "Show Only Quizzes"}
                {viewMode === "quizzes" && "Show Only Lessons"}
                {viewMode === "lessons" && "Show Lessons and Quizzes"}
            </button> */}

            {progress === null && "Loading..."}

            {activatedLogicLesson?.status === 'active' || user.role === 'teacher' ? progress !== null && (viewMode === "all" || viewMode === "lessons") &&
                logicLesson.map((logicLesson) => (
                    <>
                        <div className={`${styles.card} ${user.role === 'teacher' ? activatedLogicLesson?.status !== 'active' ? styles.lockedBorder : styles.unlockedBorder : ""}`}>
                            <div className={styles.left}>
                                <img src={book} alt={"Test"} />
                            </div>
                            <div className={styles.right}>
                                <p className={styles.lessonTitle}>{logicLesson?.title || "Failed Fetching Title"}</p>
                                <p className={styles.lessonDescription}>{logicLesson?.description || "Failed Fetching Description"}</p>
                                <div
                                    className={`${styles.status} ${styles.lesson}`}
                                    onClick={() => navigate(logicLesson.path)}
                                >
                                    <p>
                                        View Lesson
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )) : ""
            }

            {progress !== null && lessons.map((lesson) => (

                <React.Fragment key={lesson.id}>
                    {/* Conditionally render lesson cards based on viewMode */}
                    {(viewMode === "all" || viewMode === "lessons") && (
                        <div className={styles.card}>
                            <div className={styles.left}>
                                <img src={book} alt={lesson.title} />
                            </div>
                            <div className={styles.right}>
                                <p className={styles.lessonTitle}>{lesson.title}</p>
                                <p className={styles.lessonDescription}>{lesson.description || ""}</p>
                                <div
                                    className={`${styles.status} ${isLessonUnlocked(lesson.id, lesson.hasAssessment) ? styles.lesson : styles.locked}`}
                                    onClick={() => {
                                        if (isLessonUnlocked(lesson.id, lesson.hasAssessment)) {
                                            navigateToLesson(lesson);
                                        }
                                    }}
                                >
                                    <p>
                                        {isLessonUnlocked(lesson.id, lesson.hasAssessment) ? (
                                            `View Lesson`
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faLock} /> Locked
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Filter and display quizzes based on viewMode */}
                    {(viewMode === "all" || viewMode === "quizzes") && defaultAssessment.length > 0 && defaultAssessment
                        .filter(assessment => assessment.lessonId === lesson.id)
                        .map((assessment) => (
                            <div className={styles.card} key={assessment.id}>
                                <div className={styles.left}>
                                    <img src={book} alt={assessment.title} />
                                </div>
                                <div className={styles.right}>
                                    <p className={styles.dueText}>{formatDate(assessment?.end_date)}</p>
                                    <p className={styles.lessonTitle}>{assessment.title}</p>
                                    <p className={styles.lessonDescription}>{assessment.description}</p>
                                    <div
                                        className={`${styles.status} ${isAssessmentUnlocked(lesson.id, lesson.hasAssessment) ? styles.viewAssessment : styles.locked}`}
                                        onClick={() =>
                                            isAssessmentUnlocked(lesson.id, lesson.hasAssessment)
                                                ? navigate(`/c/${code}/a/${assessment.title}`, { state: { name: className, progress: progress, item: assessment, classSubject: data?.subject } })
                                                : null
                                        }
                                    >
                                        <p>
                                            {isAssessmentUnlocked(lesson.id, lesson.hasAssessment) ? `
                                                ${ progress?.last_completed_quiz === null || lesson.id > progress?.last_completed_quiz ? `View Quiz` : `View Result`}
                                            ` : <><FontAwesomeIcon icon={faLock} /> Locked </>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </React.Fragment>
            ))}
        </div>
    );
}


function formatDate(dateString) {
    const date = new Date(dateString);
    if (!dateString) {
        return "No Due";
    }

    // Options to format the date
    const options = {
        month: 'short',   // Abbreviated month name (e.g., "Jul")
        day: '2-digit',   // Two-digit day (e.g., "09")
        hour: '2-digit',  // Two-digit hour (e.g., "03")
        minute: '2-digit',// Two-digit minute (e.g., "50")
        hour12: true      // 12-hour clock format (AM/PM)
    };

    // Format the date using toLocaleString
    const formattedDate = date.toLocaleString('en-US', options);

    // Return formatted date in the desired format
    return formattedDate.replace(",", "").replace(/(\d{2})(?=\s)/, '$1');
}