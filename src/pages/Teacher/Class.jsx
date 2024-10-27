import React, { useEffect, useState } from 'react'
import HomeTemplate from '../../templates/HomeTemplate'
import styles from '../../assets/css/pages/class.module.css'
import profile from '../../assets/img/user.png'
import { faChartSimple, faCheckSquare, faClock, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';

// Component Imports
import  AnnouncementForm  from '../../components/AnnouncementForm';
import ClassContents from '../../components/ClassContents';
import LoadingPage from '../LoadingPage';
import ProfileSide from '../../components/ProfileSide';
import CreateAssessment from '../../components/CreateAssessment';


export default function Class() {

    const navigate = useNavigate()
    const { code } = useParams();

    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8)));

    const [classInfo, setClassInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const api  = import.meta.env.VITE_API_URL;
    
    useEffect(() => {
    // Fetch class information by class code
    const fetchClassInfo = async () => {
        try {
        const response = await fetch(`${api}/class/${code}`);

        if (!response.ok) {
            // If the response is not OK, throw an error
            throw new Error('Class not found');
        }

        const data = await response.json();
        setClassInfo(data);
        } catch (error) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };

    fetchClassInfo();
    }, [code]);

    if (loading) {
    return <LoadingPage />
    }

    if (error) {
    return <p>Error: {error}</p>;
    }
    

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
                                    <li className={`${styles.active}`}>{classInfo?.name}</li>
                                </ul>
                            </div>
                            <p>{classInfo?.name}</p>
                        </div>
                    </div>
                    <AnnouncementForm />
                    <CreateAssessment />
                    <ClassContents data={{courseId: classInfo.id}} code={code} className={classInfo?.name}/>
                </div>

                <div className={`${styles.profileContainer}`}>
                    <ProfileSide info={user} />
                </div>
                
            </div>
        </HomeTemplate>
    )
}
