import React from 'react'
import { Modal } from 'react-bootstrap'

export default function CodeEditorDemo({show, handleClose}) {
  return (
    <Modal show={show}>
        <Modal.Header onClick={handleClose} closeButton>
            <Modal.Title>Code Editor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Code Editor Demo</p>
        </Modal.Body>
    </Modal>
  )
}
