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


export default function ClassDashboard() {
    const user = getUserData();
    const navigate = useNavigate();
    const location = useLocation();
    const classData = location.state?.data;

    const [isLoading, setIsLoading] = useState(true);

    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);

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

    return (
        <HomeTemplate>
            <div className={`${styles.container} ${styles.classDashboard}`}>
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
                            <p>{classData?.name || "Class 404"}</p>
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
                                        <p>20</p>
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
                                                        <td>{assessment.totalSubmissions || 0}</td>
                                                        <td>{new Date(assessment.start_date).toLocaleDateString() || 'N/A'}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="link" style={{ color: 'black' }} id={`dropdown-basic-${assessment.id}`}>
                                                                    <FontAwesomeIcon className={styles.viewMore} icon={faEllipsisVertical} />
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item>View Details</Dropdown.Item>
                                                                    <Dropdown.Item>Delete</Dropdown.Item>
                                                                    <Dropdown.Item>Submissions</Dropdown.Item>
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
