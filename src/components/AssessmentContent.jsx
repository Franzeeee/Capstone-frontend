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
            <div>
            <img className={`${status === 'pending' && styles.pending}`} src={imageUsed} alt="" />
            </div>
            <p className={styles.p1}>{phraseUsed}</p>
            <p className={styles.resultText}>{resultPhrase}</p>
            <button onClick={handleBtn}>{buttonText}</button>
        </div>
    )
}
