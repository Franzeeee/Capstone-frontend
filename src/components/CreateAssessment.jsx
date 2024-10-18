import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from '../assets/css/components/create-assessment.module.css'

export default function CreateAssessment() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={`${styles.Header}`}>
            <Modal.Title className={`${styles.Title}`}>Create Assessment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Assessment Title</Form.Label>
                <Form.Control type="text" />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Problem</Form.Label>
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Sample Output</Form.Label>
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Expected Output</Form.Label>
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} className={`${styles.Close}`}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose} className={`${styles.Create}`}>
                Create
            </Button>
            </Modal.Footer>
        </Modal>
        <div onClick={handleShow} className={`${styles.createContainer}`}>
            <p>+ Create Assessment</p>
        </div>
    </>
    )
}
