import React from 'react'
import { Modal } from 'react-bootstrap'
import styles from '../../assets/css/components/Modals/code-editor-demo-modal.module.css'

export default function CodeEditorDemo({show, handleClose}) {
  return (
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Code Editor Demo </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
        <iframe 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/qDVNEQZpGI0?si=QfGFJQYoEpyWlpCV" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
          className={`tutorialFrame ${styles.tutorialFrame}`}
        >
        </iframe>
        </Modal.Body>
    </Modal>
  )
}
