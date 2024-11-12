import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import styles from '../assets/css/components/PrintModal.module.css'
const PrintModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>
        <Button variant="primary" className={styles.MainBtn} onClick={handleShow}>Feedback</Button>
         <Modal show={show} centered onHide={handleClose} className={styles.container}>
                <Modal.Body className={styles.modalContent} >
                    <div>
                        <p>
                            Would you like to print the certificate?
                        </p>
                    </div>
                    <div>
                        <Button variant="secondary" onClick={handleClose} className={styles.BtnClose}>Close</Button>
                        <Button variant="primary" onClick={handleSubmit} className={styles.BtnUpdate}>Print</Button>
                    </div>
                </Modal.Body>
            </Modal>
    </div>
  )
}

export default PrintModal