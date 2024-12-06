import React, { useEffect, useState } from 'react';
import HomeTemplate from '../templates/HomeTemplate'; // Remove curly braces
import styles from '../assets/css/pages/dashboard-teacher.module.css'
import { faChartSimple, faCheckSquare, faClock, faEdit, faPlusCircle, faSpinner, faTable } from '@fortawesome/free-solid-svg-icons';
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
import ProfileSide from '../components/ProfileSide.jsx';
import TeacherScatterPlot from '../components/Charts/TeacherScatterPlot.jsx';
import customFetch from '../utils/fetchApi.js';
import TeacherBarChart from '../components/Charts/TeacherBarChart.jsx';

export const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userRole, setUserRole] = useState(null);
    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8)));

    const [loading, setLoading] = useState(false);

    const [sampleData, setSampleData] = useState([]);
    const [classPerformanceData, setClassPerformanceData] = useState([]);

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

    const [latestClasses, setLatestClasses] = useState(null)

    const handleChange = (e) => {
        const { id, value } = e.target; // Get the id and value from the input
        setFormData((prevData) => ({
            ...prevData,
            [id]: value, // Update the state with the new value
        }));
    };
    
    const [show, setShow] = useState(false);

    const [activateSPerformanceChart, setActivateSPerformanceChart] = useState(true);
    const [label, setLabel] = useState('');
    const [studentPerformanceTable, setStudentPerformanceTable] = useState(false);

    const [showClassPerformanceChart, setShowClassPerformanceChart] = useState(true);
    const [classPerformanceLabel, setClassPerformanceLabel] = useState([]);
    const [classPerforanceSend, setClassPerformanceSend] = useState({});

    const toggleShow = () => setShow(prevShow => !prevShow);
    const api = import.meta.env.VITE_API_URL;
    
    const [teacherClass, setTeacherClass] = useState(null);
    const [activeClass, setActiveClass] = useState(null);

    const updateActiveClass = (e) => {
        setActiveClass(e.target.value);
    }

    const [dataset, setDataset] = useState([]);

    useEffect(() => {
        if (user.role === 'teacher') {
            // Fetch at least 4 latest classes
            fetch(`${api}/classes?teacher_id=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
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

                // Fetch teacher classess and student performance
            customFetch(`/teacher/class/all`, {
                method: 'GET',
            })
            .then(data => {
                setTeacherClass(data);
                if (data.length > 0) {
                    setActiveClass(data[0].id);
                }
            })
            .catch(error => console.error('Error fetching classes:', error));

            customFetch(`/class/${user.id}/score/average`, {
                method: 'GET',
            })
            .then(data => {
                data?.map((item, index) => {
                    setClassPerformanceData(prev => ([
                        ...prev,
                        {
                            name: item?.label,
                            section: item?.class_section || 'N/A',
                            avgScore: item?.data || 0,
                            enrolled: item?.enrolled_student_count || 0
                        }
                    ]))

                    setClassPerformanceLabel(prev => ([
                        ...prev,
                        item?.label
                    ]))

                }
                )
            })
            .catch(error => console.error('Error fetching classes:', error));
        }
    }, [user.id, user.role]);

    const [classPerData, setClassPerData] = useState([]);

    useEffect(() => {
        if(user.role === 'teacher') {
            classPerformanceData && classPerformanceData?.map((item) => {
                setClassPerData(prev => {
                    return [
                        ...prev,
                        item?.avgScore
                    ];
                });
            });
        }
    }, [classPerformanceData]);
    

    useEffect(() => {
        if (activeClass) {
            setSampleData([]);
            customFetch(`/class/${activeClass}/student/average`)
            .then(data => {
                setDataset({
                    data: data.data,
                    backgroundColor: generateRandomRGB(),
                })
                setLabel(data?.label);
                setStudentPerformanceTable(data);
                data?.data?.map((item, index) => {
                    setSampleData(prev => {
                        return [
                            ...prev,
                            {
                            name: item?.x,
                            section: data?.classData?.section,
                            avgScore: item?.y
                        }]  
                    })
                })
            })
            .catch(error => console.error('Error fetching classes:', error));
        }

    }, [activeClass, teacherClass, activateSPerformanceChart]);

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
            setLatestClasses(prev => {
                const newClass = {
                    name: formData.className,
                    section: formData.section,
                    schedule: formData.schedule,
                    room: formData.room,
                    class_code: {code: data.classCode}
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
    

    return (
        <HomeTemplate>
        <div className={`${styles.container}`}>

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
                                <option value={"R Programming"}>R Programming</option>
                                <option value={"Web Development"}>Web Development</option>
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

            <div className={`${styles.contentContainer}`}>
                <div className={`${styles.header}`}>
                    <div className={`${styles.create}`}>
                        <p>Classes <FontAwesomeIcon icon={faPlusCircle} onClick={toggleShow}></FontAwesomeIcon></p>
                    </div>
                    <div className={`${styles.moreCourse}`}>
                        <p onClick={() => navigate('/teacher/classes')}>View More</p>
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
                                    <p className={`${styles.classCode}`}>Class Code: {classItem.class_code?.code || "Code Generation Error"}</p>
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
                            <select name="class" id="" defaultValue={activeClass} onChange={updateActiveClass}>
                                { teacherClass && teacherClass.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))
                                }
                            </select>
                            <p className={styles.chartText} onClick={() => setActivateSPerformanceChart(prev => !prev)}>
                            {
                                !activateSPerformanceChart ? (
                                    <span>
                                        <FontAwesomeIcon icon={faChartSimple} /> View Chart
                                    </span>
                                ) : (
                                    <span>
                                        <FontAwesomeIcon icon={faTable} /> View Table
                                    </span>
                                )
                            }
                            </p>
                        </div>
                        {
                            activateSPerformanceChart ? (
                                <TeacherScatterPlot labels={label} dataClass={dataset} />
                            ) : (
                                <DataTable value={sampleData} scrollable={true} paginator rows={5} className="custom-td-padding">
                                    <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                                    <Column field="section" header="Section" style={{ width: '25%' }}></Column>
                                    <Column field="avgScore" header="Average Score" style={{ width: '25%' }}></Column>
                                </DataTable>
                            )
                        }
                    </div>
                    
                    <div className={`${styles.card} pt-1 ${styles.studentPerformance}`}>
                        <div className={`${styles.cardHeader}`}>
                            <p> <FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon> Class Performance</p>
                            <p className={styles.chartText} onClick={() => setShowClassPerformanceChart(prev => !prev)}>
                            {
                                !showClassPerformanceChart ? (
                                    <span>
                                        <FontAwesomeIcon icon={faChartSimple} /> View Chart
                                    </span>
                                ) : (
                                    <span>
                                        <FontAwesomeIcon icon={faTable} /> View Table
                                    </span>
                                )
                            }
                            </p>
                        </div>
                        { showClassPerformanceChart ? (
                                <TeacherBarChart labelsReceived={classPerformanceLabel} receivedData={classPerData}/>
                            ) : (

                                <DataTable value={classPerformanceData} scrollable={true} paginator rows={5} className="custom-td-padding" emptyMessage="No available data">
                                    <Column field="name" header="Class Name" style={{ width: '30%' }}></Column>
                                    <Column field="section" header="Section" style={{ width: '10%' }}></Column>
                                    <Column field="avgScore" header="Average Score" style={{ width: '10%' }}></Column>
                                    <Column field="enrolled" header="Total Student" style={{ width: '10%' }}></Column>
                                </DataTable>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={`${styles.profileContainer}`}>
                <ProfileSide info={user} />
            </div>
        </div>
        </HomeTemplate>
    );
};

function generateRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
