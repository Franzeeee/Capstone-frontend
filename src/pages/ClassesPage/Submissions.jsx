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

export default function Submissions() {
    const navigate = useNavigate();
    const location = useLocation();
    const backUrl = location.pathname.split('/').slice(0, -2).join('/');
    const { classData, assessmentData, previousPath } = location?.state;
    const user = getUserData();

    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

    const handleShowAdditionalInfo = () => setShowAdditionalInfo(!showAdditionalInfo);

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
                                        <li onClick={() => navigate(previousPath, { state: {verified: true, data: classData} })}>{assessmentData?.name || "Class 404"}</li>
                                        <li>/</li>
                                        <li className={`${styles.active}`}>Submissions</li>
                                    </ul>
                                </div>
                                <p>{assessmentData?.name|| "Class 404"}</p>
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
                                    <p>Code: <span>{classData?.class_code?.code}</span> <FontAwesomeIcon icon={faCopy} className={styles.copy} onClick={() => copyCode(assessmentData?.class_code.code)} /></p>
                                    <p>Room: <span>{classData?.room}</span></p>
                                </div>
                            </div>
                            <div className={`${styles.classAssessments}`}>

                                        <MDBTable striped responsive hover className={styles.table}>
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
                                                {/* Dummy assessment data */}
                                                <tr key={1}>
                                                    <th scope='row'>1</th>
                                                    <td>Dummy Assessment</td>
                                                    <td>0</td>
                                                    <td>{new Date().toLocaleDateString()}</td> {/* Current date as dummy deadline */}
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="link" style={{ color: 'black' }} id={`dropdown-basic-1`}>
                                                                <FontAwesomeIcon className={styles.viewMore} icon={faEllipsisVertical} />
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item >View Details</Dropdown.Item>
                                                                <Dropdown.Item >Delete</Dropdown.Item>
                                                                <Dropdown.Item >
                                                                    Submissions
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            </MDBTableBody>
                                        </MDBTable>
                                        <div className={styles.footer}>
                                            {/* <div className={styles.totalEntry}>
                                                <p>Showing </p>
                                                <select name="entry" id="entry" defaultValue={pagination?.per_page || 10}>
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                </select>
                                                <p>of {pagination?.total || 0} entries</p>
                                            </div> */}
                                            {/* <div className={styles.pagination}>
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
                                            </div> */}
                                        </div>
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
