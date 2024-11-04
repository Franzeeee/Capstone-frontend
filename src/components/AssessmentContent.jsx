import React, { useEffect, useState } from 'react';
import styles from '../assets/css/components/assessment-content.module.css';
import questionMark from '../assets/img/assessment-img1.png';
import happy from '../assets/img/perfect-assessment-robot.png';
import sad from '../assets/img/assessment-fail.png'
import SubmittingModal from './SubmitLoader';
import ConfirmationModal from './ConfirmationModal';
import AssessmentRankingModal from './AssessmentRankingModal';
import { getUserData } from '../utils/userInformation';



export default function AssessmentContent({ status = false, startButton, data, rank, submission }) {
    const imageUsed = status === 'pending' ? questionMark : status === 'pass' ? happy : sad;
    const phraseUsed = status === 'pending' ? 'Are you ready and confident to take the lesson assessment?' : status === 'pass' ? 'Congratulations!' : 'Try again!';

    const user = getUserData();

    const [showRanking, setShowRanking] = useState(false);

    const handleClose = () => setShowRanking(false);
    const handleShow = () => setShowRanking(true);

    const handleBtn = () => { 
        if (!status) {
            startButton();
        }
    };

    const timeFormatter = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
    
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds
                .toString()
                .padStart(2, '0')}`;
        }
    };

    return (
        <>
            <AssessmentRankingModal show={showRanking} assessmentInfo={data} handleClose={handleClose} />
            {!status ? 
            <div className={styles.container}>
                
                <div className={styles.title}>
                    <p>{data?.title || "Null"}</p>
                </div>
                <div className={styles.content}>
                    <ul>
                        <li>
                            <p>Time Remaining</p>
                            <LoadingBar progress={100} status={status} />
                            <p>{timeFormatter(data.time_limit)}</p>
                        </li>
                        <li>
                            <p>Problem Solved</p>
                            <LoadingBar progress={0} status={status} />
                            <p>0/{data.coding_problems.length}</p>
                        </li>
                        <li>
                            <p>Overall Points</p>
                            <LoadingBar progress={0} status={status} />
                            <p>--/{data.point}</p>
                        </li>
                        <li>
                            <p>Current Rank</p>
                            <LoadingBar progress={0} status={status} />
                            <p>----</p>
                        </li>
                    </ul>
                </div>
                <div className={styles.controls}>
                    <button onClick={() => setShowRanking(true)}>View Ranking</button>
                    { user.role === 'student' && <button onClick={handleBtn}>Start Assessment</button>
                        
                    }
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
                            <LoadingBar progress={0} status={status} />
                            <p>--:--</p>
                        </li>
                        <li>
                            <p>Total Problem</p>
                            <LoadingBar progress={100} status={status} />
                            <p>{data.coding_problems.length}</p>
                        </li>
                        <li>
                            <p>Overall Points</p>
                            <LoadingBar progress={submission?.score || 0} status={status} />
                            <p>{submission?.score || 0}/100</p>
                        </li>
                        <li>
                            <p>Current Rank</p>
                            <LoadingBar progress={100} status={status} />
                            <p>{getOrdinalSuffix(rank.rank) ?? '--'}</p>
                        </li>
                    </ul>
                    {/* <div className={styles.robotContainer}>
                        <img src={imageUsed} alt="" />
                        <p>{phraseUsed}</p>
                    </div> */}
                </div>
                <div className={styles.controls}>
                    <button onClick={handleShow}>View Ranking</button>
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


function getOrdinalSuffix(rank) {
    const lastDigit = rank % 10;
    const lastTwoDigits = rank % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return rank + "st";
    } else if (lastDigit === 2 && lastTwoDigits !== 12) {
        return rank + "nd";
    } else if (lastDigit === 3 && lastTwoDigits !== 13) {
        return rank + "rd";
    } else {
        return rank + "th";
    }
}