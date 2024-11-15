import React, { useEffect } from 'react'
import styles from '../../assets/css/components/confirmation-modal.module.css'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faWarning } from '@fortawesome/free-solid-svg-icons'

export default function ConfirmationTextModal({ show, handleClose, modalData }) {

    const [loading, setLoading] = React.useState(false);

    const [inputValue, setInputValue] = React.useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const runAction = () => {
        if(modalData.inputMessage === inputValue) {
            setLoading(true);
            modalData.action();
            setInputValue(''); 
            setLoading(false);
        }
    }

    const handleCancel = () => {
        setInputValue('');
        handleClose();
    }



    return (
        modalData && (
            <>
                <Modal centered size='sm' show={show}>
                    <Modal.Body className={styles.modalContainer}>
                        <div className={styles.modalContent}>
                            <p className={styles.icon} style={{color: `${modalData?.iconColor || "red"}`}}><FontAwesomeIcon spin={modalData?.spin} icon={modalData?.icon || faWarning} /></p>
                            <p className={styles.modalTitle}>{modalData.title}</p>
                            <p className={styles.modalBody}>Enter <span>{modalData.inputMessage}</span> to confirm.</p>
                            <input type="text" name='confirm' onChange={handleInputChange} value={inputValue} autoComplete='off' autoCorrect='false' className={styles.confirmInput} placeholder={modalData.inputMessage}/>
                        </div>
                        <div className={styles.modalFooter}>
                            <button type='button' className={`${styles.Close} ${styles.textCancel} ${modalData?.hideCancel ? styles.hide : ""}`} onClick={handleCancel}>
                                {modalData.cancelText || "Cancel"}
                            </button>
                            <button className={`${styles.Confirm} 
                                                ${styles.deleteConfirm} 
                                                ${modalData?.hideConfirm ? styles.hide : ""} 
                                                ${modalData.disableConfirm ? styles.disabled : ""} 
                                                ${modalData.inputMessage !== inputValue ? styles.disabled : ""}`} 
                                    disabled={modalData.disableConfirm || modalData.inputMessage !== inputValue || loading} 
                                    onClick={runAction}>
                                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : modalData.confirmText || "Confirm"}
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    )
}
