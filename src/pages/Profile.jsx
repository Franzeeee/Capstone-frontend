import React, {useState} from 'react'
import HomeTemplate from '../templates/HomeTemplate'
import styles from '../assets/css/pages/profile.module.css'
import CryptoJS from 'crypto-js'
import profile from '../assets/img/user.png'


export default function Profile() {

    const userData = localStorage.getItem('userData');
    const user = JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8));

    const [updatedInfo, setUpdatedInfo] = useState(false);
    const [updatedContact, setUpdatedContact] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false);
    const [updatedPhoto, setUpdatedPhoto] = useState(false);

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
                                    <input type="text" name='first_name' value={user.name}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="first_name">Middle Name</label>
                                    <input type="text" name='first_name' value={user.name}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="first_name">Last Name</label>
                                    <input type="text" name='first_name' value={user.name}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="birthday">Birthday</label>
                                    <input type="date" name='birthday' />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="first_name">Gender</label>
                                    <input type="text" name='first_name' placeholder='ex. Male'/>
                                </div>
                            </div>
                            <button type='button' className={`${styles.formSubmit} ${updatedInfo ? "" : styles.disabled}`}>Save Information</button>
                        </form>
                        <form action="">
                            <p className={styles.formTitle}>Contact Information</p>
                            <div className={`${styles.formGroupContainer}`} style={{gridTemplateColumns: '1fr'}}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="first_name">Email</label>
                                    <input type="text" name='email' value={user.email}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="first_name">Contact Number</label>
                                    <input type="text" name='contact_number' value={user.phone}/>
                                </div>
                            </div>
                            <button type='button' className={`${styles.formSubmit} ${ updatedContact ? "" : styles.disabled}`}>Save Contact</button>
                        </form>
                        <form action="">
                            <p className={styles.formTitle}>Security</p>
                            <div className={`${styles.formGroupContainer}`} style={{gridTemplateColumns: '1fr'}}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="first_name">New Password</label>
                                    <input type="text" name='email' value={user.email}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="first_name">Confirm Password</label>
                                    <input type="text" name='contact_number' value={user.name}/>
                                </div>
                            </div>
                            <button type='button' className={`${styles.formSubmit} ${updatedPassword ? "" : styles.disabled}`}>Update Password</button>
                        </form>
                    </div>
                </div>
                <div className={`${styles.profileContainer}`}>
                    <div className={styles.profileHeader}>
                        <p>Profile Photo</p>
                    </div>
                    <div className={styles.userInfo}>
                        <img src={profile} alt="profile" />
                    </div>
                    <form action="">
                        <div className={`${styles.formGroupContainer}`} style={{gridTemplateColumns: '1fr'}}>
                            <div className={styles.formGroup}>
                                <label htmlFor="first_name">Upload New Photo</label>
                                <input type="file" name='email' accept="image/png, image/jpeg"/>
                            </div>
                        </div>
                        <button type='button' className={`${styles.formSubmit} ${updatedPhoto ? "" : styles.disabled}`}>Update Photo</button>
                    </form>
                </div>
            </div>
        </HomeTemplate>
    )
}
