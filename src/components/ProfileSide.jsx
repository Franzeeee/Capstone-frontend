import React, { useEffect, useState } from "react";
import styles from "../assets/css/components/profile-side.module.css";
import {
  faBell,
  faCheckSquare,
  faClock,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profile from "../assets/img/1x1Robot2.png";
import { Badge } from "primereact/badge";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import customFetch from "../utils/fetchApi";
import { getUserData } from "../utils/userInformation";
import { format } from "date-fns";

export default function ProfileSide({ info }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(profile);

  const [notification, setNotification] = useState([]);

  const user = getUserData();

  useEffect(() => {
    const storedProfilePicture = localStorage.getItem("profilePicture");
    
    
    if(!storedProfilePicture) {

      customFetch('/profile/picture/fetch')
      .then(data => {
          setProfilePicture(data.path);
          localStorage.setItem("profilePicture", data.path);
      })
      .catch(error => {
          console.error('Error:', error.message);
      });
    } else {
      setProfilePicture(storedProfilePicture);
    }

    
  }, []);

  const handleClose = () => setShowModal(false);

  // const handleLogout = async () => {
  //   const success = await logout();

  //   if (success) {
  //     localStorage.removeItem("userData");
  //     navigate("/login");
  //   } else {
  //     // Handle logout failure if needed
  //     console.error("Logout was unsuccessful");
  //   }
  // };

  window.addEventListener('storage', (event) => {
    if (event.key === 'userData') {
      user.verified = 'true';
    }
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    customFetch('/events/fetch')
    .then(data => {
      setEvents(data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  }, []);


  return (
    <>
      <div className={`${styles.profileHeader}`}>
        <LogoutConfirmationModal show={showModal} handleClose={handleClose}/> 
        <p className={`${styles.profileText}`}>Profile</p>
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
      <div className={`${styles.userInfo}`}>
        <img src={profilePicture !== null ? profilePicture : profile} alt="Profile Picture" />
        <p className={`${styles.userName}`}>
          {info ? info.name : "Undefined User"}{" "}
          <FontAwesomeIcon title="Edit Name" onClick={() => navigate('/profile')} icon={faEdit}></FontAwesomeIcon>
        </p>
        <p className="text-capitalize">{info ? info.role : "Undefined Role"}</p>
      </div>
      <div className={`${styles.schedule}`}>
        <p className={`${styles.scheduleText}`}>To-do Scheduler <FontAwesomeIcon style={{fontSize: '.8rem', marginLeft: '3px', cursor: 'pointer'}} icon={faPlus} /></p>
        <div className={`${styles.activityContainer}`}>

          {
            events.length > 0 ? events.map((event, index) => {
              return (
                <div className={`${styles.card}`}>
                  <div className={`${styles.activityInfo}`}>
                    <p>{event.title}</p>
                    <p>{event.description}</p>
                    <div className={`${styles.taskInfo}`}>
                      <p>
                        <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> {formatDate(event.start_date)} - {formatDate(event.end_date)}
                      </p>
                    </div>
                    <FontAwesomeIcon
                      title="Edit Activity"
                      icon={faEdit}
                      className={`${styles.editActivity}`}
                    ></FontAwesomeIcon>
                  </div>
                </div>
              )
            }) : "No To-do Activity"
          }

        </div>
      </div>
    </>
  );
}

function formatDate(dateString) {
  return format(new Date(dateString), "MMM dd");
}
