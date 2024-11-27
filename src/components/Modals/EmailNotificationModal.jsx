import React from 'react'
import { Modal } from 'react-bootstrap'

export default function EmailNotificationModal({show, handleClose, notificationData}) {
  return (
    <Modal>
        <Modal.Header>
            <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Notification message</p>
        </Modal.Body>
        <Modal.Footer>
            <button>Close</button>
        </Modal.Footer>
    </Modal>
  )
}
