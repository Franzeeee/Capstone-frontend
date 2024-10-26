import React, { useState } from 'react';
import styles from '../assets/css/components/assessment-content.module.css';
import questionMark from '../assets/img/assessment-img1.png';
import happy from '../assets/img/perfect-assessment-robot.png';
import sad from '../assets/img/assessment-fail.png';

export default function AssessmentContent({ status = 'pending', startButton }) {
    const imageUsed = status === 'pending' ? questionMark : status === 'pass' ? happy : sad;
    const phraseUsed = status === 'pending' ? 'Are you ready and confident to take the lesson assessment?' : status === 'pass' ? 'Congratulations!' : 'Try again!';

    const handleBtn = () => { 
        if (status === 'pending') {
            startButton();
        }
    };


    return (
        <>
            {status === 'pending' ? 
            <div className={styles.container}>
                <div className={styles.title}>
                    <p>Assessment Title Here</p>
                </div>
                <div className={styles.content}>
                    <ul>
                        <li>
                            <p>Time Remaining</p>
                            <LoadingBar progress={100} status={status} />
                            <p>60:00</p>
                        </li>
                        <li>
                            <p>Problem Solved</p>
                            <LoadingBar progress={0} status={status} />
                            <p>0/1</p>
                        </li>
                        <li>
                            <p>Overall Points</p>
                            <LoadingBar progress={0} status={status} />
                            <p>--/100</p>
                        </li>
                        <li>
                            <p>Current Rank</p>
                            <LoadingBar progress={0} status={status} />
                            <p>----</p>
                        </li>
                    </ul>
                </div>
                <div className={styles.controls}>
                    <button onClick="">View Ranking</button>
                    <button onClick={handleBtn}>Start Assessment</button>
                </div>
            </div>
            : 
            <div className={styles.container}>
                <div className={styles.title}>
                    <p>Assessment Title Here</p>
                </div>
                <div className={styles.content}>
                    <ul>
                        <li>
                            <p>Time Remaining</p>
                            <LoadingBar progress={100} status={status} />
                            <p>60:00</p>
                        </li>
                        <li>
                            <p>Problem Solved</p>
                            <LoadingBar progress={0} status={status} />
                            <p>0/1</p>
                        </li>
                        <li>
                            <p>Overall Points</p>
                            <LoadingBar progress={35} status={status} />
                            <p>35/100</p>
                        </li>
                        <li>
                            <p>Current Rank</p>
                            <LoadingBar progress={60} status={status} />
                            <p>12th</p>
                        </li>
                    </ul>
                    {/* <div className={styles.robotContainer}>
                        <img src={imageUsed} alt="" />
                        <p>{phraseUsed}</p>
                    </div> */}
                </div>
                <div className={styles.controls}>
                    <button onClick="">View Ranking</button>
                    <button disabled={status !== 'pending'} className={`${status !== 'pending' && styles.disableButton}`} onClick={handleBtn}>View Feedback</button>
                </div>
            </div>
            }
        </>
    );
}

const LoadingBar = ({ progress }) => {
    const getColor = (progress) => {
        if (progress < 50) return 'red';
        if (progress < 75) return 'yellow';
        return '#16dd00';
    };

    return (
        <>
        <div className={styles.loadingBarContainer}>
            <div
                className={styles.loadingBar}
                style={{
                    width: `${progress}%`,
                    backgroundColor: getColor(progress),
                }}
            ></div>
        </div>
        </>
    );
};
