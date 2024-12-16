import React, { useEffect, useState } from 'react';
import HomeTemplate from '../templates/HomeTemplate';
import styles from '../assets/css/pages/ClassesPage/class-dashboard.module.css';
import ProfileSide from '../components/ProfileSide';
import { getUserData } from '../utils/userInformation';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython } from '@fortawesome/free-brands-svg-icons';
import { faChalkboardUser, faChartBar, faCopy, faDownload, faEllipsisVertical, faExclamation, faScaleBalanced, faSpinner, faUserGraduate, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import customFetch from '../utils/fetchApi';
import { Dropdown } from 'react-bootstrap';
import ConfirmationModal from '../components/ConfirmationModal';
import { Offcanvas } from 'react-bootstrap';
import CreateAssessmentForm from '../components/AssessmentForm/CreateAssessmentForm';
import SubmissionDetailModal from '../components/SubmissionDetailModal';
import { Form, FormGroup, Button } from 'react-bootstrap';
import { Tab, Tabs } from 'react-bootstrap';
import profile from '../assets/img/1x1Robot2.png';
import IssueCertificateModal from '../components/Modals/IssueCertificateModal';
import * as XLSX from 'xlsx';
import RemarksModal from '../components/Modals/RemarksModal';



export default function ClassGradeTable() {
    const user = getUserData();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = window.location.pathname;
    const classData = location.state?.data;
    const [gradeDistribution, setGradeDistribution] = useState(JSON.parse(classData?.grade_distribution));
    const [assessmentPercent, setAssessmentPercent] = useState(gradeDistribution?.assessment * 100);
    const [finalAssessmentPercent, setFinalAssessmentPercent] = useState(gradeDistribution?.final_assessment * 100);

    const [isLoading, setIsLoading] = useState(true);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [studentId, setStudentId] = useState(null);

    // Variables for modals
    const [showDistributionMod, setShowDistributionMod] = useState(false);
    const [showStudentGrade, setShowStudentGrade] = useState(false);
    const [studentSubmission, setStudentSubmission] = useState(null);

    const [studentInfo, setStudentInfo] = useState(null);
    const [studentScores, setStudentScores] = useState(null);
    const [assessmentTotal, setAssessmentTotal] = useState(0);
    const [finalAssessmentTotal, setFinalAssessmentTotal] = useState(0);
    const [allPoints, setAllPoints] = useState({
        assessment: 0,
        finalAssessment: 0
    });
    const [finalGrade, setFinalGrade] = useState(0);
    const [gradeId, setGradeId] = useState(null);

    const [showCertificateModal, setShowCertificateModal] = useState(false);


    const captureOtherPage = async () => {
        // Navigate to the other page
        navigate("/certificate", { state: { captureMode: true } });
    };


    // handlers for modals
    const handleOpenDistributionMod = () => {
        setShowDistributionMod(true);
    }
    const handleCloseDistributionMod = () => {
        setShowDistributionMod(false);
    }

    const [itemId, setItemId] = useState(null);
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
            const data = await customFetch(`/grades/${classData.id}/fetch?page=${page}`, 'GET');
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

    const [certificateStatus, setCertificateStatus] = useState(null);
    const [certificateData, setCertificateData] = useState(null);
    useEffect(() => {
        customFetch(`/class/certificate/status/${classData.id}`, {
            method: 'GET'
        })
        .then(data => {
            setCertificateStatus(data.status);
            if(data.status) {
                setCertificateData(data.data);
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }, [])

    const [remainingPercentage, setRemainingPercentage] = useState(100 - assessmentPercent - finalAssessmentPercent);

    const handleAssessmentPercent = (e) => {
        setAssessmentPercent(e.target.value);
    }

    const handleFinalAssessmentPercent = (e) => {
        setFinalAssessmentPercent(e.target.value);
    }

    useEffect(() => {
        setRemainingPercentage(100 - assessmentPercent - finalAssessmentPercent);
    }, [assessmentPercent, finalAssessmentPercent]);

    const handleUpdateGradeDistribution = () => {
        const formData = new FormData();
        formData.append('class_id', classData.id);
        formData.append('assessment', assessmentPercent / 100);
        formData.append('final_assessment', finalAssessmentPercent / 100);
        customFetch(`/class/update-grade-distribution`, {
            method: 'POST',
            contentType: 'application/json',
            body: formData
        })
        .then(data => {
            toast.success('Grade distribution updated successfully');
            setGradeDistribution({
                assessment: assessmentPercent / 100,
                final_assessment: finalAssessmentPercent / 100
            });
            handleCloseDistributionMod();
        })
        .catch(error => {
            console.error('Error:', error.message);
            toast.error('Failed to update grade distribution');
        })
    }

    const closeShowStudentGrade = () => {
        setShowStudentGrade(false);
    }

    const [isFetching, setIsFetching] = useState(false);

    const openShowStudentGrade = (id, gradeId) => {
        setGradeId(gradeId);
        setShowStudentGrade(true);
        setIsFetching(true);
        customFetch(`/grades/${classData.id}/student/${id}/scores`,{
            method: 'GET'
        })
        .then(data => { 
            setStudentSubmission(data); 
            setStudentInfo({
                name: data[0]?.student_name,
                email: data[0]?.student_email
            })
            setStudentScores(data);
            const filteredData = data.filter(score => score.final_assessment === 0);

            setAssessmentTotal(filteredData.reduce((acc, score) => acc + score?.submission_score, 0));
            
            const finalAssessmentData = data.filter(score => score.final_assessment === 1);
            setFinalAssessmentTotal(finalAssessmentData.reduce((acc, score) => acc + score?.submission_score, 0));

            setAllPoints({
                assessment: filteredData.reduce((acc, score) => acc + score?.activity_points, 0),
                finalAssessment: finalAssessmentData.reduce((acc, score) => acc + score?.activity_points, 0),
            });
            
        })
        .catch(error => {
            console.error('Error:', error.message);
        })
        .finally(() => {
            setIsFetching(false);
        });
    }

    useEffect(() => {
        setIsFetching(false);
        
        // Calculate percentages based on allPoints
        const assessmentPercentage = allPoints.assessment !== 0
            ? (assessmentTotal / allPoints.assessment) * 100
            : 0;
        
        const finalAssessmentPercentage = allPoints.finalAssessment
            ? (finalAssessmentTotal / allPoints.finalAssessment) * 100
            : 0;
    
        // If there is no final assessment, apply 100% of the grade to the assessment
        const calculatedFinalGrade = finalAssessmentTotal === 0
            ? (assessmentPercentage * (100 / 100)) // 100% for assessment
            : (assessmentPercentage * (assessmentPercent / 100)) + 
              (finalAssessmentPercentage * (finalAssessmentPercent / 100));
    
        setFinalGrade(Math.round(calculatedFinalGrade * 100) / 100);
    }, [assessmentTotal, finalAssessmentTotal, allPoints, assessmentPercent, finalAssessmentPercent]);
    

    const [key, setKey] = useState('Assessments Scores');

    const updateAssessmentPoints = (e) => {
        const value = e.target.value;
        setAssessmentTotal(value);
    }

    const updateFinalAssessmentPoints = (e) => {
        const value = e.target.value;
        setFinalAssessmentTotal(value);
    }

    const updateFinalGrade = (e) => {
        const value = e.target.value;
        setFinalGrade(value);
    }

    const [showRemarksModal, setShowRemarksModal] = useState(false);
    const [remarks, setRemarks] = useState('');

    const submitGrade = () => {
        toast.loading('Grade submission in progress...');
        const gradeData = new FormData(); 
        gradeData.append('final_grade', parseInt(finalGrade));
        gradeData.append('remarks', remarks);

        customFetch(`/grades/${gradeId}/update`, {
            method: 'POST',
            contentType: 'application/json',
            body: gradeData
        })
        .then(data => {
            toast.dismiss();
            toast.success('Grade updated successfully');
            pagination.data.forEach((grade) => {
                if(grade.id === gradeId) {
                    grade.final_grade = finalGrade;
                    grade.remarks = data.remarks;
                }
            });
            closeShowStudentGrade();
        })
        .catch(error => {
            toast.dismiss();
            toast.error('Failed to update grade');
        });
        
    }

    const [isExporting, setIsExporting] = useState(false);
    const [allData, setAllData] = useState([]);

    const handleExportGrades = () => {
        console.log(classData.name)
        setIsExporting(true);
        toast.loading('Exporting Grades...');
        customFetch(`/grades/${classData.id}/print`, {
            method: 'GET',
        })
        .then(data => {
            toast.dismiss();
            toast.success('Grades exported successfully');
            setAllData(data)
            const newData = data.map((grade) => {
                return {
                    'Student Name': grade.student.name,
                    'Final Grade': grade.final_grade,
                    'Remarks': grade.remarks
                }
            });
            const worksheet = XLSX.utils.json_to_sheet(newData)
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades');
            const rawName = classData.name + ' ' + classData.section;
            const fileName = rawName.replace(/ /g, "_");
    
            XLSX.writeFile(workbook, 'grades_' + fileName + '.xlsx');
        })
        .catch(error => {
            toast.dismiss();
            toast.error("Error Exporting Grades")
        })
        .finally(() => {
            setIsExporting(false);
        });
    }

    return (
        <HomeTemplate>
            <div className={`${styles.container} ${styles.classDashboard}`}>
                <ConfirmationModal
                    show={showDeleteConfirmation}
                    handleClose={handleCloseDeleteConfirmation}
                    modalData={{
                        title: "Delete Assessment?", 
                        body: "Are you sure you want to delete this assessment?", 
                        action: () => handleDeleteAssessment()
                    }}
                />
                <Modal show={showDistributionMod}>
                    <Modal.Header closeButton onClick={handleCloseDistributionMod}>
                        <Modal.Title>Grade Calculation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Assessment (%)</Form.Label>
                                <Form.Control type="number" placeholder="Assessment" defaultValue={assessmentPercent} onChange={handleAssessmentPercent} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Final Assessment (%)</Form.Label>
                                <Form.Control type="number" placeholder="Final Assessment" defaultValue={finalAssessmentPercent} onChange={handleFinalAssessmentPercent} />
                            </Form.Group>
                            <Form.Label>Remaining: {remainingPercentage}%</Form.Label>
                        </Form>
                        <Button enable={assessmentPercent} onClick={handleUpdateGradeDistribution} style={{float: 'right', background: '#6c4cd2'}}>Save</Button>
                    </Modal.Body>
                </Modal>
                <Modal size='lg' static show={showStudentGrade}>
                    <Modal.Header closeButton onClick={closeShowStudentGrade}>
                        <Modal.Title>Upload Final Grade</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="Assessments Scores" title="Final Grade">
                            <div className={styles.studentProfile}>
                                <div className={styles.profilePic}>
                                    <img src={profile} alt="" />
                                </div>
                                <div className={styles.userInfo}>
                                    <p>{studentInfo && studentInfo?.name || "Loading Student Name..."}</p>
                                    <p>{studentInfo && studentInfo?.email || "Loading Email..."}</p>
                                </div>
                                <div className={styles.formContainer}>
                                    <form action="">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="assessmentPoints">Assessment</label>
                                            <div>
                                                <input type="text" name='assessment_points' disabled value={!isFetching ? assessmentTotal : "--"} onChange={updateAssessmentPoints} />
                                                <p>/ {allPoints?.assessment}</p>
                                            </div>
                                        </div>
                                        <div className={`${styles.formGroup} ${styles.finalAssessment}`}>
                                            <label htmlFor="assessmentPoints">Final Assessment</label>
                                            <div>
                                                <input type="text" name='final_assessment_points'  disabled value={!isFetching ? finalAssessmentTotal : "--"} onChange={updateFinalAssessmentPoints} />
                                                <p>/ {allPoints?.finalAssessment}</p>
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="assessmentPoints" className={styles.finalLabel}>Final Grade</label>
                                            <div>
                                                <input type="text" value={!isFetching ? finalGrade : 0} onChange={updateFinalGrade} />
                                                <p>%</p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className={styles.header}>
                                <div>
                                    <p>Assessment Title</p>
                                </div>
                                <div>
                                    <p>Due Date</p>
                                </div>
                                <div>
                                    <p>Final Score</p>
                                </div>
                            </div>
                            <div className={styles.userScoresContainer}>
                                { studentScores !== null && studentScores.length > 0 && studentScores.map((score, index) => (
                                    <div key={index} className={`${styles.assessmentCard} ${score?.final_assessment === 1 ? styles.borderLeftAssign : ""}`}>
                                        <div>
                                            <p>{score?.activity_title || "Assessment Title"}</p>
                                        </div>
                                        <div>
                                            <p>{score?.end_date === null ? "No Due Date" : formatDate(score?.end_date)}</p>
                                        </div>
                                        <div>
                                            <p><span style={{fontWeight: '600', color: 'black'}}>{score?.submission_score}</span> / 100</p>
                                        </div>
                                    </div>    
                                ))}
                            </div>
                            <button onClick={submitGrade} className={`mt-3 float-end ${styles.saveGrade}`}>Save</button>
                            <button className={`mt-3 float-end ${styles.saveGrade}`} onClick={() => setShowRemarksModal(true)}>Remarks</button>
                        </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
                <div className={`${styles.contentContainer}`}>
                    <div className={`${styles.header}`}>
                        <div className={`${styles.create}`}>
                            <div>
                                <ul>
                                    <li onClick={() => navigate('/teacher/grades/class')}>Classes</li>
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

                            </div>
                        </div>
                        <div className={`${styles.classAssessments}`}>
                            <div className={styles.gradeControls}>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id={`tooltip-test`}>Export Grade to Excel</Tooltip>}
                                >
                                    <p className={styles.gradeDistribution} onClick={isExporting ? null : handleExportGrades }><FontAwesomeIcon icon={isExporting ? faSpinner : faDownload} spin={isExporting} /></p>
                                </OverlayTrigger>
                                <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id={`tooltip-test`}>View Grade Calculation</Tooltip>}
                                    >
                                <p className={styles.gradeDistribution} onClick={handleOpenDistributionMod}><FontAwesomeIcon icon={faScaleBalanced} /></p>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id={`tooltip-test`}>Issue Completion Certificates</Tooltip>}
                                >
                                    <p onClick={() => setShowCertificateModal(true)} className={styles.gradeDistribution}><FontAwesomeIcon icon={faUserGraduate} /></p>
                                </OverlayTrigger>
                            </div>
                            {
                                
                                pagination && pagination.data.length > 0 && pagination !== null?
                                    (
                                        <><MDBTable striped responsive hover className={styles.table}>
                                            <MDBTableHead>
                                                <tr className='table-secondary'>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>Student Name</th>
                                                    <th scope='col'>Final Grade</th>
                                                    <th scope='col'>Remarks</th>
                                                    <th scope='col'>Action</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                {pagination?.data.map((grade, index) => (
                                                    <tr key={grade.id}>
                                                        <th scope='row'>{(currentPage - 1) * pagination.per_page + index + 1}</th> {/* Adjust index for pagination */}
                                                        <td>{grade.student.name}</td>
                                                        <td style={{textAlign: 'center'}}>{grade?.final_grade} %</td>
                                                        <td>{grade?.remarks}</td>
                                                        <td style={{ textAlign: 'center' }} onClick={() => openShowStudentGrade(grade?.student?.id, grade?.id)}>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip id={`tooltip-test`}>Final Grade</Tooltip>}
                                                        >
                                                            <p className={styles.finalGradeBtn}><FontAwesomeIcon fade icon={faChartBar} /></p>
                                                        </OverlayTrigger>
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
                                    isLoading ? <p className='text-center'>Loading...</p> : <p className='text-center'>No students enrolled</p>
                            }
                        </div>
                    </div>
                </div>
                <div className={`${styles.profileContainer}`}>
                    <ProfileSide info={user} />
                </div>
                <IssueCertificateModal
                    show={showCertificateModal}
                    handleClose={() => setShowCertificateModal(false)}
                    classId={classData.id}
                    nameClass={classData.name}
                    certStatus={certificateStatus}
                    data={certificateData}
                    handleCreate={(data) => setCertificateData(data)}
                />
                <RemarksModal
                    show={showRemarksModal}
                    handleClose={() => setShowRemarksModal(false)}
                    remarks={remarks}
                    handleRemarks={(text) => setRemarks(text)}
                />
            </div>
        </HomeTemplate>
    );
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short', // Abbreviated month, e.g., "Jul"
        day: 'numeric', // Numeric day, e.g., "2"
        year: 'numeric' // Full year, e.g., "2003"
    });
}