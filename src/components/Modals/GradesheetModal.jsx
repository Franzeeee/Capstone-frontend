import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import styles from '../../assets/css/components/Modals/gradesheet-modal.module.css'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import customFetch from '../../utils/fetchApi';

function GradesheetModal({show, handleClose}) {

    const [activities, setActivities] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        customFetch(`/class/1/gradesheet`, {
            method: "GET"
        })
        .then((data) => {
            setGrades(data.data)
            setActivities(data.activities)
            
        })
    }, [])

  return (

    <Modal size='xl' show={show} onHide={handleClose}>
        <Modal.Header onClick={handleClose} closeButton>
            <h3>Class Gradesheet</h3>
        </Modal.Header>
        <Modal.Body>
        <MDBTable striped  responsive hover className={styles.table}>
            <MDBTableHead>
                <tr className='table-secondary'>
                    <th scope='col'>#</th>
                    {activities && activities > 0 && activities.map((activity, index) => {
                        <>
                            <th scope='col'>{activity.title}</th>
                        </>
                    })}
                </tr>
            </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <th scope='row'>1</th> {/* Adjust index for pagination */}
                        <td>Name</td>
                        <td style={{textAlign: 'center'}}>Name 2</td>
                        <td>test</td>
                        <td style={{ textAlign: 'center' }}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id={`tooltip-test`}>Final Grade</Tooltip>}
                        >
                            <p className={styles.finalGradeBtn}><FontAwesomeIcon fade icon={faChartBar} /></p>
                        </OverlayTrigger>
                        </td>
                    </tr>
                </MDBTableBody>
                
            </MDBTable>
        </Modal.Body>
    </Modal>
  )
}

export default GradesheetModal