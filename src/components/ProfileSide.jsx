import React from 'react'
import styles from '../assets/css/components/profile-side.module.css'
import { faBell, faCheckSquare, faClock, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import profile from '../assets/img/user.png'
import { Badge } from 'primereact/badge';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function ProfileSide({info}) {
    const api = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleLogout = async  () => {
        
        navigate('/login');
        try {
            const response = await fetch(`${api}/logout`, {
                method: 'POST',
                credentials: 'include', // Include cookies with the request
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                // Handle successful logout, e.g., redirect to login page
                localStorage.removeItem('userData');
            } else {
                // Handle errors, e.g., display an error message
                console.error('Logout failed:', response.statusText);
                return false; // Logout failed
            }
        } catch (error) {
            console.error('Error during logout:', error);
            return false; // Error occurred during logout
        }

    }

    return (
        <>
        <div className={`${styles.profileHeader}`}>
            <p className={`${styles.profileText}`}>Profile</p>
            <Dropdown>
                <Dropdown.Toggle as="div" className={`${styles.notification} ${styles.customDropdownToggle} pi pi-bell p-overlay-badge`}>
                    <Badge severity='danger' style={{display: 'none !important'}} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Notification 1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Notification 2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Notification 3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle onClick={handleLogout} as="div" title='Sign Out' className={`${styles.notification} ${styles.customDropdownToggle} pi pi-sign-out`}>
                </Dropdown.Toggle>
            </Dropdown>
        </div>
        <div className={`${styles.userInfo}`}>
            <img src={profile} alt="" />
            <p className={`${styles.userName}`}>{info ? info.name : "Undefined User"} <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></p>
            <p className='text-capitalize'>{info ? info.role : "Undefined Role"}</p>
        </div>
        <div className={`${styles.schedule}`}>
            <p className={`${styles.scheduleText}`}>Tooday's Schedule</p>
            
            <div className={`${styles.activityContainer}`}>
            <div className={`${styles.card}`}>
                <div className={`${styles.activityInfo}`}>
                    <p>Activity 1</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div className={`${styles.taskInfo}`}>
                        <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                        <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                    </div>
                    <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
                </div>
            </div>

            <div className={`${styles.card}`}>
                <div className={`${styles.activityInfo}`}>
                    <p>Activity 1</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div className={`${styles.taskInfo}`}>
                        <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                        <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                    </div>
                    <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
                </div>
            </div>

            <div className={`${styles.card}`}>
                <div className={`${styles.activityInfo}`}>
                    <p>Activity 1</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div className={`${styles.taskInfo}`}>
                        <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                        <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                    </div>
                    <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
                </div>
            </div>

            <div className={`${styles.card}`}>
                <div className={`${styles.activityInfo}`}>
                    <p>Activity 1</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div className={`${styles.taskInfo}`}>
                        <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                        <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                    </div>
                    <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
                </div>
            </div>
            <div className={`${styles.card}`}>
                <div className={`${styles.activityInfo}`}>
                    <p>Activity 1</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div className={`${styles.taskInfo}`}>
                        <p><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Mar 9</p>
                        <p><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> 0/8</p>
                    </div>
                    <FontAwesomeIcon title='Edit Activity' icon={faEdit} className={`${styles.editActivity}`}></FontAwesomeIcon>
                </div>
            </div>
            </div>
            
        </div>
        </>
    )
}
