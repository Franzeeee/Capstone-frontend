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
import DocViewer from 'react-doc-viewer'
import { Modal, ModalBody } from 'react-bootstrap'
import test from '../../assets/img/Swap1.png'
import { DocViewerRenderers } from 'react-doc-viewer'

export default function LogicAssessmentPage({ assessmentData, ...props }) {
    const [files, setFiles] = useState([]); // State to store selected files
    const fileInputRef = useRef(null); // Reference to the file input
    const navigate = useNavigate();

    const userData = getUserData();

    const BASE_URL = import.meta.env.VITE_API_URL;


    const [assessmentFile, setAssessmentFile] = useState([]); // State to store assessment file

    const [submitted, setSubmitted] = useState(false);
    const [submittedFiles, setSubmittedFiles] = useState(null);
    const [isUnsubmitted, setIsUnsubmitted] = useState(false);
    const [docFiles, setDocFiles] = useState([]);

    // For File Preview
    const [showFilePreview, setShowFilePreview] = useState(false);

    const handleFilePreview = () => {
        setShowFilePreview(true);
    }

    const handleCloseFilePreview = () => {
        setShowFilePreview(false);
    }
    // End for File Preview

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
        console.log("files", files);
        setDocFiles(prev => {
            const newFiles = [...prev, ...selectedFiles.map(file => {
                return {
                    uri: URL.createObjectURL(file),
                    fileType: file.type,
                    fileName: file.name
                }
            })]; // Combine old files with new files
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
                const formData = new FormData();

                formData.append('student_id', userData.id);
        
                files.forEach((f, index) => {
                    formData.append(`files[${index}]`, f);
                });
        
                if(files.length !== 0) {
                    fetch(`${BASE_URL}/activity/logic/${submittedFiles.id}/resubmit`, {
                        method: 'POST',
                        credentials: 'include',
                        body: formData,
                    })
                    .then(response => response.json())
                    .then(data => {
                        toast.success("Submission Successful");
                        setSubmitted(true);
                        setIsUnsubmitted(false);
                    })
                }
            } else {
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

    useEffect(() => {
        if( submittedFiles && submittedFiles !== null && submittedFiles.files.length > 0) {
            setDocFiles(submittedFiles.files.map(file => {
                return {
                    uri: file.file_path,
                    fileType: file.file_type,
                    fileName: file.file_name
                }
            }));
        }
    }, [submittedFiles]);

    const deleteSubmittedFile = (fileId) => {
        if(submittedFiles.files.length > 0 && fileId !== null && isUnsubmitted) {
            customFetch(`/activity/logic/${fileId}/delete`, {
                method: 'DELETE',
                credentials: 'include',
            })
            .then(() => {
                toast.success("File Deleted Successfully");
                setSubmittedFiles(prev => ({
                    ...prev,
                    files: prev.files.filter(file => file.id !== fileId)
                }));
            })
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
                                <p>Activity Points: <span>{assessmentData?.point}</span></p>
                                <p>Score: ---</p>
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
                                            disabled={submitted && !isUnsubmitted}
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
                                                <div className={styles.fileUploadInfo} onClick={handleFilePreview}>
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        overlay={<Tooltip id={`tooltip-test`}>{file.name}</Tooltip>}
                                                    >
                                                        <p>{file.name}</p>
                                                    </OverlayTrigger>
                                                    <p>{(file.size / 1024).toFixed(2)} KB</p> {/* Convert bytes to KB */}
                                                </div>
                                                <FontAwesomeIcon 
                                                    icon={faClose} 
                                                    className={styles.close} 
                                                    onClick={() => handleRemoveFile(index)} 
                                                />
                                            </div>
                                        ))}
                                        { submitted && files.length === 0 && submittedFiles?.files.length !== 0 && 
                                            submittedFiles?.files.map((file, index) => (
                                                <div key={index} className={styles.uploadCard}>
                                                    <div className={styles.fileUploadInfo} onClick={handleFilePreview}>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip id={`tooltip-test`}>{file?.file_name}</Tooltip>}
                                                        >
                                                            <p>{file?.file_name}</p>
                                                        </OverlayTrigger>
                                                        <p>{(file?.file_size / 1024).toFixed(2)} KB</p> {/* Convert bytes to KB */}
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
                <Modal style={{background: 'transparent !important'}} show={showFilePreview} size='lg' onHide={handleCloseFilePreview}>
                    <ModalBody className={styles.modalBody}>
                        <DocViewer 
                            documents={docFiles}
                            config={{
                                header: {
                                    disableFileName: true,
                                }
                            }}
                            pluginRenderers={DocViewerRenderers} 
                            preFetchMethod="GET"
                            style={{width: '100%', height: '100%'}}
                        />
                    </ModalBody>
                </Modal>
            </div>
        </HomeTemplate>
    )
}
