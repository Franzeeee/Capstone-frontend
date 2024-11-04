import React, { useEffect, useState } from 'react';
import styles from '../assets/css/components/course-content.module.css';
import book from '../assets/img/book.png';
import { useNavigate } from 'react-router-dom';
import lessons from '../utils/data';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import customFetch from '../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default function ClassContents({ data, code, className }) {
    const navigate = useNavigate();
    const { courseId } = data;
    const [defaultAssessment, setDefaultAssessment] = useState([]);
    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(
        JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8))
    );
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("all"); // "all" for lessons & quizzes, "quizzes" for only quizzes, "lessons" for only lessons

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

    const [unlockedLessonIndex, setUnlockedLessonIndex] = useState(progress?.last_completed_lesson || 0);
    const [unlockedAssessmentIndex, setUnlockedAssessmentIndex] = useState(progress?.last_completed_quiz + 1 || 0);

    const isLessonUnlocked = (lessonId, hasAssessment = true) => {
        // Allow access to the first lesson (id 0) for all users if there's no progress
        if (!progress || progress.last_completed_lesson === null) {
            return lessonId === 0 || user.role === 'teacher';
        }
    
        const baseUnlock = lessonId <= progress.last_completed_lesson + 1;
        const extraUnlock = hasAssessment && lessonId <= progress.last_completed_lesson + 2;
    
        return (
            baseUnlock ||
            extraUnlock ||
            (!hasAssessment && lessonId === progress.last_completed_lesson) ||
            user.role === 'teacher'
        );
    };
    
    const isAssessmentUnlocked = (lessonId, hasAssessment = true) => {
        // Allow access to the first quiz (id 0) for all users if there's no progress
        if (!progress || progress.last_completed_quiz === null) {
            return lessonId === 0 || user.role === 'teacher';
        }
    
        const baseUnlock = lessonId <= progress.last_completed_quiz + 1;
        const extraUnlock = hasAssessment && lessonId <= progress.last_completed_quiz + 2;
    
        return (
            baseUnlock ||
            extraUnlock ||
            (!hasAssessment && lessonId === progress.last_completed_quiz) ||
            user.role === 'teacher'
        );
    };
    

    useEffect(() => {
        customFetch(`/student/progress?student_id=${user.id}`)
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

    // Function to cycle through view modes
    const toggleViewMode = () => {
        setViewMode((prevMode) => {
            if (prevMode === "all") return "quizzes";
            if (prevMode === "quizzes") return "lessons";
            return "all";
        });
    };

    return (
        <div className={styles.contentContainer}>
            <button className={`${progress === null ? "d-none" : ""}`} onClick={toggleViewMode}>
                {viewMode === "all" && "Show Only Quizzes"}
                {viewMode === "quizzes" && "Show Only Lessons"}
                {viewMode === "lessons" && "Show Lessons and Quizzes"}
            </button>

            {progress === null && "Loading..."}

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
                                <p className={styles.lessonDescription}>Sample</p>
                                <div
                                    className={`${styles.status} ${isLessonUnlocked(lesson.id, lesson.hasAssessment) ? styles.lesson : styles.locked}`}
                                    onClick={() => {
                                        if (isLessonUnlocked(lesson.id, lesson.hasAssessment)) {
                                            navigate(`/c/${code}/${lesson.title}`, { state: { name: className, lesson: lesson.id } });
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
                    {(viewMode === "all" || viewMode === "quizzes") && defaultAssessment
                        .filter(assessment => assessment.lessonId === lesson.id)
                        .map((assessment) => (
                            <div className={styles.card} key={assessment.id}>
                                <div className={styles.left}>
                                    <img src={book} alt={assessment.title} />
                                </div>
                                <div className={styles.right}>
                                    <p className={styles.lessonTitle}>{assessment.title}</p>
                                    <p className={styles.lessonDescription}>{assessment.description}</p>
                                    <div
                                        className={`${styles.status} ${isAssessmentUnlocked(lesson.id, lesson.hasAssessment) ? styles.viewAssessment : styles.locked}`}
                                        onClick={() =>
                                            isAssessmentUnlocked(lesson.id, lesson.hasAssessment)
                                                ? navigate(`/c/${code}/a/${assessment.title}`, { state: { name: className, progress: progress, item: assessment } })
                                                : null
                                        }
                                    >
                                        <p>
                                            {isAssessmentUnlocked(lesson.id, lesson.hasAssessment) ? `View Quiz` : <><FontAwesomeIcon icon={faLock} /> Locked</>}
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
