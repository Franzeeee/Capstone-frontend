import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import styles from '../assets/css/components/assessment-ranking-modal.module.css';
import trophyBot from '../assets/img/robot-trophy.png';
import user from '../assets/img/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';

function AssessmentRankingModal({show, handleClose}) {

    const [studentData, setStudentData] = useState([
        {
            name: 'John Doe',
            score: 100,
            time: '00:10:00',
            rank: 1
        },
        {
            name: 'Jane Doe',
            score: 100,
            time: '00:30:00',
            rank: 2
        },
        {
            name: 'Jonas Doe',
            score: 90,
            time: '00:25:00',
            rank: 3
        },
        {
            name: 'Jenny Doe',
            score: 89,
            time: '00:30:00',
            rank: 4
        }
    ]);

    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Body className={styles.mainContainer}>
                <div className={`${styles.container}`}>
                    <div className={styles.header}>
                        <h1>Ranking</h1>
                        <div className={styles.infoCard}>
                            <img src={trophyBot} alt="" />
                            <div className={styles.assessmentInfo}>
                                <p className={styles.title}>
                                    Writing Comments in Python and hide it in the scofd jjfkdsf fjdkfjd fjdkfj 
                                </p>
                                <p className={styles.totalItems}>
                                    1 Coding Problem
                                </p>
                                <p className={styles.totalItems}>
                                    Time Limit: 30mins
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rankingContent}>
                        <div className={styles.topStudents}>
                            <div className={styles.topSpot}>
                                <div className={styles.imageContainer}>
                                    <img src={user} alt="" />
                                    <p className={`${styles.rankingLabel} ${styles.bgPurple}`}>2</p>
                                </div>
                                <p className={styles.name}>{studentData[1].name}</p>
                                <p>{studentData[1].score}</p>
                                <p>{studentData[1].time}</p>
                            </div>
                            <div className={`${styles.topSpot} ${styles.firstSpot}`}>
                                <div className={styles.imageContainer}>
                                    <img src={user} alt="" />
                                    <p className={`${styles.rankingLabel}`}>1</p>
                                </div>
                                <p className={styles.name}>{studentData[0].name}</p>
                                <p>{studentData[0].score}</p>
                                <p>{studentData[0].time}</p>
                            </div>
                            <div className={styles.topSpot}>
                                <div className={styles.imageContainer}>
                                    <img src={user} alt="" />
                                    <p className={`${styles.rankingLabel} ${styles.thirdPlace}`}>3</p>
                                </div>
                                <p className={styles.name}>{studentData[2].name}</p>
                                <p>{studentData[2].score}</p>
                                <p>{studentData[2].time}</p>
                            </div>
                        </div>
                        <div className={styles.studentContainer}>
                            <div className={`${styles.card} ${styles.active}`}>
                                <div className={styles.imageContainer}>
                                    <p>4</p>
                                    <img src={user} />
                                </div>
                                <p className={styles.name}>Franz Peter Diaz</p>
                                <div className={styles.info}>
                                    <p><FontAwesomeIcon icon={faStar} /> 80</p>
                                    <p><FontAwesomeIcon icon={faClock} /> 00:30:00</p>
                                </div>
                            </div>
                            <div className={`${styles.card}`}>
                                <div className={styles.imageContainer}>
                                    <p>5</p>
                                    <img src={user} />
                                </div>
                                <p className={styles.name}>Franz Peter Diaz</p>
                                <div className={styles.info}>
                                    <p><FontAwesomeIcon icon={faStar} /> 70</p>
                                    <p><FontAwesomeIcon icon={faClock} /> 00:30:00</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default AssessmentRankingModal;