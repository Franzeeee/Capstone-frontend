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

    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(
        JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8))
    );

    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    const isLessonUnlocked = (lessonId) => {
        return progress && progress.last_completed_lesson >= lessonId || user.role === 'teacher';
    };

    // Function to determine if an assessment is unlocked
    const isAssessmentUnlocked = (lessonId) => {
        return progress && progress.last_completed_lesson >= lessonId || user.role === 'teacher';
    };


    // Fetch student progress
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

    return (
        <div className={styles.contentContainer}>
            {
                progress === null && "Loading..."
            }
            {progress !== null && lessons.map((lesson, index) => (
                <React.Fragment key={lesson.id}>
                    <div className={styles.card}>
                        <div className={styles.left}>
                            <img src={book} alt={lesson.title} />
                        </div>
                        <div className={styles.right}>
                            <p className={styles.lessonTitle}>{lesson.title}</p>
                            <p className={styles.lessonDescription}>Sample</p>
                            <div className={`${styles.status} ${isLessonUnlocked(lesson.id) ? styles.lesson : styles.locked} `} onClick={() => isLessonUnlocked(lesson.id) ? navigate(`/c/${code}/${lesson.title}`, { state: { name: className, lesson: lesson.id } }) : ""}>
                            <p>{isLessonUnlocked(lesson.id) ? "View Lesson" : <><FontAwesomeIcon icon={faLock} />  Locked</>}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.left}>
                            <img src={book} alt={lesson.title} />
                        </div>
                        <div className={styles.right}>
                            <p className={styles.lessonTitle}>{lesson.title} (Assessment)</p>
                            <div className={`${styles.status} ${isAssessmentUnlocked(lesson.id) ? styles.viewAssessment : styles.locked}`} onClick={() => isLessonUnlocked(lesson.id) ? navigate(`/c/${code}/a/${lesson.title + "_Assessment"}`, { state: { name: className, progress: progress } }) : null}>
                                <p>{isAssessmentUnlocked(lesson.id) ? "View Quiz" : <><FontAwesomeIcon icon={faLock} />  Locked</>}</p>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}