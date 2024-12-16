import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import styles from '../../assets/css/components/Modals/gradesheet-modal.module.css'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import customFetch from '../../utils/fetchApi';
import { toast } from 'react-toastify';

function GradesheetModal({show, handleClose, classId}) {

    const [activities, setActivities] = useState([]);
    const [grades, setGrades] = useState([]);
    const [finalGrades, setFinalGrades] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        customFetch(`/class/${classId}/gradesheet`, {
            method: "GET"
        })
        .then((data) => {
            setGrades(data.data)
            setActivities(data.activities)
            setFinalGrades(data.finalGrades)

        })
        .catch((error) => {
            toast.error("An error occurred while fetching gradesheet")
        })
        .finally(() => {
            setLoading(false)
        })
    }, [show])

return (
    <Modal size='xl' show={show} onHide={handleClose}>
            <Modal.Header onClick={handleClose} closeButton>
                    <h3>Class Gradesheet</h3>
            </Modal.Header>
            <Modal.Body className={`${styles.modalBody}`}>
            <div className={`${styles.tableContainer}`}>
            <MDBTable striped bordered className={`${styles.table} table-responsive`}>
                    <MDBTableHead>
                            <tr className='table-secondary'>
                                    <th scope='col' style={{padding: '0 10px'}}>#</th>
                                    <th scope='col' className={`${styles.tableHeader} ${styles.name}`}>Student Name</th>
                                    {activities && activities.length > 0 && 
                                            activities.map((activity, index) => (
                                                    <th key={index} scope='col'className={styles.tableHeader}>{activity.activity_title || `Activity ${index + 1}`}</th>
                                            ))
                                    }
                                    <th scope='col' className={`${styles.tableHeader} ${styles.finalGrade}`}>Final Grade</th>
                                    <th scope='col' className={`${styles.tableHeader} ${styles.finalGrade}`}>Remarks</th>
                            </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                            {grades && grades.length > 0 &&
                                    grades.map((grade, studentIndex) => {
                                    const studentInfo = grade[0]; // Access student info
                                    const studentGrades = grade[1]; // Access grades for activities

                                    return (
                                            <tr key={studentIndex}>
                                                <td>{studentIndex + 1}</td>
                                                <td>{studentInfo.name}</td> {/* Add student name */}
                                                {activities && activities.length > 0 &&
                                                        activities.map((activity, activityIndex) => {
                                                        // Find the grade for the activity by matching activity IDs
                                                        const matchingGrade = studentGrades.find(
                                                                (g) => g.activity_id === activity.activity_id
                                                        );
                                                        return (
                                                                <td key={activityIndex} className={`text-center`}>
                                                                {matchingGrade ? matchingGrade.submission_score : 0}
                                                                </td>
                                                        );
                                                        })
                                                }
                                                <td className={`${styles.finalGrade} text-center`}>
                                                    {finalGrades[studentIndex].final_grade}
                                                </td>
                                                <td className={`${styles.finalGrade} text-center ${styles.remarks}`}>
                                                    {finalGrades[studentIndex].remarks}
                                                </td>
                                            </tr>
                                    );
                                    })
                            }
                    </MDBTableBody>
            </MDBTable>
            </div>
            </Modal.Body>
    </Modal>
)
}

export default GradesheetModal