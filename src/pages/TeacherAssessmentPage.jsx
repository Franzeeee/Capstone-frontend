import React from 'react';
import HomeTemplate from '../templates/HomeTemplate';
import styles from '../assets/css/pages/teacher-assessment.module.css';
import { useNavigate } from 'react-router-dom';
import ProfileSide from '../components/ProfileSide';
import { getUserData } from '../utils/userInformation';
import book from '../assets/img/book.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlusCircle, faCopy, faEye, faTrashAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import customFetch from '../utils/fetchApi';
import LessonCardLoader from '../components/LazyLoaders/LessonCardLoader';
import ConfirmationTextModal from '../components/Modals/ConfirmationTextModal';
import { Modal, Button } from 'react-bootstrap';

export default function TeacherAssessmentPage() {
    const navigate = useNavigate();
    const user = getUserData();
    const api = import.meta.env.VITE_API_URL;

    // Example array of class items
    const [classItems, setClassItems] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        className: '',
        description: '',
        section: '',
        schedule: '',
        room: '',
        subject: '',
        startDate: '',
        endDate: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    const toggleShow = () => setShow(!show);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault(); // Prevent the default form submission
        const { className, section, schedule, room, subject, startDate, endDate } = formData;
        formData.teacher_id = user.id;

        if (!className || !section || !schedule || !room || !subject) {
            toast.error('Please fill in all required fields.');
            setLoading(false);
            return; // Prevent form submission
        }
        fetch(`${api}/class/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            credentials: 'include',
            body: JSON.stringify(formData),
        })
        .then( async response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 422) {
                return response.json().then(errorData => {
                    // Create a string of error messages
                    const errorMessages = Object.values(errorData.errors).flat().join(', ');
                    // Show the error messages using toast.error
                    toast.error(`Error: ${errorMessages}`);
                    throw new Error('Validation failed'); // This will go to the catch block
                });
            } else {
                throw new Error('Network response was not ok: ' + response.status);
            }
        })
        .then(data => {
            toast.success("Course Successfully Created!");
            setClassItems(prev => {
                const newClass = {
                    id: data.data.id,
                    description: formData.description,
                    grade_distribution: data.data.grade_distribution,
                    student_count: 0,
                    subject: formData.subject,
                    name: formData.className,
                    section: formData.section,
                    schedule: formData.schedule,
                    room: formData.room,
                    class_code: {code: data.classCode}
                };

                return [newClass, ...prev];
            });
            toggleShow();
        })
        .catch(error => console.error(error))
        .finally(() => {
            setLoading(false);
            setFormData({
                className: '',
                description: '',
                section: '',
                schedule: '',
                room: '',
                subject: '',
            });
        });
    };

    useEffect(() => {
        customFetch(`/class/all`, 'GET')
            .then(data => {
                setClassItems(data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, []);


    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success('Class code copied to clipboard');
    }

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const showDeleteConfirmationModal = (id) => {
        setSelectedClass(id);
        setShowDeleteConfirmation(true);
    }
    const deleteClass = (id) => {
        // Delete class logic here
        setShowDeleteConfirmation(false);
        customFetch(`/class/${selectedClass}/delete`, {
            method: 'DELETE',
        })
            .then(data => {
                toast.success('Class deleted successfully');
                setClassItems(classItems.filter(item => item.id !== selectedClass));
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }

    return (
        <HomeTemplate>
            <div className={`${styles.container}`}>
                <ConfirmationTextModal 
                    show={showDeleteConfirmation} 
                    handleClose={() => setShowDeleteConfirmation(false)} 
                    modalData={{
                        title: 'Delete Class',
                        inputMessage: 'delete class',
                        action: () => deleteClass(),
                        confirmText: 'Delete',
                        cancelText: 'Cancel',
                    }}
                />
                <div className={`${styles.contentContainer}`}>
                    <div className={`${styles.header}`}>
                        <div className={`${styles.create}`}>
                            <p>Classes  <FontAwesomeIcon icon={faPlusCircle} onClick={toggleShow} /></p>
                        </div>
                    </div>
                    <div className={`${styles.cardContainer}`}>
                        { classItems ? classItems.length === 0 ? <p className='text-center'>No classes found</p> : null : <LessonCardLoader />}
                        { classItems && classItems.length > 0 &&    
                            classItems.map((classItem, index) => (
                            <div key={index} className={`${styles.card}`}>
                                <div className={`${styles.courseImage}`}>
                                    <img src={book} alt="" />
                                </div>
                                <div className={`${styles.courseText}`}>
                                    <p>{classItem.name} <span style={{fontSize: '.7rem'}}>({classItem?.section})</span></p>
                                    <p className={`${styles.classCode}`}>Class Code: <span>{classItem.class_code.code}</span> <FontAwesomeIcon onClick={() => copyCode(classItem.class_code.code)} icon={faCopy} /></p>
                                </div>
                                <div className={`${styles.goTo}`}>
                                <OverlayTrigger
                                        placement="auto" // Adjust placement as needed
                                        overlay={<Tooltip id={`tooltip-${index}`}>Delete Class</Tooltip>}
                                    >
                                        <div className={`${styles.viewButton} ${styles.deleteClass}`} onClick={() => showDeleteConfirmationModal(classItem.id)}>
                                            <p className='m-0'><FontAwesomeIcon icon={faTrashAlt} /></p>
                                        </div>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="auto" // Adjust placement as needed
                                        overlay={<Tooltip id={`tooltip-${index}`}>Preview Class</Tooltip>}
                                    >
                                        <div className={`${styles.viewButton}`} onClick={() => navigate(`/c/${classItem.class_code.code}`)}>
                                            <p className='m-0'><FontAwesomeIcon icon={faEye} /></p>
                                        </div>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="auto" // Adjust placement as needed
                                        overlay={<Tooltip id={`tooltip-${index}`}>Class Dashboard</Tooltip>}
                                    >
                                    <div className={`${styles.viewButton}`} onClick={() => navigate(`${classItem.class_code.code}/dashboard`, {state: {data: classItem}})} >
                                        <p className='m-0' title='Overview'><FontAwesomeIcon icon={faArrowRight} fade /></p>
                                    </div>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`${styles.profileContainer}`}>
                    <ProfileSide info={user} />
                </div>

                <Modal
                show={show}
                onHide={toggleShow}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton className={`${styles.Header}`}>
                <Modal.Title className={`${styles.Title}`}>Create Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>  
                        <div className="form-group">
                            <label htmlFor="className"className={`${styles.label}`}>Class Name</label>
                            <input type="text" className="form-control" id="className" placeholder="Enter class name" 
                            value={formData.className}
                            onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className={`${styles.label}`}>Description (Optional)</label>
                            <textarea className="form-control" id="description" placeholder="Enter class description (optional)"
                            value={formData.description}
                            onChange={handleChange} />
                        </div>
                        <div className={`${styles.contain}`}>
                        <div className="form-group">
                            <label htmlFor="section" className={`${styles.label}`}>Section</label>
                            <input type="text" className="form-control" id="section" placeholder="Enter section" 
                            value={formData.section}
                            onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="schedule"className={`${styles.label}`}>Schedule</label>
                            <input type="text" className="form-control" id="schedule" placeholder="Enter Schedule" 
                            value={formData.schedule}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="room"className={`${styles.label}`}>Room</label>
                            <input type="text" className="form-control" id="room" placeholder="Enter room" 
                            value={formData.room}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleSelect"className={`${styles.label}`}>Subject</label>
                            <select className="form-control" id="subject" 
                            value={formData.subject}
                            onChange={handleChange}>
                                <option value=""className={`${styles.label}`}>Select a subject</option>
                                <option value={"Python"}>Python</option>
                                <option value={"Web Development"}>Web Development</option>
                                <option value={"R Programming"}>R Programming</option>
                            </select>
                        </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='border-none'>
                    <Button type='button' className={`${styles.Close}`} onClick={toggleShow} >Cancel</Button>
                    <Button type='button' disabled={loading} className={`${styles.Create}`} onClick={loading ? "" : handleSubmit}>{!loading ?  "Create" : <FontAwesomeIcon spin icon={faSpinner}/>}</Button>
                </Modal.Footer>
            </Modal>
            </div>
        </HomeTemplate>
    );
}
