import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../assets/css/templates/home-template.module.css";
import logo from "../assets/img/logoCodelab.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBullhorn,
  faCalendarDays,
  faChalkboardTeacher,
  faCode,
  faHome,
  faStar,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import PracticeTest from "../components/PracticeTest";
import Modal from "react-bootstrap/Modal";
import { ToastContainer } from "react-toastify";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import CryptoJS from "crypto-js";
const ErrorContext = createContext();
import menu from '../assets/img/icons/menu.png';
import AccountMenu from '../components/AccountMenu';
import DrawerNav from "../components/MobileVersion/DrawerNav";
import LogoutConfirmationModal from "../components/LogoutConfirmationModal";


export default function HomeTemplate({ children }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const userData = localStorage.getItem('userData');
  const [user, setUser] = useState(
      JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8))
  );

  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);

  const toggleShow = () => setShow((prev) => !prev);
  const handleClose = () => setShowModal(false);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <div className={`${styles.container}`}>
      <LogoutConfirmationModal show={showModal} handleClose={handleClose}/> 
        <Modal show={show} onHide={toggleShow}>
          <Modal.Header closeButton>
            <p className="m-0">
              <FontAwesomeIcon color="red" size="lg" icon={faWarning} />{" "}
              Temporary Unavailable.
            </p>
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
                <li
                  onClick={() => navigate("/dashboard")}
                  className={`${
                    location.pathname === "/dashboard" ||
                    location.pathname.includes("/c/")
                      ? styles.active
                      : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>Dashboard
                </li>
                <li onClick={() => navigate("/playground")}>
                  <FontAwesomeIcon icon={faCode}></FontAwesomeIcon> Coding
                  Playground
                </li>
                <li
                  onClick={() => navigate("/calendar")}
                  className={`${
                    location.pathname === "/calendar"
                      ? styles.active
                      : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faCalendar} /> Calendar
                </li>
                <li
                  onClick={() => navigate("/announcements")}
                  className={`${
                    location.pathname === "/announcements"
                      ? styles.active
                      : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faBullhorn}></FontAwesomeIcon>{" "}
                  Announcements
                </li>
                {
                  user.role === 'teacher' ? (
                    <>
                      <li
                        className={`${
                          location.pathname === "/teacher/classes" ||
                          location.pathname.includes("/teacher/classes/")
                            ? styles.active
                            : ""
                        }`}
                        onClick={() => navigate('/teacher/classes')}>
                        <FontAwesomeIcon icon={faChalkboardTeacher}></FontAwesomeIcon> Classes
                      </li>
                      <li
                        className={`${
                          location.pathname === "/teacher/classes/grades" ||
                          location.pathname.includes("/teacher/grades/class")
                            ? styles.active
                            : ""
                        }`}
                        onClick={() => navigate('/teacher/grades/class')}>
                        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon> Grades
                      </li>
                    </>
                  ) : (
                    <>
                      <li className={`${
                          location.pathname === "/grades" ||
                          location.pathname.includes("/grades")
                            ? styles.active
                            : ""
                        }`}
                        onClick={() => navigate('/grades')}
                      >
                        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon> Grades
                      </li>
                    </>
                  )
                }
                
              </ul>
            </div>
            <PracticeTest />
          </div>
        </div>
        <div className={`${styles.main}`}>
          <ToastContainer autoClose={3000} />
          <div className={`d-none ${styles.headNav}`}>
            <DrawerNav />
            <div>
              <AccountMenu logoutOnClick={() => setShowModal(true)} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </ErrorContext.Provider>
  );
}
