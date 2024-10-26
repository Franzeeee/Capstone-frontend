import React from 'react'
import styles from '../assets/css/components/assessment-content.module.css';
import questionMark from '../assets/img/assessment-img1.png';
import happy from '../assets/img/assessment-pass.png';
import sad from '../assets/img/assessment-fail.png';

export default function AssessmentContent({status = 'pending', startButton}) {

    const imageUsed = status === 'pending' ? questionMark : status === 'pass' ? happy : sad;
    const phraseUsed = status === 'pending' ? 'Are you ready and confident to take the lesson assessment?' : status === 'pass' ? 'Congratulations!' : 'Try again!';
    const resultPhrase = status === 'pending' ? null :
        status === 'pass' ? (
            <>
                You have scored <span className={styles.pass}>100 </span>points.
            </>
        ) : (
            <>
                You have scored <span className={`${styles.fail}`}>70+ </span>points.
            </>
        );

    const buttonText = status === 'pending' ? 'Start Assessment' : status === 'pass' ? 'Return to Class' : 'Try Again';

    const handleBtn = () => { 
        if(status === 'pending') {
            startButton();
        }
    }
    return (
        <div className={`${styles.container}`}>
            <div className={styles.title}>
                <p>Assessment TItle Here</p>
            </div>
            <div className={styles.content}>
                <ul>
                    <li>
                        <p>Time Remaining</p>
                        <LoadingBar progress={100}/>
                        <p>60:00</p>
                    </li>
                    <li>
                        <p>Problem Solved</p>
                        <LoadingBar progress={0}/>
                        <p>0/1</p>
                    </li>
                    <li>
                        <p>Overall Points</p>
                        <LoadingBar progress={35}/>
                        <p>35/100</p>
                    </li>
                    <li>
                        <p>Current Rank</p>
                        <LoadingBar progress={60}/>
                        <p>12th</p>
                    </li>
                </ul>
            </div>
            <div className={styles.controls}>
                <button>Cancel</button>
                <button>Start</button>
            </div>
        </div>
    )
}

const LoadingBar = ({ progress }) => {
    const getColor = (progress) => {
        if (progress < 50) return 'red';
        if (progress < 75) return 'yellow';
        return '#16dd00';
    };

    return (
        <div className={styles.loadingBarContainer}>
            <div
                className={styles.loadingBar}
                style={{
                    width: `${progress}%`,
                    backgroundColor: getColor(progress),
                }}
            ></div>
        </div>
    );
};