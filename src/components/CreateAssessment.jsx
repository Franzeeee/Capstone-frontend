import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from '../assets/css/components/create-assessment.module.css'
import ConfirmationModal from './ConfirmationModal';

export default function CreateAssessment({handleChangePage}) {
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [announcements, setAnnouncements] = useState([]);

    const [activePage, setActivePage] = useState("default"); 

    const handleActivePage = (page) => {
        setActivePage(page);
        handleChangePage(page);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConfirmation = () => {setShowConfirmation(prev => !prev)}

  return (
    <>
            <Offcanvas show={show} onHide={handleClose} placement="top" style={{ width: '90vw', height: '90vh', margin: 'auto'}}>
                <Offcanvas.Header closeButton className={`${styles.Header}`}>
                    <Offcanvas.Title className={`${styles.Title}`}>Create Assessment</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="assessmentTitle">
                            <Form.Label>Assessment Title</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="problem">
                            <Form.Label>Problem</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sampleOutput">
                            <Form.Label>Sample Output</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="expectedOutput">
                            <Form.Label>Expected Output</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Offcanvas.Body>
                <div className="d-flex justify-content-end p-3">
                    <Button variant="secondary" onClick={handleClose} className={`${styles.Close}`}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose} className={`${styles.Create}`}>
                        Create
                    </Button>
                </div>
            </Offcanvas>
        <ConfirmationModal show={showConfirmation} handleClose={handleConfirmation} modalData={{title: "Delete Class Assessment", body: "Are you sure you want to delete the class assessment?", action: () => alert()}}/>
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
                <p onClick={handleConfirmation}>Test Modal</p>
                <p onClick={handleShow}>+ Create Assessment</p>
            </div>
        </div>
    </>
    )
}
