import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SubmittingModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Submitting...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Please wait while we process your submission.
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>
  );
};

export default SubmittingModal;
