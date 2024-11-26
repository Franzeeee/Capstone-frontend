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
import { getUserData } from '../../utils/userInformation';
import customFetch from '../../utils/fetchApi';

export default function IssueCertificateModal({show, handleClose, classId, nameClass}) {

    const navigate = useNavigate();
    const user = getUserData();

    const [hoveredConfirm, setHoveredConfirm] = useState(false);
    const [hoveredCog, setHoveredCog] = useState(false);

    const [selectedValue, setSelectedValue] = useState('passed');
    const [selectedDate, setSelectedDate] = useState(() => {
        // Format the current date as YYYY-MM-DD to ignore time
        const currentDate = new Date();
        return currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' format
      });

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const issueCertificate = () => {
        customFetch('/class/certificate/issue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                issue_date: selectedDate,
                issued_to: selectedValue,
                teacher_name: user.name,
                class_name: nameClass,
                class_id: classId,
            }),
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }

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
                    name="radio-buttons-group"
                    value={selectedValue}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="all" control={<Radio />} label="All Students" />
                    <FormControlLabel value="passed" control={<Radio />} label="Passed/Eligible Students" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Certificate Date:</FormLabel>
                <input 
                    type='date' 
                    value={selectedDate} 
                    onChange={handleDateChange}
                />
            </FormControl>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
            <button 
                onMouseEnter={() => setHoveredCog(true)} 
                onMouseLeave={() => setHoveredCog(false)}
                onClick={() => navigate('/certificate', { state: { captureMode: false, studetName: "Student Name", teacher: user.name, date: selectedDate } })}
            >
                {hoveredCog ? <FontAwesomeIcon icon={faMagnifyingGlass} fade = {hoveredCog}/> : "Preview"}
            </button>
            <button 
                onClick={issueCertificate} 
                onMouseEnter={() => setHoveredConfirm(true)}
                onMouseLeave={() => setHoveredConfirm(false)}
            >
                {!hoveredConfirm ? 'Confirm' : <FontAwesomeIcon icon={faCheckCircle} fade/>}
            </button>
        </Modal.Footer>
    </Modal>
  )
}
