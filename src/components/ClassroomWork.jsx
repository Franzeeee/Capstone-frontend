import React, { useEffect, useState } from 'react';
import styles from '../assets/css/components/course-content.module.css';
import book from '../assets/img/book.png';
import customFetch from '../utils/fetchApi';
import { useNavigate } from 'react-router-dom';
import { encryptData } from '../utils/cryptoUtils';

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
    
    const navigateToAssessment = (item) => {
        const encryptedInfo = encryptData(JSON.stringify({ item: item, code,name: className }));
        navigate(`a/${item.title}?info=${encryptedInfo}`, { state: { item: item, code,name: className } });
    }


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
                            <p className={styles.dueText}>{formatDate(item?.end_date)}</p>
                            <p className={styles.lessonTitle}>{item.title}</p>
                            <p className={styles.lessonDescription}>{item.description}</p>
                            <div className={styles.status} onClick={() => navigateToAssessment(item)}>
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