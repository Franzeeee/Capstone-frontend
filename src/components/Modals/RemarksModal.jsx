import React from 'react'
import { Modal } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RemarksModal({ show, handleClose, remarks, handleRemarks }) {
  return (
    <Modal centered show={show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Remarks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form 
                style={{display: 'flex', flexDirection: 'column', marginBottom: '10px'}}
            >
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button style={{backgroundColor: '#5d5dd4e4'}}>Save</Button>
            </Form>
            <p style={{fontSize: '.8rem', marginTop: '10px !important'}}> <span style={{color: 'red', fontWeight: 'bold'}}>Note:</span> This Remark will be displayed on the certificate of completion of the student.</p>
        </Modal.Body>
    </Modal>
  )
}

export default RemarksModal