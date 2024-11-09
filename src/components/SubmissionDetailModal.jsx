import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../assets/css/components/submission-detail-modal.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Feedback from '../components/FeedbackModal.jsx';
import customFetch from '../utils/fetchApi.js';
import { toast } from 'react-toastify';
export default function SubmissionDetailModal({ show, handleClose, submissionData, updateSubmission }) {
    const [key, setKey] = useState("Problem 1");

    const [data, setData] = useState(submissionData);
    const [feedback, setFeedback] = useState(submissionData?.feedback?.feedback);

    const limitInput = (e, index) => {
        // Ensure the input value doesn't exceed 100
        if (e.target.value > 100) {
            e.target.value = 100;
        }
        // Restrict input to a maximum length of 3 characters
        if (e.target.value.length > 3) {
            e.target.value = e.target.value.slice(0, 3);
        }

        // Update the score in the state
        setData({
            ...data,
            coding_problem_submissions: data.coding_problem_submissions.map((submission, i) => {
                if (i === index) {
                    return {
                        ...submission,
                        score: e.target.value
                    };
                }
                return submission;
            })
        });

    };

    const updateFeedback = (text) => {
        setFeedback(text);
        submissionData.feedback.feedback = text;
    };

    useEffect(() => {
        setData(submissionData);
        setFeedback(submissionData?.feedback);
    }, [submissionData]);

    const handleUpdate = () => {
        
        const updateData = new FormData();
        updateData.append('submission_id', data.id);
        updateData.append('score', data.score);
        updateData.append('status', data.status);
        updateData.append('feedback', feedback);

        data.coding_problem_submissions.forEach((submission, index) => {
            updateData.append(`coding_problem_submissions[${index}][id]`, submission.id);
            updateData.append(`coding_problem_submissions[${index}][score]`, submission.score);
            updateData.append(`coding_problem_submissions[${index}][problem_id]`, submission.problem_id);
        });

        

        customFetch('/submission/update', {
            method: 'POST',
            contentType: 'application/json',
            body: updateData
        })
        .then(res => {
            // setData('');
            handleClose();
            toast.success('Submission updated successfully');
            updateSubmission();
        })
        
    };

    useEffect(() => {
        console.log(feedback?.feedback);
    }, [feedback]);


    return (
        <>
            {/* Modal component */}
            <Modal className={styles.modalBody} size='lg' show={show} onHide={handleClose}>
                <Modal.Body>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                    >
                        { data && data?.coding_problem_submissions.map((submission, index) => (
                            <Tab eventKey={`Problem ${index + 1}`} title={`Problem ${index + 1}`}>
                                <div className={styles.problemContainer}>
                                    <div className={styles.heading}>
                                        <p className={styles.header}>{data?.activity?.coding_problems[index]?.title}</p>
                                        <div className={styles.problemDescription}>
                                            <p>
                                            {data?.activity?.coding_problems[index]?.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.heading}>
                                        <p className={styles.header}>Submitted Answer</p>
                                        <div className={`${styles.problemDescription} ${styles.codingBox}`}>
                                            <pre>
                                                {submission?.code}
                                            </pre>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip id={`tooltip-test`}>Copy</Tooltip>}
                                            >
                                                <p className={styles.copyCode}><FontAwesomeIcon icon={faCopy} /></p>
                                            </OverlayTrigger>
                                        </div>
                                    </div>

                                    <div className={styles.heading}>
                                        <p className={`${styles.header} ${styles.codingStats}`}>Score</p>
                                        <div className={`${styles.problemDescription} ${styles.scorebox}`}>
                                            <div className={styles.stats}>
                                                <form action="">
                                                    <input
                                                        className='p-2'
                                                        type="number"
                                                        max={100}
                                                        min={0}
                                                        value={submission?.score}
                                                        onInput={(e) => limitInput(e, index)} // Call the function here
                                                    />
                                                    <p>/</p>
                                                    <input disabled={true} className={`${styles.max} p-2`} type="number" value={100} />
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Tab>
                        ))
                        }
                        <Tab eventKey="overall" title="Overall Score">
                            <div className={styles.problemContainer}>
                            <div className={styles.feedbackContainer}>
                            <Feedback feedbackData={feedback?.feedback} sendFeedback={(text) => updateFeedback(text)} />
                            </div>
                                <div className={styles.circleContainer}>
                                    <div className={styles.circle}>
                                        <p>{data?.score} / 100</p>
                                        <p>Overall Score</p>
                                    </div>
                                </div>
                            <div className={styles.dataContainer}>
                            <div className={styles.content}>
                                <ul>
                                    <li>
                                        <p>Time Remaining</p>
                                        <div className={styles.Contain}>
                                        <div className={styles.loadingBarContainer}>
                                        <div className={styles.loadingBar}></div>
                                        </div>
                                        <p className={styles.details}>1st</p>                                            
                                        </div>

                                    </li>
                                    <li>
                                        <p>Problem Solved</p>
                                        <div className={styles.Contain}>
                                        <div className={styles.loadingBarContainer}>
                                        <div className={styles.loadingBar}></div>
                                        </div>
                                        <p className={styles.details}>1st</p>                                            
                                        </div>
                                    </li>
                                    <li>
                                        <p>Overall Points</p>
                                        <div className={styles.Contain}>
                                        <div className={styles.loadingBarContainer}>
                                        <div className={styles.loadingBar}></div>
                                        </div>
                                        <p className={styles.details}>1st</p>                                            
                                        </div>
                                    </li>
                                    <li>
                                        <p>Current Rank</p>
                                        <div className={styles.Contain}>
                                        <div className={styles.loadingBarContainer}>
                                        <div className={styles.loadingBar}></div>
                                        </div>
                                        <p className={styles.details}>1st</p>                                            
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            </div>
                            </div>
                        </Tab>
                    </Tabs>
                <div className={styles.footer}>
                    <Button variant="secondary" onClick={handleClose} className={styles.Close}>
                        Close
                    </Button>
                    <Button onClick={handleUpdate} variant="primary" className={styles.Update}>
                        Update
                    </Button>
                </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
