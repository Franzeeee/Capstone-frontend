import React, {useEffect, useState} from 'react'
import HomeTemplate from '../templates/HomeTemplate'
import styles from '../assets/css/pages/profile.module.css'
import CryptoJS from 'crypto-js'
import profile from '../assets/img/user.png'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft, faSpinner } from '@fortawesome/free-solid-svg-icons'
import customFetch from '../utils/fetchApi.js'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Badge } from 'primereact/badge'
import { Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import LogoutConfirmationModal from '../components/LogoutConfirmationModal.jsx'

export default function Profile() {

    const navigate = useNavigate();

    const userData = localStorage.getItem('userData');
    const user = JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8));
    const profilePicture = localStorage.getItem('profilePicture') || profile;

    const [updating, setUpdating] = useState(false);
    const [updatingBasicInfo, setUpdatingBasicInfo] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState([]);

    const handleClose = () => setShowModal(false);

    const [updatedInfo, setUpdatedInfo] = useState(false);
    const [updatedContact, setUpdatedContact] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false);
    const [updatedPhoto, setUpdatedPhoto] = useState(false);

    const [basicInformation, setBasicInformation] = useState({
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        suffix: user.suffix || "", 
        birthday: user.birthdate || "",
        gender: user.gender || "",
        name: user.name,
    });
    const [contactInformation, setContactInformation] = useState({
        email: user.email,
        phone: user.phone
    });

    useEffect(() => {
        setBasicInformation((prevInfo) => {
            const updatedInfo = {
                ...prevInfo,
                name: `${prevInfo.first_name} ${prevInfo.middle_name} ${prevInfo.last_name}`.trim()
            };

            return updatedInfo;
        });
    }, [basicInformation.first_name, basicInformation.middle_name, basicInformation.last_name]);

    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    
    const [photo, setPhoto] = useState(profilePicture || null);
    const [profilePictureFile, setProfilePictureFile] = useState(null);

    const handleTextInput = (e) => {
        const { name, value } = e.target; // Destructure name and value from event target
    
        // Update basicInformation based on input change
        setBasicInformation((prevInfo) => {
            const updatedInfo = {
                ...prevInfo,
                [name]: value, // Update the specific field
            };
    
            // Update the name property based on the updated values
            updatedInfo.name = `${updatedInfo.first_name} ${updatedInfo.middle_name} ${updatedInfo.last_name}`.trim(); // Use .trim() to avoid extra spaces
    
            return updatedInfo; // Return the updated object
        });
    
        setUpdatedInfo(true);
    }
    

    const handleContactInput = (e) => {
        setContactInformation({
            ...contactInformation,
            [e.target.name]: e.target.value
        });
        setUpdatedContact(true);
    }

    const handlePasswordInput = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        if(password.current !== '' && password.new !== '' && password.confirm !== '' && password.new === password.confirm) {
            setUpdatedPassword(true);
        } else {
            setUpdatedPassword(false); 
        }
    }, [password]);

    const handlePhotoInput = (e) => {
        const file = e.target.files[0]; // Get the file from the input
        setProfilePictureFile(file); // Set the file to state
        setPhoto(URL.createObjectURL(file)); // Set the image preview
        setUpdatedPhoto(true);
    }

    const undo = (formName) => {
        if(formName === 'info') {
            setBasicInformation({
                first_name: user.name,
                middle_name: user.name,
                last_name: user.name,
                suffix: user.suffix || "",
                gender: user.gender || "",
                birthday: "",
                name: `${user.name.first} ${user.name.middle} ${user.name.last}`,
            });
            setUpdatedInfo(false);
        } else if(formName === 'contact') {
            setContactInformation({
                email: user.email,
                phone: user.phone
            });
            setUpdatedContact(false);
        } else if(formName === 'photo') {
            setUpdatedPhoto(false);
        }
    }

    const handleUpdateInfo = () => {
        if(updatedInfo) {
            setUpdatingBasicInfo(true);
            customFetch('/update/basic-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: basicInformation.name,
                    first_name: basicInformation.first_name,
                    middle_name: basicInformation.middle_name,
                    last_name: basicInformation.last_name,
                    suffix: basicInformation.suffix,
                    birthdate: basicInformation.birthday,
                    gender: basicInformation.gender
                })
            })
                .then(response => {
                    toast.success(response.message);
                    setUpdatedInfo(false);
                    const newUserData = {
                        ...user,
                        name: basicInformation.name,
                        first_name: basicInformation.first_name,
                        middle_name: basicInformation.middle_name,
                        last_name: basicInformation.last_name,
                        suffix: basicInformation.suffix,
                        gender: basicInformation.gender,
                        birthdate: basicInformation.birthday
                    };
                    localStorage.setItem('userData', CryptoJS.AES.encrypt(JSON.stringify(newUserData), 'capstone'));
                })
                .catch(error => {
                    console.error('Error:', error.message);
                })
                .finally(() => {
                    setUpdatingBasicInfo(false);
                });
        }
    }

    const handleUpdateContact = () => {
        if(updatedContact) {
            customFetch('/update/contact-info', {
                method: 'POST',
                body: JSON.stringify(contactInformation)
            })
                .then(response => {
                    toast.success(response.message);
                    setUpdatedContact(false);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });
        }
    }

    const handleUpdatePassword = () => {
        if(updatedPassword) {
            setUpdating(true);
            customFetch('/update/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    current_password: password.current,
                    new_password: password.new,
                })
            })
                .then(response => {
                    toast.success(response.message);
                    setUpdatedPassword(false);
                    setPassword({
                        current: '',
                        new: '',
                        confirm: ''
                    });
                })
                .catch(error => {
                    toast.error(error.message);
                })
                .finally(() => {
                    setUpdating(false);
                });
        }
    }

    const handleUpdatePhoto = () => {
        if (updatedPhoto && photo) {
            const formData = new FormData();
            formData.append('profile_picture', profilePictureFile); // Add the file to FormData
    
            customFetch('/upload/profile-picture', {
                method: 'POST',
                body: formData, // Use FormData instead of JSON
                headers: {
                    'Accept': 'application/json', // Set headers if necessary
                },
            })
                .then(response => {
                    toast.success("Profile picture updated successfully");
                    setUpdatedPhoto(false);
                    localStorage.setItem('profilePicture', photo);
                })
                .catch(error => {
                    toast.error("Failed to update profile picture");
                });
        }
    };



    return (
        <HomeTemplate>
            <div className={`${styles.container}`}>
                <div className={`${styles.contentContainer}`}>
                    <div className={`${styles.header}`}>
                        <div className={`${styles.create}`}>
                            <div>
                                <ul>
                                    <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                                    <li>/</li>
                                    <li className={`${styles.active}`}>Profile</li>
                                </ul>
                            </div>
                            <p>Profile</p>
                        </div>
                        <p className={styles.headerSubTxt}>User Information</p>
                        <p className={styles.headerTxt}>
                        Welcome to your profile page! Here, you can view and update your personal information to keep your profile accurate and up-to-date. 
                        Please ensure all details are correct to enhance your experience on our platform.
                        </p>
                    </div>
                    <div className={styles.formContainer}>
                        <form action="">
                            <p className={styles.formTitle}>Basic Information</p>
                            <div className={styles.formGroupContainer}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="first_name">First Name</label>
                                    <input type="text" name='first_name' value={basicInformation.first_name} onChange={handleTextInput}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="middle_name">Middle Name</label>
                                    <input type="text" name='middle_name' value={basicInformation.middle_name} onChange={handleTextInput}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="last_name">Last Name</label>
                                    <input type="text" name='last_name' value={basicInformation.last_name} onChange={handleTextInput} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="suffix">Suffix</label>
                                    <input type="text" name='suffix' value={basicInformation.suffix} onChange={handleTextInput} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="birthday">Birthday</label>
                                    <input type="date" name='birthday' value={basicInformation.birthday} onChange={handleTextInput}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="gender">Gender</label>
                                    <input type="text" name='gender' value={basicInformation.gender} onChange={handleTextInput}/>
                                </div>
                            </div>
                            <button onClick={updatedInfo && !updatingBasicInfo ? handleUpdateInfo : null} title='Save Updates' type='button' className={`${styles.formSubmit} ${updatedInfo ? "" : styles.disabled}`}>Save Information {updatingBasicInfo && <FontAwesomeIcon spin icon={faSpinner} />}</button>
                            <button title='Undo Changes' type='button' onClick={() => undo("info")} disabled={updatingBasicInfo} className={`${styles.undo} ${updatedInfo ? "" : styles.disabled}`}><FontAwesomeIcon icon={faRotateLeft} /></button>
                        </form>
                        <form action="">
                            <p className={styles.formTitle}>Contact Information</p>
                            <div className={`${styles.formGroupContainer}`} style={{gridTemplateColumns: '1fr'}}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name='email' value={contactInformation.email} onChange={handleContactInput}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Contact Number</label>
                                    <input type="text" name='phone' value={contactInformation.phone} onChange={handleContactInput}/>
                                </div>
                            </div>
                            <button onClick={handleUpdateContact} type='button' className={`${styles.formSubmit} ${ updatedContact ? "" : styles.disabled}`}>Save Contact</button>
                            <button title='Undo Changes' type='button' onClick={() => undo("contact")} className={`${styles.undo} ${updatedContact ? "" : styles.disabled}`}><FontAwesomeIcon icon={faRotateLeft} /></button>
                        </form>
                        <form>
                            <p className={styles.formTitle}>Security</p>
                            <div className={`${styles.formGroupContainer}`} style={{gridTemplateColumns: '1fr'}}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="current_password">Current Password</label>
                                    <input type="password" name='current' onChange={handlePasswordInput} value={password.current}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="new">New Password</label>
                                    <input type="password" name='new' value={password.new} onChange={handlePasswordInput}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="confirm">Confirm Password</label>
                                    <input type="password" name='confirm' value={password.confirm} onChange={handlePasswordInput}/>
                                </div>
                            </div>
                            <button type='button' onClick={updating ? null : handleUpdatePassword} className={`${styles.formSubmit} ${updatedPassword ? "" : styles.disabled}`}>Update Password { updating && <FontAwesomeIcon spin icon={faSpinner} />}</button>
                        </form>
                    </div>
                </div>
                <div className={`${styles.profileContainer}`}>
                    <div className={styles.profileHeader}>
                    <LogoutConfirmationModal show={showModal} handleClose={handleClose}/> 
                        <div className={styles.headIcons}>
                            <Dropdown>
                                <Dropdown.Toggle
                                    as="div"
                                    className={`${styles.notification} ${styles.customDropdownToggle} pi pi-bell p-overlay-badge`}
                                >
                                    {notification.length > 0 || !user?.verified &&
                                    <Badge severity="danger" style={{ display: "none !important" }} />
                                    }
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={styles.notifContainer}>
                                    <p className="mb-1"><FontAwesomeIcon className={styles.bell} icon={faBell} /> Notification</p>
                                    { user && !user?.verified &&
                                    <Dropdown.Item href="#/action-1">
                                        <div className={styles.notificationCard}>
                                        <p className="text-danger">Email Verification</p>
                                        <p>Your account email is not verified. You need to verify to recieve email reminders. Verification sent on your email.</p>
                                        </div>
                                    </Dropdown.Item>
                                    }
                                    {
                                    user?.verified && (
                                        <div className={styles.notificationCard}>
                                        <p className="text-success"></p>
                                        <p className="text-center">No Notification</p>
                                        </div>
                                    )
                                    }
                                </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                <Dropdown.Toggle
                                    onClick={() => setShowModal(true)}
                                    as="div"
                                    title="Sign Out"
                                    className={`${styles.notification} ${styles.customDropdownToggle} pi pi-sign-out`}
                                ></Dropdown.Toggle>
                            </Dropdown>
                        </div>
                        <p>Profile Photo</p>
                    </div>
                    <div className={styles.userInfo}>
                        <img src={photo !== null ? photo : profile} alt="profile" />
                    </div>
                    <form action="">
                        <div className={`${styles.formGroupContainer}`} style={{gridTemplateColumns: '1fr'}}>
                            <div className={styles.formGroup}>
                                <label htmlFor="first_name">Upload New Photo</label>
                                <input onChange={handlePhotoInput} value={user.profile_picture} type="file" name='email' accept="image/png, image/jpeg"/>
                            </div>
                        </div>
                        <button onClick={handleUpdatePhoto} type='button' className={`${styles.formSubmit} ${updatedPhoto ? "" : styles.disabled}`}>Update Photo</button>
                    </form>
                    <div className={styles.info}>
                        <p>Update you profile picture by uploading file on the input. The maximum size of the image is <span>1mb</span></p>
                    </div>
                    <p className={styles.member}>Member since <span>{formatDateWithMonthName(user.created_at)}</span></p>
                </div>
            </div>
        </HomeTemplate>
    )
}


function formatDateWithMonthName(dateStr) {
    const date = new Date(dateStr);

    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[date.getMonth()];
    const year = String(date.getFullYear());

    return `${monthName} ${day}, ${year}`;
}