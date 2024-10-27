import React from 'react'
import styles from '../assets/css/components/confirmation-modal.module.css'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from '@fortawesome/free-solid-svg-icons'

export default function ConfirmationModal({ show, handleClose, modalData }) {

    return (
        modalData && (
            <>
                <Modal centered size='sm' show={show}>
                    <Modal.Body className={styles.modalContainer}>
                        <div className={styles.modalContent}>
                            <p className={styles.icon} style={{color: `${modalData?.iconColor || "red"}`}}><FontAwesomeIcon icon={modalData?.icon || faWarning} /></p>
                            <p className={styles.modalTitle}>{modalData.title}</p>
                            <p className={styles.modalBody}>{modalData.body}</p>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={`${styles.Close}`} onClick={handleClose}>
                                {modalData.cancelText || "Cancel"}
                            </button>
                            <button className={`${styles.Confirm}`} onClick={modalData.action}>
                                {modalData.confirmText || "Confirm"}
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    )
}
