import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import customFetch from '../../utils/fetchApi'
import styles from '../../assets/css/components/Modals/badge-modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';

function BadgeModal({show, handleClose, studentId, classId}) {

    const [badge, setBadge] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        customFetch(`/${studentId}/${classId}/badge/fetch`)
            .then(data => {
                setBadge(data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            })
            .finally(() => {
                setFetching(false);
            });
    }, [studentId]);

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Student Badges ({badge.length})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <div className={styles.control}>
                <Form.Check // prettier-ignore
                    type="switch"
                    id={`default-switch`}
                    label="Everyone can see this"
                />
            </div> */}
            <div className={badge?.length > 0 ? styles.badgeContainer : styles.noBadge}>
                {badge && badge.length > 0 ? badge.map((badge, index) => 
                (
                    <div className={styles.badgeContent}>
                        <FontAwesomeIcon icon={faAward} className={badge?.badge_type === "Gold" ? styles.first : badge?.badge_type === "Silver" ? styles.second : styles.third}/>
                        <p>{badge?.description}</p>
                    </div>
                ))
                :
                fetching ? <p>Loading...</p> : <p>No badge yet</p>
                }
            </div>
        </Modal.Body>
    </Modal>
  )
}

export default BadgeModal