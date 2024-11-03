import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../assets/css/components/submission-detail-modal.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function SubmissionDetailModal({ show, handleClose }) {
    const [key, setKey] = useState('home');

    const limitInput = (e) => {
        // Ensure the input value doesn't exceed 100
        if (e.target.value > 100) {
            e.target.value = 100;
        }
        // Restrict input to a maximum length of 3 characters
        if (e.target.value.length > 3) {
            e.target.value = e.target.value.slice(0, 3);
        }
    };

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
                        <Tab eventKey="home" title="Home">
                            <div className={styles.problemContainer}>
                                <div className={styles.heading}>
                                    <p className={styles.header}>Problem Title</p>
                                    <div className={styles.problemDescription}>
                                        <p>
                                            A problem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.heading}>
                                    <p className={styles.header}>Submitted Answer</p>
                                    <div className={`${styles.problemDescription} ${styles.codingBox}`}>
                                        <pre>
                                            fdf
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
                                                    defaultValue={100}
                                                    onInput={limitInput} // Call the function here
                                                />
                                                <p>/</p>
                                                <input disabled={true} className={`${styles.max} p-2`} type="number" value={100} />
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Tab>
                        <Tab eventKey="overall" title="Overall Score">
                            <div className={styles.problemContainer}>
                            <div className={styles.feedbackContainer}>
                                <Button className={styles.feedback}>Feedback</Button>
                            </div>
                                <div className={styles.circleContainer}>
                                    <div className={styles.circle}>
                                        <p>80 / 100</p>
                                        <p>Overall Score</p>
                                    </div>
                                </div>
                            <div className={styles.dataContainer}>
                            <div className={styles.content}>
                                <ul>
                                    <li>
                                        <p>Time Remaining</p>
                                        <div className={styles.loadingBarContainer}>
                                        <div className={styles.loadingBar}></div>
                                        <p>1st</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>Problem Solved</p>
                                        <div className={styles.loadingBarContainer}>
                                        <div className={styles.loadingBar}></div>
                                        <p>1st</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>Overall Points</p>
                                        <div className={styles.loadingBarContainer}>
                                        <div className={styles.loadingBar}></div>
                                        <p>1st</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>Current Rank</p>
                                        <div className={styles.loadingBarContainer}>
                                        <div className={styles.loadingBar}></div>
                                        <p>1st</p>
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
                    <Button variant="primary" className={styles.Update}>
                        Update
                    </Button>
                </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
