import React, { useEffect, useState } from 'react';
import HomeTemplate from '../templates/HomeTemplate'; // Remove curly braces
import styles from '../assets/css/pages/dashboard-teacher.module.css'
import { faChartSimple, faCheckSquare, faClock, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';
import profile from '../assets/img/user.png'
import Modal from 'react-bootstrap/Modal';
import CryptoJS from 'crypto-js';
import StudentHome from './Student/StudentHome.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingPage from './LoadingPage.jsx';
import { ToastContainer, toast } from 'react-toastify';
import ClassCardLoader from '../components/ClassCardLoader.jsx';
import Button from 'react-bootstrap/Button';

export const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userRole, setUserRole] = useState(null);
    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8)));

    const sampleData = [
        { name: 'John Doe', section: 'AI41', avgScore: 85 },
        { name: 'Jane Smith', section: 'AI41', avgScore: 90 }, 
        { name: 'Alice Johnson', section: 'AI42', avgScore: 78 },
        { name: 'Bob Brown', section: 'AI42', avgScore: 82 },
        { name: 'John Doe', section: 'AI41', avgScore: 85 },
    ];

    const [formData, setFormData] = useState({
        className: '',
        description: '',
        section: '',
        schedule: '',
        room: '',
        subject: '',
        startDate: '',
        endDate: '',
        teacher_id: 1
    });

    const [latestClasses, setLatestClasses] = useState(null)

    const handleChange = (e) => {
        const { id, value } = e.target; // Get the id and value from the input
        setFormData((prevData) => ({
            ...prevData,
            [id]: value, // Update the state with the new value
        }));
    };
    
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(prevShow => !prevShow);
    const api = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (user.role === 'teacher') {
            // Fetch at least 4 latest classes
            fetch(`${api}/classes?teacher_id=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    setLatestClasses(data);
                })
                .catch(error => console.error('Error fetching classes:', error));
        }
    }, [user.id, user.role]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        const { className, section, schedule, room, subject, startDate, endDate } = formData;
        formData.teacher_id = user.id;

        if (!className || !section || !schedule || !room || !subject || !startDate || !endDate) {
            toast.error('Please fill in all required fields.');
            return; // Prevent form submission
        }
        fetch(`${api}/class/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
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
            setLatestClasses(prev => {
                const newClass = {
                    name: formData.className,
                    section: formData.section,
                    schedule: formData.schedule,
                    room: formData.room,
                    class_code: {code: data.code}
                };
            
                // Check if the length is 4 or greater
                if (prev.length >= 4) {
                    // Remove the last item and insert the new class at the beginning
                    return [newClass, ...prev.slice(0, 3)];
                }
            
                // If less than 4, just add the new class to the beginning
                return [newClass, ...prev];
            });
            toggleShow();
        })
        .catch(error => console.error(error));
    };

    useEffect(() => {
        const role = getUserRole(); // Assume you fetch or determine the role here
        setUserRole(role);
    }, []);

    
    const getUserRole = () => {
        // Mock function, replace this with actual role-check logic
        return user.role
    };
    
    if (userRole === null) {
        return <LoadingPage /> // Show loading while determining the role
    }else if (userRole === 'student') {
        return  <StudentHome />
    }
    
    const moveTo = (url) => {
        navigate(`/${url}`)
    }
    

    return (
        <HomeTemplate>
        <div className={`${styles.container}`}>

            <Modal
                show={show}
                onHide={toggleShow}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className={`${styles.Header}`}>
                <Modal.Title className={`${styles.Title}`}>Create Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="className">Class Name</label>
                            <input type="text" className="form-control" id="className" placeholder="Enter class name" 
                            value={formData.className}
                            onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description (Optional)</label>
                            <textarea className="form-control" id="description" placeholder="Enter class description (optional)"
                            value={formData.description}
                            onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="section">Section</label>
                            <input type="text" className="form-control" id="section" placeholder="Enter section" 
                            value={formData.section}
                            onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="schedule">Schedule</label>
                            <input type="text" className="form-control" id="schedule" placeholder="Enter semester" 
                            value={formData.schedule}
                            onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="room">Room</label>
                            <input type="text" className="form-control" id="room" placeholder="Enter room" 
                            value={formData.room}
                            onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleSelect">Subject</label>
                            <select className="form-control" id="subject" 
                            value={formData.subject}
                            onChange={handleChange}>
                                <option value="">Select a subject</option>
                                <option value={"Python"}>Python</option>
                                <option value={"Web Development"}>Web Development</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date</label>
                            <input type="date" className="form-control" id="startDate" 
                            value={formData.startDate}
                            onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input type="date" className="form-control" id="endDate" 
                            value={formData.endDate}
                            onChange={handleChange}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='border-none'>
                    <Button className={`${styles.Close}`} onClick={toggleShow} >Cancel</Button>
                    <Button className={`${styles.Create}`} onClick={handleSubmit}>Create</Button>
                </Modal.Footer>
            </Modal>

            <div className={`${styles.contentContainer}`}>
                <div className={`${styles.header}`}>
                    <div className={`${styles.create}`}>
                        <p>Course <FontAwesomeIcon icon={faPlusCircle} onClick={toggleShow}></FontAwesomeIcon></p>
                    </div>
                    <div className={`${styles.moreCourse}`}>
                        <p>View More</p>
                    </div>
                </div>
                <div className={`${styles.cardContainer}`}>
                    <div className={`${styles.card}`} >
                    {latestClasses !== null ? (
                        latestClasses.length > 0 ? (
                            latestClasses.map((classItem, index) => (
                                <div key={index} className={`${styles.courseCard}`} onClick={() => navigate(`/c/${classItem.class_code.code}`)}>
                                    <p>{classItem.name}</p>
                                    <p>{classItem.section} ( {classItem.schedule} {classItem.room} )</p>
                                    <p className={`${styles.classCode}`}>Class Code: {classItem.class_code?.code || "No Code"}</p>
                                </div>
                            ))
                        ) : (
                            <div className={`${styles.noClasses}`}>
                                <p>No classes created yet</p>
                            </div>
                        )
                    ) : (
                        <>
                            {[...Array(4)].map((_, index) => (
                                <ClassCardLoader key={index} />
                            ))}
                        </>
                    )}
                    </div>
                    <div className={`${styles.card} pt-1 ${styles.studentPerformance}`}>
                        <div className={`${styles.cardHeader}`}>
                            <p> <FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon> Student Performance</p>
                        </div>
                        <DataTable value={sampleData} scrollable={true} paginator rows={5} className="custom-td-padding customPagination">
                            <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                            <Column field="section" header="Section" style={{ width: '25%' }}></Column>
                            <Column field="avgScore" header="Average Score" style={{ width: '25%' }}></Column>
                            <Column header="Report" style={{width:'10%'}}></Column>
                        </DataTable>
                    </div>
                    <div className={`${styles.card} pt-1 ${styles.studentPerformance}`}>
                        <div className={`${styles.cardHeader}`}>
                            <p> <FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon> Section Performance</p>
                        </div>
                    <DataTable value={sampleData} scrollable={true} paginator rows={5} className="custom-td-padding">
                            <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                            <Column field="section" header="Section" style={{ width: '25%' }}></Column>
                            <Column field="avgScore" header="Average Score" style={{ width: '25%' }}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
            <div className={`${styles.profileContainer}`}>
                <div className={`${styles.profileHeader}`}>
                    <p className={`${styles.profileText}`}>Profile</p>
                </div>
                <div className={`${styles.userInfo}`}>
                    <img src={profile} alt="" />
                    <p className={`${styles.userName}`}>Leonel Abanilla <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></p>
                    <p>Teacher</p>
                </div>
                <div className={`${styles.schedule}`}>
                    <p className={`${styles.scheduleText}`}>Tooday's Schedule</p>
                    
                    <div className={`${styles.activityContainer}`}>
                    <div className={`${styles.card}`}>
                        <div className={`${styles.activityInfo}`}>
                            <p>Activity 1</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <div className={`${styles.taskInfo}`}>
                                <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                                <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                            </div>
                            <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
                        </div>
                    </div>

                    <div className={`${styles.card}`}>
                        <div className={`${styles.activityInfo}`}>
                            <p>Activity 1</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <div className={`${styles.taskInfo}`}>
                                <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                                <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                            </div>
                            <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
                        </div>
                    </div>

                    <div className={`${styles.card}`}>
                        <div className={`${styles.activityInfo}`}>
                            <p>Activity 1</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <div className={`${styles.taskInfo}`}>
                                <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                                <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                            </div>
                            <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
                        </div>
                    </div>

                    <div className={`${styles.card}`}>
                        <div className={`${styles.activityInfo}`}>
                            <p>Activity 1</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <div className={`${styles.taskInfo}`}>
                                <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                                <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                            </div>
                            <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className={`${styles.card}`}>
                        <div className={`${styles.activityInfo}`}>
                            <p>Activity 1</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <div className={`${styles.taskInfo}`}>
                                <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                                <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                            </div>
                            <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
        </HomeTemplate>
    );
};
