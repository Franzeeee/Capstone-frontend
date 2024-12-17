import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styles from "../assets/css/components/FeedbackModal.module.css"
import '../index.css'
const FeedbackModal = ({feedbackData, sendFeedback}) => {
    const [feedback, setFeedback] = useState(feedbackData || '');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setFeedback(e.target.value);
    }

    const handleSubmit = () => {
        sendFeedback(feedback);
        handleClose();
    }

    useEffect(() => {
        setFeedback(feedbackData);
    }, [feedbackData]);

    return (
        <div className='feedbackModal'>
            <Button variant="primary" className={styles.MainBtn} onClick={handleShow}>Feedback</Button>
            <Modal show={show} centered onHide={handleClose} className={styles.container}>
                <Modal.Body className={styles.modalContent} >
                    <Modal.Title className={styles.Title}>Feedback</Modal.Title>
                    <textarea 
                        rows="5" 
                        className={styles.textArea}  
                        placeholder="Write your feedback here..."
                        name='feedback'
                        value={feedback}
                        onChange={handleChange}
                    />
                    <div className="text-end" >
                    <Button variant="secondary" onClick={handleClose} className={styles.BtnClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit} className={styles.BtnUpdate}>Update</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default FeedbackModal;
