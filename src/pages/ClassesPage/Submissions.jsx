import React, { useEffect, useState } from 'react';
import HomeTemplate from '../../templates/HomeTemplate';
import styles from '../../assets/css/pages/ClassesPage/class-dashboard.module.css';
import ProfileSide from '../../components/ProfileSide';
import { getUserData } from '../../utils/userInformation';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython } from '@fortawesome/free-brands-svg-icons';
import { faChalkboardUser, faClipboardCheck, faCopy, faEllipsisVertical, faExclamation, faDownload,faSpinner, faMedal, faTrophy, faArrowUpShortWide, faSortUp, faUnsorted, faAward, faA } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import customFetch from '../../utils/fetchApi';
import { Dropdown } from 'react-bootstrap';

import { Offcanvas } from 'react-bootstrap';
import ConfirmationModal from '../../components/ConfirmationModal';
import SubmissionDetailModal from '../../components/SubmissionDetailModal';

export default function Submissions() {
    const navigate = useNavigate();
    const location = useLocation();
    const backUrl = location.pathname.split('/').slice(0, -2).join('/');
    const { classData, assessmentData, previousPath } = location?.state;


    console.log(classData)
    const user = getUserData();
    const [isLoading, setIsLoading] = useState(true);
    const [noData, setNoData] = useState(false);

    const [showSubmissionModal, setShowSubmissionModal] = useState(false);

    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);


    const [itemId, setItemId] = useState(null);
    const [show, setShow] = useState(false);
    const [activeForm, setActiveForm] = useState('logic');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [badge, setBadge] = useState(null);

    // useEffect(() => {

    // }, []);

    useEffect(() => {
        customFetch(`/${assessmentData.id}/badge/fetch`, 'GET')
        .then(data => {
            setBadge(data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }, []);

    useEffect(() => {
        fetchSubmissions(currentPage);
        setIsLoading(false)
    }, [currentPage]);


    const fetchSubmissions = async (page) => {
        try {
            const data = await customFetch(`/${assessmentData.id}/submissions/all?page=${page}`, 'GET');
            setPagination(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
        finally {
            if (pagination === null) {
                setNoData(true);
            }
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

    
    const handleCloseDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
    }

    const handleShowDeleteConfirmation = (id) => {
        setItemId(id);
        setShowDeleteConfirmation(true);
    }

    const handleDeleteSubmission = () => {
        customFetch(`/activity/submission/${itemId}/delete`, { method: 'DELETE' })
            .then(data => {
                toast.success('Assessment deleted successfully');
                setPagination((prevPagination) => ({
                    ...prevPagination,
                    data: prevPagination.data.filter((submission) => submission.id !== itemId),
                }));
            })
            .catch(error => {
                console.error('Error:', error.message);
                toast.error('Failed to delete assessment');
            });
        
        setShowDeleteConfirmation(false);
    }

    const handleShowAdditionalInfo = () => setShowAdditionalInfo(!showAdditionalInfo);

    const handleSubmissionDetailShow = (id) => {
        setShowSubmissionModal(true);
        setItemId(id);
    }
    const handleSubmissionDetailClose = () => setShowSubmissionModal(false);

    const [isExporting, setIsExporting] = useState(false);
    const handleExportGrades = () => {
    }

    const issueBadge = () => {
        customFetch(`/badge/${assessmentData.id}/issue`, { method: 'GET' })
        .then(data => {
            toast.success(data.message);
        })
        .catch(error => {
            console.error('Error:', error.message);
            toast.error('Failed to issue badge');
        });
    }

    return (
        <HomeTemplate>
            <div className={`${styles.container} ${styles.classDashboard}`}>
                <SubmissionDetailModal
                    show={showSubmissionModal}
                    handleClose={handleSubmissionDetailClose}
                    submissionData={pagination?.data[itemId]}
                    updateSubmission={fetchSubmissions}
                />
                <ConfirmationModal
                    show={showDeleteConfirmation}
                    handleClose={handleCloseDeleteConfirmation}
                    modalData={{
                        title: "Delete Submission?", 
                        body: "Are you sure you want to delete this submission?", 
                        action: () => handleDeleteSubmission()
                    }}
                />
                    <div className={`${styles.contentContainer}`}>
                        <div className={`${styles.header}`}>
                            <div className={`${styles.create}`}>
                                <div>
                                    <ul>
                                        <li onClick={() => navigate('/teacher/classes')}>Classes</li>
                                        <li>/</li>
                                        <li onClick={() => navigate(previousPath, { state: {verified: true, data: classData} })}>{classData?.name || "Class 404"}</li>
                                        <li>/</li>
                                        <li className={`${styles.active}`}>Submissions</li>
                                    </ul>
                                </div>
                                <p>{assessmentData?.title|| "Class 404"}</p>
                            </div>
                        </div>
                        <div className={`${styles.content}`}>
                            <div className={`${styles.classInfo}`}>
                                <div className={`${styles.classInfoHeader}`}>
                                    <div className={`${styles.headerItem}`}>
                                        <p className={`${styles.icon} ${styles.language}`}><FontAwesomeIcon icon={faPython} /></p>
                                        <div className={`${styles.text}`}>
                                            <p>Subject</p>
                                            <p>{classData?.subject === 'python' ? "Python" : "Web Dev"}</p>
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
                                        <p className={`${styles.icon} ${styles.studentCount}`}><FontAwesomeIcon icon={faClipboardCheck} /></p>
                                        <div className={`${styles.text}`}>
                                            <p>Submission</p>
                                            <p>{pagination?.data.length || 0}</p>
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
                                    <p>Code: <span>{classData?.class_code?.code}</span> <FontAwesomeIcon icon={faCopy} className={styles.copy} onClick={() => copyCode(assessmentData?.class_code.code)} /></p>
                                    <p>Room: <span>{classData?.room}</span></p>
                                </div>
                            </div>
                            <div className={`${styles.classAssessments}`}>
                            <div className={styles.gradeControls}>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id={`tooltip-test`}>Issue Badge</Tooltip>}
                                >
                                    <p className={styles.gradeDistribution} onClick={issueBadge}><FontAwesomeIcon icon={faAward} spin={isExporting} /></p>
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
                                                        <th scope='col'>Points <FontAwesomeIcon className={`${styles.sortIcon}`} icon={faUnsorted} /></th>
                                                        <th scope='col'>Date Submitted</th>
                                                        <th scope='col'>Action</th>
                                                    </tr>
                                                </MDBTableHead>
                                                <MDBTableBody>
                                                    {pagination?.data.map((submission, index) => (
                                                        <tr key={submission.id}>
                                                            <th scope='row'>{(currentPage - 1) * pagination.per_page + index + 1}</th> {/* Adjust index for pagination */}
                                                            <td>
                                                                {submission.name} {badge && badge.length > 0 && badge.map((b, i) => (
                                                                    b.student_id === submission.student_id && 
                                                                    <OverlayTrigger
                                                                        key={i}
                                                                        placement="top"
                                                                        overlay={<Tooltip id={`tooltip-${i}`}>{b.description}</Tooltip>}
                                                                    >
                                                                        <FontAwesomeIcon index={i} icon={faAward} className={`${styles.badge} ${b?.badge_type === "Gold" ? styles.first : b?.badge_type === "Silver" ? styles.second : styles.third}`}/>
                                                                    </OverlayTrigger>
                                                                ))}
                                                            </td>
                                                            <td>{submission?.score}</td>
                                                            <td>{new Date(submission.created_at).toLocaleDateString() || 'N/A'}</td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <Dropdown>
                                                                    <Dropdown.Toggle variant="link" style={{ color: 'black' }} id={`dropdown-basic-${submission.id}`}>
                                                                        <FontAwesomeIcon className={styles.viewMore} icon={faEllipsisVertical} />
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item onClick={() => handleSubmissionDetailShow(index)}>View Details</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => handleShowDeleteConfirmation(submission.id)}>Delete</Dropdown.Item>
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
                                        isLoading ? <p>Loading...</p> : noData ? <p>No submissions found</p> : <p>Loading...</p>
                                }
                                
                            </div>

                        </div>
                    </div>
                    <div className={`${styles.profileContainer}`}>
                        <ProfileSide info={user} />
                    </div>
                </div>
        </HomeTemplate>
    )
}
