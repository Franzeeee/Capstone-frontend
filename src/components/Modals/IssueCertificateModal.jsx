import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styles from '../../assets/css/components/Modals/issue-certificate-modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCog, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function IssueCertificateModal({show, handleClose}) {

    const navigate = useNavigate();

    const [hoveredConfirm, setHoveredConfirm] = useState(false);
    const [hoveredCog, setHoveredCog] = useState(false);

  return (
    <Modal show={show} className={styles.certModal}>
        <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Issue Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Issue Certificate to:</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="passed"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="all" control={<Radio />} label="All Students" />
                    <FormControlLabel value="passed" control={<Radio />} label="Passed/Eligible Students" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Certificate Date:</FormLabel>
                <input type='date' />
            </FormControl>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
            <button 
                onMouseEnter={() => setHoveredCog(true)} 
                onMouseLeave={() => setHoveredCog(false)}
                onClick={() => navigate('/certificate', { state: { captureMode: false, studetName: "Student Name", teacher: "This" } })}
            >
                {hoveredCog ? <FontAwesomeIcon icon={faMagnifyingGlass} fade = {hoveredCog}/> : "Preview"}
            </button>
            <button 
                onClick={() => navigate('/certificate', { state: { captureMode: true } })} 
                onMouseEnter={() => setHoveredConfirm(true)}
                onMouseLeave={() => setHoveredConfirm(false)}
            >
                {!hoveredConfirm ? 'Confirm' : <FontAwesomeIcon icon={faCheckCircle} fade/>}
            </button>
        </Modal.Footer>
    </Modal>
  )
}
