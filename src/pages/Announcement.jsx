import React, { useEffect, useState } from 'react'
import styles from '../assets/css/pages/announcement.module.css'
import CryptoJS from 'crypto-js';
import HomeTemplate from '../templates/HomeTemplate'
import ProfileSide from '../components/ProfileSide'
import AnnouncementForm from '../components/AnnouncementForm';
import AnnouncementContent from '../components/AnnouncementContent';

export default function Announcement() {
    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8)));

    const [createdData, setCreatedData] = useState(null);

    return (
    <HomeTemplate>
        <div className={`${styles.container}`}>
            <div className={`${styles.contentContainer}`}>
                <div className={`${styles.header}`}>
                    <div className={`${styles.create}`}>
                        <p>Announcements</p>
                    </div>
                </div>
                {
                    user.role === 'teacher' && <AnnouncementForm sendCreated={(data) => setCreatedData(data)} />
                }
                <AnnouncementContent addedData={createdData} />
            </div>
            <div className={`${styles.profileContainer}`}>
                <ProfileSide info={user}/>
            </div>
        </div>
    </HomeTemplate>
    )
}
