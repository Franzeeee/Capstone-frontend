import React, { useEffect, useRef, useState } from 'react'
import HomeTemplate from '../../templates/HomeTemplate'
import customFetch from '../../utils/fetchApi'
import styles from '../../assets/css/pages/logic-assessment-page.module.css'
import { useNavigate } from 'react-router-dom'
import bot from '../../assets/img/assessmentBot.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import {getUserData} from '../../utils/userInformation'
import { toast } from 'react-toastify'

export default function LogicAssessmentPage({ assessmentData, ...props }) {
    const [files, setFiles] = useState([]); // State to store selected files
    const fileInputRef = useRef(null); // Reference to the file input
    const navigate = useNavigate();

    const userData = getUserData();

    const BASE_URL = import.meta.env.VITE_API_URL;


    const [assessmentFile, setAssessmentFile] = useState([]); // State to store assessment file

    const [submitted, setSubmitted] = useState(false);
    const [submittedFiles, setSubmittedFiles] = useState([]);
    const [isUnsubmitted, setIsUnsubmitted] = useState(false);

    useEffect(() => {
        // Fetch assessment data
        customFetch(`/activity/logic/${assessmentData.id}/files`)
            .then(data => {
                setAssessmentFile(data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, [assessmentData]);

    const handleBack = () => {
        const currentPath = location.pathname;
        const newPath = currentPath.substring(0, currentPath.lastIndexOf('/') - 2);
        navigate(newPath);
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files); // Convert FileList to array
        setFiles(prev => {
            const newFiles = [...prev, ...selectedFiles]; // Combine old files with new files
            return newFiles;
        }); // Update state with selected files
    };

    const handleChooseFile = () => {
        fileInputRef.current.click(); // Trigger click on the file input
    };

    const handleRemoveFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index)); // Remove file at the index
    };

    const handleSubmission = () => {
        if(!submitted) {
            const formData = new FormData();

            formData.append('student_id', userData.id);
    
            files.forEach((f, index) => {
                formData.append(`files[${index}]`, f);
            });
    
            if(files.length !== 0) {
                fetch(`${BASE_URL}/activity/logic/${assessmentData.id}/submit`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    toast.success("Submission Successful");
                    setSubmitted(true);
                })
            }
        } else {
            if (isUnsubmitted) {
                setIsUnsubmitted(false);
                alert("You have already unsubmitted this assessment");
            } else {
                alert("Are you sure you want to unsubmit this assessment?");
                setIsUnsubmitted(true);
            }
        }
    }

    // Use effect for checking submission status
    useEffect(() => {
        customFetch(`/activity/logic/${assessmentData.id}/check`)
    .then(data => {
        setSubmitted(data.submitted);
        setSubmittedFiles(data.submission);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
    }, []);

    const deleteSubmittedFile = (fileId) => {
        if(submittedFiles.files.length > 0 && fileId !== null && isUnsubmitted) {
            customFetch(`/activity/logic/${fileId}/delete`, {
                method: 'DELETE',
                credentials: 'include',
            })
            .then(response => response.json())
            .then(data => {
                toast.success("File Deleted Successfully");
                setSubmittedFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
            })
        }else{
            alert("Nice Try");
        }
    }

    return (
        <HomeTemplate>
            <div className={`${styles.container}`}>
                <div className={`${styles.content}`}>
                    <div className={styles.breadcrumbs}>
                        <ul>
                            <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                            <li>/</li>
                            <li onClick={handleBack}>{props.class?.name || "Class Name"}</li>
                            <li>/</li>
                            <li className={`${styles.active}`}>{assessmentData?.title || "Fetching Failed"}</li>
                        </ul>
                    </div>
                    <div className={styles.lessonContent}>
                        <div className={styles.contentContainer}>
                            <p className={styles.title}>{assessmentData?.title || "Fetching Assessment Failed"}</p>
                            <div className={styles.assessmentInfo}>
                                <p>Deadline: <span>{new Date(assessmentData?.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                                <p>Score: <span>{assessmentData?.point}</span></p>
                            </div>
                            <div className={styles.description}>
                                <p>
                                    {assessmentData?.description || "Fetching Description Failed"}
                                </p>
                            </div>
                        </div>
                        <div className={styles.contentContainer}>
                            <p className={styles.assessmentSubHead}>Assessment Submission</p>
                            <div className={styles.submissionBox}>
                                <div className={styles.formAndFiles}>
                                    <div>
                                        <input 
                                            className={styles.file} 
                                            type="file" 
                                            multiple 
                                            ref={fileInputRef} 
                                            onChange={handleFileChange} 
                                            style={{ display: 'none' }} // Hide the input
                                        />
                                        <button type="button" onClick={handleChooseFile}>Choose File</button>
                                        <div className={styles.fileInfo}>
                                            <p>File Support: <span>.pdf, docx, doc, jpg, png, jpg</span></p>
                                            <p>Max File Size: <span>50mb</span></p>
                                        </div>
                                    </div>
                                    <div className={styles.uploadContainer}>
                                        {files && files.map((file, index) => (
                                            <div key={index} className={styles.uploadCard}>
                                                <div className={styles.fileUploadInfo}>
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        overlay={<Tooltip id={`tooltip-test`}>{file.name}</Tooltip>}
                                                    >
                                                        <p>{file.name}</p>
                                                    </OverlayTrigger>
                                                    <p>{(file.file / 1024).toFixed(2)} KB</p> {/* Convert bytes to KB */}
                                                </div>
                                                <FontAwesomeIcon 
                                                    icon={faClose} 
                                                    className={styles.close} 
                                                    onClick={() => handleRemoveFile(index)} 
                                                />
                                            </div>
                                        ))}
                                        { submitted && files.length === 0 && submittedFiles.files.length !== 0 && 
                                            submittedFiles.files.map((file, index) => (
                                                <div key={index} className={styles.uploadCard}>
                                                    <div className={styles.fileUploadInfo}>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip id={`tooltip-test`}>{file.file_name}</Tooltip>}
                                                        >
                                                            <p>{file.file_name}</p>
                                                        </OverlayTrigger>
                                                        <p>{(file.file_size / 1024).toFixed(2)} KB</p> {/* Convert bytes to KB */}
                                                    </div>
                                                    <FontAwesomeIcon 
                                                        icon={faClose} 
                                                        className={styles.close} 
                                                        onClick={() => deleteSubmittedFile(file.id)} 
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={styles.robot}>
                                    <div className={styles.robotContainer}>
                                        <img src={bot} alt="" />
                                        <p>You can upload your files here!</p>
                                    </div>
                                    <button disabled={files.length === 0 && !submitted} onClick={handleSubmission}>{submitted && !isUnsubmitted ? "Unsubmit" : "Submit"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeTemplate>
    )
}
