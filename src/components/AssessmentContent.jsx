import React, { useEffect, useState } from 'react';
import styles from '../assets/css/components/assessment-content.module.css';
import questionMark from '../assets/img/assessment-img1.png';
import happy from '../assets/img/perfect-assessment-robot.png';
import sad from '../assets/img/assessment-fail.png'
import SubmittingModal from './SubmitLoader';
import ConfirmationModal from './ConfirmationModal';
import AssessmentRankingModal from './AssessmentRankingModal';
import { getUserData } from '../utils/userInformation';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import customFetch from '../utils/fetchApi';
import CodeReviewModal from '../components/CodeReviewModal';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

export default function AssessmentContent({ status = false, antiCheat, startButton, feedback, data, time, rank, submission, submittedCode }) {
    const imageUsed = status === 'pending' ? questionMark : status === 'pass' ? happy : sad;
    const phraseUsed = status === 'pending' ? 'Are you ready and confident to take the lesson assessment?' : status === 'pass' ? 'Congratulations!' : 'Try again!';

    const user = getUserData();
    const navigate = useNavigate();

    const [showReview, setShowReview] = useState(false);

    const { code } = useParams();

    const [feedbackData, setFeedbackData] = useState(feedback);

    const [showFeedback, setShowFeedback] = useState(false);

    const [showRanking, setShowRanking] = useState(false);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClose = () => setShowRanking(false);
    const handleShow = () => setShowRanking(true);

    const handleBtn = () => { 
        if (!status) {
            setShowConfirmation(true);
        }
    };

    const handleConfirm = () => {
        startButton();
        setShowConfirmation(false);
    };

    useEffect(() => {
        feedback?.feedback !== '' && setFeedbackData(feedback);
    }, [feedback]);

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

    const feedbackModal = () => {
        setShowFeedback(true);
    }

    const closeFeedbackModal = () => {
        setShowFeedback(false);
    }

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const currentTime = new Date();

    
        const dueDate = new Date(data?.end_date);

        const timeDifference = dueDate - currentTime;
    
        if (timeDifference > 0 || data?.end_date === null) {
            // Convert the time difference from milliseconds to seconds
            const remainingSeconds = Math.floor(timeDifference / 1000);
    
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [data]);

    const [totalSubmission, setTotalSubmission] = useState(0);
    

    useEffect(() => {
        customFetch(`/activity/${data?.id}/rankings`, 'GET')
            .then(data => {
                setTotalSubmission(data.length);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, [data]);
    
    console.log(feedbackData?.feedback)
    return (
        <>
            <AssessmentRankingModal show={showRanking} assessmentInfo={data} handleClose={handleClose} />
            <Modal show={showFeedback}>
                <ModalHeader closeButton onClick={closeFeedbackModal}>Feedback</ModalHeader>
                <ModalBody>
                    <p>
                        <ul className={styles.feedbackContainer}>
                            {feedbackData?.feedback && parseText(feedbackData?.feedback).length > 0 ? parseText(feedbackData?.feedback).map((line, index) => (
                                <span key={index}>
                                    <li>{line}</li>
                                    <br />
                                </span>
                            )) : ''}
                        </ul>
                    </p>
                </ModalBody>
            </Modal>
            {!status ? 
            <div className={styles.container}>
                
                <div className={styles.title}>
                    <p>{data?.title || "Null"}</p>
                </div>
                <div className={styles.content}>
                    <ul>
                        { user.role === 'student' &&
                        <>
                            <li>
                                <p>Time Remaining</p>
                                <LoadingBar progress={100} status={status} />
                                <p>{timeFormatter(data?.time_limit || 1)}</p>
                            </li>
                            <li>
                                <p>Problem Solved</p>
                                <LoadingBar progress={0} status={status} />
                                <p>0/{data?.coding_problems.length}</p>
                            </li>
                            <li>
                                <p>Overall Points</p>
                                <LoadingBar progress={0} status={status} />
                                <p>--/{data?.point}</p>
                            </li>
                            <li>
                                <p>Current Rank</p>
                                <LoadingBar progress={0} status={status} />
                                <p>----</p>
                            </li>
                        </>
                        }
                        { user.role === 'teacher' &&
                            <>
                                <li>
                                    <p>Time Limit</p>
                                    <LoadingBar progress={100} status={status} />
                                    <p>{timeFormatter(data?.time_limit || 1)}</p>
                                </li>
                                <li>
                                    <p>Total Problem</p>
                                    <LoadingBar progress={100} status={status} />
                                    <p>{data?.coding_problems.length}</p>
                                </li>
                                <li>
                                    <p>Overall Points</p>
                                    <LoadingBar progress={100} status={status} />
                                    <p>{data?.point}</p>
                                </li>
                                <li>
                                    <p>Total Submissions</p>
                                    <LoadingBar progress={100} status={status} />
                                    <p>{totalSubmission || 0}</p>
                                </li>
                            </>
                        }
                    </ul>
                </div>
                <div className={styles.controls}>
                    <button onClick={() => setShowRanking(true)}>View Ranking</button>
                    { open && user.role === 'student' && 
                        <button onClick={handleBtn}>Start Assessment</button>
                    }
                    { user.role === 'teacher' &&    
                        <button onClick={() => navigate(`/teacher/classes/${code}/dashboard`)}>View Activities & Submission</button>
                    }
                </div>
            </div>
            : 
            <div className={styles.container}>
                <div className={styles.title}>
                    <p>{data?.title || "Assessment Title"}</p>
                </div>
                <div className={styles.content}>
                    <ul>
                        <li>
                            <p>Time Taken</p>
                            <LoadingBar progress={((data?.time_limit - time) / data?.time_limit) * 100} />
                            <p>{formatTime(time)}</p>
                        </li>
                        <li>
                            <p>Total Problem</p>
                            <LoadingBar progress={100} />
                            <p>{data?.coding_problems.length}</p>
                        </li>
                        <li>
                            <p>Overall Points</p>
                            <LoadingBar progress={submission?.score || 0}/>
                            <p>{submission?.score || 0}/100</p>
                        </li>
                        <li>
                            <p>Current Rank</p>
                            <LoadingBar progress={100} status={status} />
                            <p>{getOrdinalSuffix(rank?.rank) ?? '--'}</p>
                        </li>
                    </ul>
                </div>
                <div className={`${styles.antiCheatStats}`}>
                    <div className={`${antiCheat[0] > 1 ? styles.alerted : ""}`}>
                        <p>{antiCheat[1] ?? 0}</p>
                        <p>Exit Fullscreen</p>
                    </div>
                    <div className={`${antiCheat[1] > 1 ? styles.alerted : ""}`}>
                        <p>{antiCheat[0] ?? 0}</p>
                        <p>Change Tab</p>
                    </div>
                </div>
                <div className={styles.controls}>
                    <button onClick={handleShow}>View Ranking</button>
                    <button type='button' disabled={!feedbackData} className={`${feedbackData ? "" : styles.disableButton}`} onClick={() => setShowFeedback(true)}>View Feedback</button>
                    <button type='button' onClick={() => setShowReview(true)}>Review Code</button>
                </div>
            </div>
            }
            <CodeReviewModal
                show={showReview}
                handleClose={() => setShowReview(false)}
                submissionData={submittedCode}
            />
            <ConfirmationModal
                show={showConfirmation}
                handleClose={() => setShowConfirmation(false)}
                modalData={{
                    title: "Start Assessment",
                    body: "Are you sure you want to start the assessment?",
                    action: handleConfirm,
                    icon: faQuestion,
                }}
            />
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


// Format seconds into MM:SS
const formatTime = (seconds) => {
if (isNaN(seconds) || seconds < 0) {
    return '00:00';
}
const minutes = Math.floor(seconds / 60);
const remainingSeconds = seconds % 60;
return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

function calculateRemainingPercentage(totalTime, pausedTime) {
    const elapsedTime = totalTime - pausedTime;  // Time elapsed
    const elapsedPercentage = (elapsedTime / totalTime) * 100;  // Percentage of time passed
    const remainingPercentage = 100 - elapsedPercentage;  // Remaining time as a percentage
    return remainingPercentage;
}
function parseText(input) {
    // Split the text by the '-' character and remove extra spaces
    const lines = input.split('-').map(line => line.trim()).filter(line => line.length > 0);

    return lines;
}