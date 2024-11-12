import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../assets/css/components/assessment-ranking-modal.module.css';
import trophyBot from '../assets/img/robot-trophy.png';
import userImage from '../assets/img/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import customFetch from '../utils/fetchApi';
import CryptoJS from 'crypto-js';

function AssessmentRankingModal({ show, handleClose, assessmentInfo }) {

    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(
        JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8))
    );

    const [isFetching, setIsFetching] = useState(false);

    const [studentData, setStudentData] = useState([
        {
            name: '----',
            score: 100,
            time: '00:00:00',
            rank: 1
        },
        {
            name: '----',
            score: 100,
            time: '00:00:00',
            rank: 2
        },
        {
            name: '----',
            score: 100,
            time: '00:00:00',
            rank: 3
        },
        {
            name: '----',
            score: 100,
            time: '00:00:00',
            rank: 4
        },
        {
            name: '----',
            score: 100,
            time: '00:00:00',
            rank: 5
        },
        {
            name: '----',
            score: 100,
            time: '00:00:00',
            rank: 6
        }
    ]);

    useEffect(() => {
        setIsFetching(true);

        customFetch(`/activity/${assessmentInfo.id}/rankings`, 'GET')
            .then(data => {
                if (data.length >= 4) {
                    // Replace all dummy data if fetched data is more than or equal to 4
                    setStudentData(data.map((student, index) => ({
                        ...student,
                        rank: index + 1,
                        profile_path: student?.profile_path || userImage,
                        time: "00:00:00"
                    })));
                } else {
                    // Update only the top places if data length is less than 4
                    setStudentData(prev => prev.map((item, index) => 
                        data[index] ? { ...data[index], rank: index + 1, profile_path: data[index].profile_path || userImage, time: "00:00:00" } : item
                    ));
                }
            })
            .catch(error => {
                console.error('Error:', error.message);
            })
            .finally(() => setIsFetching(false));
    }, [assessmentInfo.id, show]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body className={styles.mainContainer}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1>Ranking</h1>
                            <div className={styles.infoCard}>
                                <img src={trophyBot} alt="" />
                                <div className={styles.assessmentInfo}>
                                    <p className={styles.title}>
                                        {assessmentInfo?.title}
                                    </p>
                                    <p className={styles.totalItems}>
                                        {assessmentInfo?.coding_problems.length} Coding Problem(s)
                                    </p>
                                    <p className={styles.totalItems}>
                                        Time Limit: {timeFormatter(assessmentInfo?.time_limit || "00:00:00")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rankingContent}>
                            <div className={styles.topStudents}>
                                <div className={styles.topSpot}>
                                    <div className={styles.imageContainer}>
                                        <img src={studentData[1]?.profile_path || userImage} alt="" />
                                        <p className={`${styles.rankingLabel} ${styles.bgPurple}`}>2</p>
                                    </div>
                                    <p className={styles.name}>{studentData[1]?.name}</p>
                                    <p>{studentData[1]?.score}</p>
                                    <p>{studentData[1]?.time}</p>
                                </div>
                                <div className={`${styles.topSpot} ${styles.firstSpot}`}>
                                    <div className={styles.imageContainer}>
                                        <img src={studentData[0]?.profile_path || userImage} alt="" />
                                        <p className={`${styles.rankingLabel}`}>1</p>
                                    </div>
                                    <p className={styles.name}>{studentData[0]?.name}</p>
                                    <p>{studentData[0]?.score}</p>
                                    <p>{studentData[0]?.time}</p>
                                </div>
                                <div className={styles.topSpot}>
                                    <div className={styles.imageContainer}>
                                        <img src={studentData[2]?.profile_path || userImage} alt="" />
                                        <p className={`${styles.rankingLabel} ${styles.thirdPlace}`}>3</p>
                                    </div>
                                    <p className={styles.name}>{studentData[2]?.name}</p>
                                    <p>{studentData[2]?.score}</p>
                                    <p>{studentData[2]?.time}</p>
                                </div>
                            </div>
                            <div className={styles.studentContainer}>
                                {studentData.slice(3).map((student, index) => (
                                    <div key={index} className={`${styles.card} ${user.id === student.id ? styles.active : ""}`}>
                                        <div className={styles.imageContainer}>
                                            <p>{student?.rank}</p>
                                            <img src={student?.profile_path || userImage} alt="student" />
                                        </div>
                                        <p className={styles.name}>{student?.name}</p>
                                        <div className={styles.info}>
                                            <p><FontAwesomeIcon icon={faStar} /> {student?.score}</p>
                                            <p><FontAwesomeIcon icon={faClock} /> {student?.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AssessmentRankingModal;

const timeFormatter = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
