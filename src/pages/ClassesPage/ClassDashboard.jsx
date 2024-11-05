import React, { useEffect, useState } from 'react';
import HomeTemplate from '../../templates/HomeTemplate';
import styles from '../../assets/css/pages/ClassesPage/class-dashboard.module.css';
import ProfileSide from '../../components/ProfileSide';
import { getUserData } from '../../utils/userInformation';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython } from '@fortawesome/free-brands-svg-icons';
import { faChalkboardUser, faCopy, faEllipsisVertical, faExclamation, faUsers } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import customFetch from '../../utils/fetchApi';
import { Dropdown } from 'react-bootstrap';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Offcanvas } from 'react-bootstrap';
import CreateAssessmentForm from '../../components/AssessmentForm/CreateAssessmentForm';
import SubmissionDetailModal from '../../components/SubmissionDetailModal';



export default function ClassDashboard() {
    const user = getUserData();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = window.location.pathname;
    const classData = location.state?.data;

    const [isLoading, setIsLoading] = useState(true);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);


    const [itemId, setItemId] = useState(null);
    const [show, setShow] = useState(false);
    const [activeForm, setActiveForm] = useState('logic');

    useEffect(() => {
        if (!location.state?.verified || !classData) {
            navigate('/not-found');
        }
    }, [location, navigate, classData]);

    useEffect(() => {
        fetchAssessments(currentPage);
        setIsLoading(false)
    }, [currentPage]); // Fetch assessments whenever currentPage changes

    const fetchAssessments = async (page) => {
        try {
            const data = await customFetch(`/activity/${classData.id}/fetch?page=${page}`, 'GET');
            setPagination(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleNextPage = (direction) => {
        if (direction === 'Next' && currentPage < pagination.last_page) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'Previous' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleJumpToPage = (page) => {
        setCurrentPage(page);
    };

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success('Class code copied to clipboard');
    };

    const handleShowAdditionalInfo = () => {
        setShowAdditionalInfo(!showAdditionalInfo);
    };

    if (!location.state?.verified || !classData) {
        return null; // Prevents rendering before navigation
    }

    const handleCloseDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
    }

    const handleShowDeleteConfirmation = (id) => {
        setItemId(id);
        setShowDeleteConfirmation(true);
    }

    const handleDeleteAssessment = () => {
        customFetch(`/activity/${itemId}/delete`, 'GET')
            .then(data => {
                toast.success('Assessment deleted successfully');
                setPagination((prevPagination) => ({
                    ...prevPagination,
                    data: prevPagination.data.filter((assessment) => assessment.id !== itemId),
                }));
            })
            .catch(error => {
                console.error('Error:', error.message);
                toast.error('Failed to delete assessment');
            });
        
        setShowDeleteConfirmation(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setItemId(id);
        setActiveForm(pagination.data[id]?.coding_problems?.length > 0 ? 'coding' : 'logic');
        setShow(true);
    }

    const handleActiveForm = (text) => {
        setActiveForm(text);
    }

    const onSubmit = async (data) => {
        const errors = [];
    
        // Validate required fields
        if (!data.title || data.title.trim() === "") {
            errors.push("Title is required");
        }
        if (!data.description || data.description.trim() === "") {
            errors.push("Description is required");
        }
        if (!data.coding_problems || data.coding_problems.length === 0) {
            errors.push("At least one question is required");
        }
        if (!user.id) {
            errors.push("User ID is required");
        }
        if (!classData.id) {
            errors.push("Course Class ID is required");
        }
    
        // Time limit validation
        // const timeLimitPattern = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        // if (data.timeLimit && !timeLimitPattern.test(data.timeLimit)) {
        //     errors.push("Time limit must be in the format hh:mm:ss");
        // } else if (data.timeLimit === "00:00:00") {
        //     errors.push("Time limit must be at least 1 second (00:00:01 or greater)");
        // }
    
        // Display errors if any
        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            return;
        }
    
        try {

            data.course_class_id = classData.id;
            data.user_id = user.id;

            data.coding_problems = data.coding_problems.map(problem => ({
                title: problem.problem_title,       // Change key to title
                description: problem.problem_description, // Change key to description
                sample_input: problem.sample_input,
                expected_output: problem.expected_output
            }));

            const response = await customFetch(`/activity/${data.id}/update`, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
    
            toast.success("Activity updated successfully");
            setPagination((prevPagination) => {
                const updatedData = [...prevPagination.data];
                updatedData[itemId] = data;
                return { ...prevPagination, data: updatedData };
            });
            handleClose();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            toast.error("Failed to update assessment");
        }
    };

    const [showMod, setShowMod] = useState(false);

    const closeShowMod = () => {
        setShowMod(false);
    }

    return (
        <HomeTemplate>
            <div className={`${styles.container} ${styles.classDashboard}`}>

                <SubmissionDetailModal
                    show={showMod}
                    handleClose={closeShowMod}
                />

                <ConfirmationModal
                    show={showDeleteConfirmation}
                    handleClose={handleCloseDeleteConfirmation}
                    modalData={{
                        title: "Delete Assessment?", 
                        body: "Are you sure you want to delete this assessment?", 
                        action: () => handleDeleteAssessment()
                    }}
                />
                <Offcanvas show={show} backdrop="static" className={styles.offCanvas} onHide={handleClose} placement="top" style={{ width: '80vw', height: '90vh', margin: 'auto'}}>
                    <Offcanvas.Header className={`${styles.Header}`} closeButton>
                        <Offcanvas.Title className={`${styles.Title}`}>Create Assessment</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className={styles.offcanvasBody}>
                    <div className={styles.assessmentOptions}>
                        {activeForm === 'logic' && (
                            <div className={styles.active} onClick={() => handleActiveForm("logic")}>
                                <p>Logic</p>
                            </div>
                        )}
                        {activeForm === 'coding' && (
                            <div className={styles.active} onClick={() => handleActiveForm("coding")}>
                                <p>Coding</p>
                            </div>
                        )}
                    </div>

                        <CreateAssessmentForm 
                            activeForm={activeForm} 
                            handleClose={handleClose} 
                            onSubmit={onSubmit} 
                            editMode={ {active: true, data: pagination?.data[itemId]} }
                        />
                    </Offcanvas.Body>
                </Offcanvas>
                <div className={`${styles.contentContainer}`}>
                    <div className={`${styles.header}`}>
                        <div className={`${styles.create}`}>
                            <div>
                                <ul>
                                    <li onClick={() => navigate('/teacher/classes')}>Classes</li>
                                    <li>/</li>
                                    <li className={`${styles.active}`}>{classData?.name || "Class 404"}</li>
                                </ul>
                            </div>
                            <p onClick={() => setShowMod(true)}>{classData?.name || "Class 404"}</p>
                        </div>
                    </div>
                    <div className={`${styles.content}`}>
                        <div className={`${styles.classInfo}`}>
                            <div className={`${styles.classInfoHeader}`}>
                                <div className={`${styles.headerItem}`}>
                                    <p className={`${styles.icon} ${styles.language}`}><FontAwesomeIcon icon={faPython} /></p>
                                    <div className={`${styles.text}`}>
                                        <p>Subject</p>
                                        <p>Python</p>
                                    </div>
                                </div>
                                <div className={`${styles.headerItem}`}>
                                    <p className={`${styles.icon} ${styles.classIcon}`}><FontAwesomeIcon icon={faChalkboardUser} /></p>
                                    <div className={`${styles.text}`}>
                                        <p>Section</p>
                                        <p>AI41</p>
                                    </div>
                                </div>
                                <div className={`${styles.headerItem}`}>
                                    <p className={`${styles.icon} ${styles.studentCount}`}><FontAwesomeIcon icon={faUsers} /></p>
                                    <div className={`${styles.text}`}>
                                        <p>No. of Students</p>
                                        <p>{'0' + classData?.students_count || 0}</p>
                                    </div>
                                </div>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id={`tooltip-test`}>View Class Information</Tooltip>}
                                >
                                    <p onClick={handleShowAdditionalInfo} className={styles.exclamation}><FontAwesomeIcon icon={faExclamation} /></p>
                                </OverlayTrigger>
                            </div>
                            <div className={styles.additionalInfo} style={{ display: showAdditionalInfo ? 'block' : 'none' }}>
                                <p>Code: <span>{classData?.class_code?.code}</span> <FontAwesomeIcon icon={faCopy} className={styles.copy} onClick={() => copyCode(classData?.class_code.code)} /></p>
                                <p>Room: <span>{classData?.room}</span></p>
                            </div>
                        </div>
                        <div className={`${styles.classAssessments}`}>
                            {
                                
                                pagination && pagination.data.length > 0 && pagination !== null?
                                    (
                                        <><MDBTable striped responsive hover className={styles.table}>
                                            <MDBTableHead>
                                                <tr className='table-secondary'>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>Assessment Name</th>
                                                    <th scope='col'>Total Submission</th>
                                                    <th scope='col'>Deadline</th>
                                                    <th scope='col'>Action</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                {pagination?.data.map((assessment, index) => (
                                                    <tr key={assessment.id}>
                                                        <th scope='row'>{(currentPage - 1) * pagination.per_page + index + 1}</th> {/* Adjust index for pagination */}
                                                        <td>{assessment.title}</td>
                                                        <td style={{textAlign: 'center'}}>{assessment.total_submissions || 0}</td>
                                                        <td>{new Date(assessment.start_date).toLocaleDateString() || 'N/A'}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="link" style={{ color: 'black' }} id={`dropdown-basic-${assessment.id}`}>
                                                                    <FontAwesomeIcon className={styles.viewMore} icon={faEllipsisVertical} />
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item onClick={() => handleShow(assessment.id - 1)}>View Details</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => handleShowDeleteConfirmation(assessment.id)}>Delete</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => navigate(`${assessment.id}/submissions`, { state: { classData: classData, assessmentData: assessment, previousPath: currentPath } })}>
                                                                        Submissions
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </MDBTableBody>
                                        </MDBTable><div className={styles.footer}>
                                                <div className={styles.totalEntry}>
                                                    <p>Showing </p>
                                                    <select name="entry" id="entry" defaultValue={pagination?.per_page || 10}>
                                                        <option value="10">10</option>
                                                        <option value="20">20</option>
                                                        <option value="30">30</option>
                                                    </select>
                                                    <p>of {pagination?.total || 0} entries</p>
                                                </div>
                                                <div className={styles.pagination}>
                                                    {pagination?.links.map((page, index) => (
                                                        (page.label.includes("Next") || page.label.includes("Previous")) ? (
                                                            <button key={index} className={`${page.active ? styles.active : ""}`} onClick={() => handleNextPage(page.label.includes("Next") ? 'Next' : 'Previous')} disabled={page.url === null}>
                                                                {page.label.includes("Next") ? 'Next' : 'Previous'}
                                                            </button>
                                                        ) : (
                                                            <button key={index} className={`${page.active ? styles.active : ''}`} onClick={() => handleJumpToPage(index)} disabled={page.url === null}>
                                                                {page.label}
                                                            </button>
                                                        )
                                                    ))}
                                                </div>
                                            </div></>
                                    )
                                    :
                                    !isLoading ? <p>Loading...</p> : <p>No assessments found</p>
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
}
