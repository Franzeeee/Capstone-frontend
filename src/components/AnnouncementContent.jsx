import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import styles from '../assets/css/components/announcement-content.module.css'
import profile from '../assets/img/user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import customFetch from '../utils/fetchApi'
import CryptoJS from 'crypto-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { toast } from 'react-toastify'

export default function AnnouncementContent({ data, addedData }) {

    const userData = localStorage.getItem('userData');
    const user = JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8));

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        customFetch(`/announcement/fetch?user_id=${user?.id}`)
            .then(data => {
                setAnnouncements(data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, [data]); 

    useEffect(() => {
        if (addedData && addedData?.data) {
            setAnnouncements((prevAnnouncements) => [{
                announcement_date: addedData?.data?.announcement_date,
                content: addedData?.data?.content,
                content_id: addedData?.data?.id,
                course_class: addedData?.course_class,
                teacher: addedData?.teacher,
            }, ...prevAnnouncements]);

        }

    }, [addedData]);

    const deleteAnnouncement = (id) => {
        customFetch(`/announcement/delete/${id}`, 'DELETE')
            .then((data) => {
                setAnnouncements((prevAnnouncements) =>
                    prevAnnouncements.filter((announcement) => announcement.announcement_id !== id)
                );
                toast.success('Announcement deleted successfully');
            })
            .catch((error) => {
                console.error('Error:', error); // Logging full error object
                toast.error('Failed to delete the announcement');
            });
    };
        
    return (
        <div className={`${styles.cardContainer}`}>

            {announcements.length === 0 && (
                <p>No announcements yet</p>
            )}

            {announcements.map((announcement, index) => (
                <div key={index} className={styles.card}>
                    <div className={styles.info}>
                        <div className={styles.profile}>
                            <div className={styles.profileImage}>
                                <img src={profile} alt="" />
                            </div>
                            <div className={styles.profileInfo}>
                                <p>{announcement?.teacher?.name}</p>
                                <p>{announcement?.course_class?.name}</p>
                                <p>{announcement?.announcement_date}</p>
                            </div>
                        </div>
                        <div className={styles.more}>
                            {user.id === announcement.teacher.id && (
                                <Dropdown>
                                    <Dropdown.Toggle as="span" id="dropdown-basic" className={styles.ellipsisIcon}>
                                        <FontAwesomeIcon icon={faEllipsis} />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => deleteAnnouncement(announcement.announcement_id)} href="#/action-2"><FontAwesomeIcon className={styles.deleteIcon} icon={faTrashAlt} />Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </div>
                    </div>
                    <div className={styles.content}>
                        <p>{announcement.content}</p>
                    </div>
                </div>
            ))}

        </div>
    )
}
