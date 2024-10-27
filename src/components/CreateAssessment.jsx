import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from '../assets/css/components/create-assessment.module.css'
import ConfirmationModal from './ConfirmationModal';
import CreateAssessmentForm from './AssessmentForm/CreateAssessmentForm';

export default function CreateAssessment({handleChangePage}) {
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [activeForm, setActiveForm] = useState("coding");

    const [announcements, setAnnouncements] = useState([]);

    const [activePage, setActivePage] = useState("default"); 

    const handleActivePage = (page) => {
        setActivePage(page);
        handleChangePage(page);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConfirmation = () => {setShowConfirmation(prev => !prev)}

    const handleActiveForm = (text) => {
        setActiveForm(text);
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <Offcanvas show={show} backdrop="static" className={styles.offCanvas} onHide={handleClose} placement="top" style={{ width: '80vw', height: '90vh', margin: 'auto'}}>
                <Offcanvas.Header className={`${styles.Header}`} >
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
                        <li className={activePage === 'default' && styles.active} onClick={() => handleActivePage("default")}>Default</li>
                        <li className={activePage === 'classwork' && styles.active} onClick={() => handleActivePage("classwork")}>Classwork</li>
                        <li className={activePage === 'announcement' && styles.active} onClick={() => handleActivePage("announcement")}>Announcement</li>
                        <li className={activePage === 'people' && styles.active} onClick={() => handleActivePage("people")}>People</li>
                    </ul>
                </div>
                <div className={styles.buttonContainer}>
                    <p onClick={handleShow}>+ Create Assessment</p>
                </div>
            </div>
        </>
    )
}
