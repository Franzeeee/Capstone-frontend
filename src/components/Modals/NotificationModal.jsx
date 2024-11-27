import React from 'react'
import { Modal } from 'react-bootstrap'
import styles from '../../assets/css/components/Modals/notification.module.css'

export default function NotificationModal({show, handleClose, notificationData}) {
  return (
    <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
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
