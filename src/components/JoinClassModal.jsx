
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from '../assets/css/components/join-class.module.css';

const JoinClassModal = ({ show, handleClose, handleJoinSuccess, studentID }) => {
    const [classCode, setClassCode] = useState('');
    const [error, setError] = useState('');

    const api = import.meta.env.VITE_API_URL;

    const handleJoinClass = async () => {
        setError(''); // Reset error message
    
        try {
          const response = await fetch(`${api}/class/join`, {  // Replace with your actual API endpoint
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ class_code: classCode, student_id: studentID }), // Ensure the keys match your backend
            });
        
            const data = await response.json(); // Parse the JSON response
        
            if (response.ok) {
                handleJoinSuccess(data); // Pass the response to the main page
                handleClose(); // Close the modal
                setClassCode("")
            } else {
                // Handle different status codes
                if (response.status === 400) {
                    setError('You are already enrolled in this class.'); // Specific message for 400
                } else if (response.status === 404 || response.status === 422) {
                    setError("Class code does not exist. Please check and try again.")
                } else {
                    setError(data.message || 'An error occurred.'); // General error message for other status codes
                }
            }
            } catch (err) {
            setError(err.message); // Set error message for UI (optional)
            }
        };

        const hide = () => {
            handleClose();
            setClassCode("");
            setError("");
        }

    return (
        <Modal show={show} onHide={hide}>
        <Modal.Body >
            <Form>
            <Form.Group controlId="formClassCode">
                <div>
                    <h1 className={`${styles.Title}`}>
                    Join Class
                </h1>
                </div>
                
                <Form.Label className={`${styles.label}`}>Class Code</Form.Label>
                <Form.Control
                type="text"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                placeholder="Enter class code"
                 className="mb-3"
                />
                {error && <p className="text-danger m-0">{error}</p>}
            </Form.Group>
            <div className="text-end" >
            <Button variant="primary" onClick={handleJoinClass} className={`${styles.BtnJoin}`}>
            Join Class
            </Button>
            <Button variant="secondary" onClick={handleClose} className={`${styles.BtnClose}`}>
            Close
            </Button>
            </div>
            </Form>
        </Modal.Body>
            
        </Modal>
    );
};

export default JoinClassModal;
