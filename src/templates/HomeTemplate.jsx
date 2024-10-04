import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../assets/css/templates/home-template.module.css'
import logo from '../assets/img/logoCodelab.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faCalendarDays, faCode, faHome, faStar,faWarning } from '@fortawesome/free-solid-svg-icons';
import PracticeTest from '../components/PracticeTest';
import Modal from 'react-bootstrap/Modal'

const ErrorContext = createContext();

export default function HomeTemplate({children}) {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(prev => !prev);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            <div className={`${styles.container}`}>

            <Modal show={show} onHide={toggleShow}>
            <Modal.Header closeButton>
                <p className='m-0'><FontAwesomeIcon color='red' size='lg' icon={faWarning} /> Temporary Unavailable.</p>
            </Modal.Header>
                <Modal.Body>Page Under Development!</Modal.Body>
            </Modal>

                <div className={`${styles.sidebar}`}>
                    <div className={`${styles.sideContent}`}>
                        <div className={`${styles.header}`}>
                            <img src={logo} alt="" />
                        </div>
                        <div className={`${styles.menu}`}>
                            <ul>
                                <li onClick={() => navigate('/dashboard')} className={`${location.pathname === '/dashboard' || location.pathname === '/c/testurl' ? styles.active : ""}`}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon>Dashboard</li>
                                <li onClick={() => navigate('/playground')} ><FontAwesomeIcon icon={faCode}></FontAwesomeIcon> Coding Playground</li>
                                <li onClick={toggleShow} ><FontAwesomeIcon icon={faStar}></FontAwesomeIcon> Grades</li>
                                <li onClick={toggleShow}><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> Calendar</li>
                                <li onClick={toggleShow}><FontAwesomeIcon icon={faBullhorn}></FontAwesomeIcon> Announcements</li>
                            </ul>
                        </div>
                        <PracticeTest />
                    </div>
                </div>
                <div className={`${styles.main}`}>
                    {children}
                </div>
            </div>
        </ErrorContext.Provider>
    );
}
