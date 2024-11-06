import React,{useState} from 'react';
import {Button, Modal} from 'react-bootstrap';


const FeedbackModal = () => {
    const [show, setShow] = useState(false);
    const handleClose =()=>setShow(false);
    const handleShow =()=>setShow(true);
  return (
    <>
        <Button variant="primary" onClick={handleShow}>Feedback</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Title>Feedback</Modal.Title>
            <Modal.Body>
                <input type="textarea"/>
            </Modal.Body>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary">Update</Button>
        </Modal>
    </>
  );
}

export default FeedbackModal