import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import styles from '../../assets/css/pages/ClassesPage/class-dashboard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import customFetch from '../../utils/fetchApi'
import { toast } from 'react-toastify'

export default function EditClassModal({show, handleClose, classData, setUpdatedClass}) {

    const [classFormData, setClassFormData] = React.useState({
        className: classData?.name,
        classDescription: classData?.description || "",
        section: classData?.section || "",
        schedule: classData?.schedule,
        room: classData?.room
    })

    const [updating, setUpdating] = React.useState(false)

    const handleInputChange = (e) => {
        setClassFormData({
            ...classFormData,
            [e.target.id]: e.target.value
        })
    }

    const handleUpdateClass = () => {
        console.log(classFormData)
        setUpdating(true)
        const formData = new FormData()
        formData.append('class_id', classData.id)
        formData.append('name', classFormData.className)
        formData.append('description', classFormData.classDescription)
        formData.append('section', classFormData.section)
        formData.append('schedule', classFormData.schedule)
        formData.append('room', classFormData.room)

        customFetch('/class/update', {
            method: 'POST',
            body: formData
        })
        .then(data => {
            console.log(data)
            setUpdatedClass({
                ...classData,
                id: classData.id,
                name: classFormData.className,
                description: classFormData.classDescription,
                section: classFormData.section,
                schedule: classFormData.schedule,
                room: classFormData.room,
            })
            toast.success('Class updated successfully');
            handleClose()
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            setUpdating(false)
        });
    }

    return (
        <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='p-1'>
                    <div className="form-group">
                        <label htmlFor="className">Class Name</label>
                        <input type="text" className="form-control" value={classFormData.className} id="className" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="classDescription">Class Description
                        </label>
                        <textarea className="form-control" defaultValue={classFormData.classDescription} id="classDescription" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="section">Section</label>
                        <input type="text" className="form-control" defaultValue={classFormData.section} id="section" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="schedule">Schedule</label>
                        <input type="text" className="form-control" defaultValue={classFormData.schedule} id="schedule" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="room">Room</label>
                        <input type="text" className="form-control" defaultValue={classFormData.room} id="room" onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.buttonGroup}`}>
                        <button type='button' onClick={handleClose}>Cancel</button>
                        <button disabled={updating} className={`${updating ? styles.disabled : ""}`} onClick={handleUpdateClass} type='button'>Update {updating && <FontAwesomeIcon icon={faSpinner} spin />}</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
