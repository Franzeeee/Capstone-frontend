import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from '../assets/css/components/create-assessment.module.css'
import ConfirmationModal from './ConfirmationModal';
import CreateAssessmentForm from './AssessmentForm/CreateAssessmentForm';
import { toast } from 'react-toastify';
import { customFetch } from '../utils/api';
import CryptoJS from 'crypto-js';

export default function CreateAssessment({handleChangePage, classId}) {
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    const userData = localStorage.getItem('userData');
    const user = JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8));

    const [activeForm, setActiveForm] = useState("coding");


    const [activePage, setActivePage] = useState("default"); 

    const handleActivePage = (page) => {
        setActivePage(page);
        handleChangePage(page);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleActiveForm = (text) => {
        setActiveForm(text);
    }

    const onSubmit = async (data) => {
        const errors = [];
    
        // Validate required fields
        if (!data.title || data.title.trim() === "") {
            errors.push("Title is required");
        }
        if (!data.description || data.description.trim() === "") {
            errors.push("Description is required");
        }
        if (!data.coding_problems || data.coding_problems.length === 0) {
            errors.push("At least one question is required");
        }
        if (!user.id) {
            errors.push("User ID is required");
        }
        if (!classId) {
            errors.push("Course Class ID is required");
        }
    
        // Time limit validation
        // const timeLimitPattern = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        // if (data.timeLimit && !timeLimitPattern.test(data.timeLimit)) {
        //     errors.push("Time limit must be in the format hh:mm:ss");
        // } else if (data.timeLimit === "00:00:00") {
        //     errors.push("Time limit must be at least 1 second (00:00:01 or greater)");
        // }
    
        // Display errors if any
        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            return;
        }

        console.log(data);
    
        try {

            data.course_class_id = classId;
            data.user_id = user.id;

            data.coding_problems = data.coding_problems.map(problem => ({
                title: problem.problem_title,       // Change key to title
                description: problem.problem_description, // Change key to description
                sample_input: problem.sample_input,
                expected_output: problem.expected_output
            }));

            const response = await customFetch('/activity/create', {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include',
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log("Form data is valid:", result);
            toast.success("Assessment created successfully");
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            toast.error("Failed to create assessment");
        }
    };
    

    return (
        <>
            <Offcanvas show={show} backdrop="static" className={styles.offCanvas} onHide={handleClose} placement="top" style={{ width: '80vw', height: '90vh', margin: 'auto'}}>
                <Offcanvas.Header className={`${styles.Header}`} closeButton>
                    <Offcanvas.Title className={`${styles.Title}`}>Create Assessment</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={styles.offcanvasBody}>
                    <div className={styles.assessmentOptions}>
                        <div className={activeForm === 'logic' && styles.active} onClick={() => handleActiveForm("logic")}>
                            <p>Logic</p>
                        </div>
                        <div className={activeForm === 'coding' && styles.active} onClick={() => handleActiveForm("coding")}>
                            <p>Coding</p>
                        </div>
                    </div>
                    <CreateAssessmentForm activeForm={activeForm} handleClose={handleClose} onSubmit={onSubmit} />
                </Offcanvas.Body>
            </Offcanvas>
            <div className={`${styles.createContainer}`}>
                <div className={styles.menuContainer}>
                    <ul>    
                        <li className={activePage === 'default' ? styles.active : ''} onClick={() => handleActivePage("default")}>Default</li>
                        <li className={activePage === 'classwork' ? styles.active : ''} onClick={() => handleActivePage("classwork")}>Classwork</li>
                        <li className={activePage === 'announcement' ? styles.active : ''} onClick={() => handleActivePage("announcement")}>Announcement</li>
                        <li className={activePage === 'people' ? styles.active: ''} onClick={() => handleActivePage("people")}>People</li>
                    </ul>
                </div>
                {user.role === 'teacher' && (
                    <div className={styles.buttonContainer}>
                        <p onClick={handleShow}>+ Create Assessment</p>
                    </div>
                )}
            </div>
        </>
    )
}
