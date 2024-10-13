import React, { useEffect, useState } from 'react'
import styles from '../assets/css/components/announcement-content.module.css'
import profile from '../assets/img/user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import customFetch from '../utils/fetchApi'
import CryptoJS from 'crypto-js'

export default function AnnouncementContent({data}) {

    const userData = localStorage.getItem('userData');
    const user = JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8));

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        customFetch(`/announcement/fetch?user_id=${user.id}`)
            .then(data => {
                setAnnouncements(data);
                console.log('Data:', data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, [])

  return (
    <div className={`${styles.cardContainer}`}>


        {announcements.map((announcement, index) => (
            <div key={index} className={styles.card}>
                <div className={styles.info}>
                    <div className={styles.profile}>
                    <div className={styles.profileImage}>
                        <img src={profile} alt="" />
                    </div>
                    <div className={styles.profileInfo}>
                        <p>{announcement.teacher.name}</p>
                        <p>{announcement.course_class.name}</p>
                        <p>{announcement.announcement_date}</p>
                    </div>
                    </div>
                    <div className={styles.more}>
                        {user.id === announcement.teacher.id && (
                            <FontAwesomeIcon icon={faEllipsis} />
                        )}
                    </div>
                </div>
                <div className={styles.content}>
                    <p>{announcement.content}</p>
                    {/* Uncomment and adjust the following lines if there is other content */}
                    {/* <div className={styles.otherContent}>
                    <img src={announcement.image} alt="" />
                    </div> */}
                </div>
            </div>
        ))}



    </div>
    )
}
