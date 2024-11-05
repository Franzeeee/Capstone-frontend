import React, { useEffect, useState } from 'react';
import styles from '../assets/css/components/course-content.module.css';
import book from '../assets/img/book.png';
import customFetch from '../utils/fetchApi';
import { useNavigate } from 'react-router-dom';

export default function ClassroomWork({ classId, code, className }) {

    const navigate = useNavigate();

    const [isFetching, setIsFetching] = useState(true);
    const [classwork, setClasswork] = useState([]);

    useEffect(() => {
        customFetch(`/activity/${classId}/all`, 'GET')
            .then(data => {
                setClasswork(data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsFetching(false);
            });
    }, [classId]); // Add classId as a dependency to avoid infinite loop

    return (
        <div className={styles.contentContainer}>
            {isFetching ? (
                <div className={styles.loadingContainer}>
                    <p>Loading...</p>
                </div>
            ) : classwork.length > 0 ? (
                classwork.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.left}>
                            <img src={book} alt="test" />
                        </div>
                        <div className={styles.right}>
                            <p className={styles.lessonTitle}>{item.title}</p>
                            <p className={styles.lessonDescription}>{item.description}</p>
                            <div className={styles.status} onClick={() => navigate(`a/${item.title}`, { state: { item: item, code,name: className } })}>
                                <p>View</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className={styles.noContent}>
                    <p>No classwork available</p>
                </div>
            )}
        </div>
    );
}
