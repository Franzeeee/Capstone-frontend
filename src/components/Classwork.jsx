import React, { useEffect, useState } from 'react'
import styles from '../assets/css/components/course-content.module.css';
import book from '../assets/img/book.png';
import customFetch from '../utils/fetchApi';

export default function Classwork({classId}) {

    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        customFetch(`/activity/${classId}/all`, 'GET')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsFetching(false);
            });
    });

    return (
        <div className={styles.contentContainer}>
            <div className={styles.card}>
                <div className={styles.left}>
                    <img src={book} alt="test" />
                </div>
                <div className={styles.right}>
                    <p className={styles.lessonTitle}>Title</p>
                    <div className={`${styles.status}`} >
                        <p>View</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
