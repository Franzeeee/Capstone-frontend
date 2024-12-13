import React, { useEffect, useState } from "react";
import styles from "../assets/css/components/profile-side.module.css";
import {
  faBell,
  faCheckSquare,
  faClock,
  faEdit,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profile from "../assets/img/1x1Robot2.png";
import { Badge } from "primereact/badge";
import { Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../utils/logout";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import customFetch from "../utils/fetchApi";
import { getUserData } from "../utils/userInformation";
import { format } from "date-fns";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import NotificationModal from "./Modals/NotificationModal";


export default function ProfileSide({ info }) {
  const navigate = useNavigate();
  const {code} = useParams();

  const [showModal, setShowModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(profile);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const [removing, setRemoving] = useState(false);

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
    setLoading(true);
    customFetch('/events/fetch')
    .then(data => {
      setEvents(data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const handleDeleteEvent = (id) => {
    customFetch(`/events/${id}/delete`, {
      method: "DELETE"
    })
    .then(data => {
      setEvents(events.filter(event => event.id !== id));
      toast.success("Event deleted successfully");
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  };

  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    customFetch(`/notification/${user.id}/fetch`, {
      method: "GET"
    })
    .then(data => {
      if(data.notifications.length > 0) {
      const sortedNotifications = data.notifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setNotificationData(sortedNotifications);
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  }, []);


  const navigateToClass = (classCode) => {
    if(code === classCode) {
      toast.info("You are already in this class");
    }else {
      navigate(`/c/${classCode}`);
    }
  }

  const handleDeleteNotification = (id) => {
    setRemoving(true);
    customFetch(`/notification/${id}/delete`, {
      method: "GET"
    })
    .then(data => {
      setNotificationData(notificationData.filter(notification => notification.id !== id));
      toast.success("Notification deleted successfully");
    })
    .catch(error => {
      console.error('Error:', error.message);
    })
    .finally(() => {
      setRemoving(false);
    });
  };

  const handleClearAll = () => {
    setRemoving(true);
    customFetch(`/notification/${user.id}/deleteAll`, {
      method: "GET"
    })
    .then(data => {
      setNotificationData([]);
      toast.success("All notifications deleted successfully");
    })
    .catch(error => {
      console.error('Error:', error.message);
    })
    .finally(() => {
      setRemoving(false);
    });
  }

  return (
    <>
      <div className={`${styles.profileHeader}`}>
        <LogoutConfirmationModal show={showModal} handleClose={handleClose}/> 
        <p className={`${styles.profileText}`}>Profile</p>
        <Dropdown autoClose="outside">
          <Dropdown.Toggle
            as="div"
            className={`${styles.notification} ${styles.customDropdownToggle} pi pi-bell p-overlay-badge`}
          >
            {notification.length > 0 || notificationData.length > 0 || !user?.verified ? (
              <Badge severity="danger" style={{ display: "none !important" }} />
            ) : null
            }
          </Dropdown.Toggle>
          <Dropdown.Menu className={styles.notifContainer}>
            <p className="mb-1"><FontAwesomeIcon className={styles.bell} icon={faBell} /> Notification({(notificationData.length) + (!user?.verified ? 1 : 0)}) 
              <span onClick={handleClearAll} className={`${styles.clearNotif} ${notificationData.length === 0 ? styles.disabledClear : ""}`}>Clear All</span>
            </p>
            { user && !user?.verified &&
              <Dropdown.Item>
                <div className={styles.notificationCard}>
                  <p className="text-danger">Email Verification <Badge severity="danger" style={{ display: "none !important" }} /></p>
                  <p>Your account email is not verified. You need to verify to recieve email reminders. <b>Verification sent on your email</b>.</p>
                </div>
              </Dropdown.Item>
            }
            {
              user?.verified && notificationData.length === 0 && (
                <div className={styles.notificationCard}>
                  <p className="text-success"></p>
                  <p className="text-center">No Notification</p>
                </div>
              )
            }
            {notificationData && notificationData.length > 0 && notificationData.map((notification, index) => (
              notification.type === 'announcement' ? (
                <Dropdown.Item key={index}>
                  <div className={styles.notificationCard}>
                    <p className="text-primary">New Announcement</p>
                    <p>{notification?.message}</p>
                    <div className={styles.notificationBtns}>
                      <button className={styles.remove} onClick={() => handleDeleteNotification(notification?.id)}>Remove</button>
                      <button onClick={() => navigateToClass(notification?.class_code)}>View Class</button>
                    </div>
                    <p className={styles.date}>{timeAgo(notification?.created_at)}</p>
                    
                  </div>
                </Dropdown.Item>
              ) : (
                <Dropdown.Item key={index}>
                  <div className={styles.notificationCard}>
                    <p className="text-primary">New Assessment Posted</p>
                    <p>{notification.message}</p>
                    <div className={styles.notificationBtns}>
                      <button className={styles.remove} onClick={() => handleDeleteNotification(notification?.id)}>Remove</button>
                      <button onClick={() => navigateToClass(notification?.class_code)}>View Class</button>
                    </div>
                    <p className={styles.date}>{timeAgo(notification.created_at)}</p>
                  </div>
                </Dropdown.Item>
              )
            ))}

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
        <p className={`${styles.userName} text-center`}>
          {info ? info.name : "Undefined User"}{" "}
          <FontAwesomeIcon title="Edit Name" onClick={() => navigate('/profile')} icon={faEdit}></FontAwesomeIcon>
        </p>
        <p className="text-capitalize">{info ? info.role : "Undefined Role"}</p>
      </div>
      <div className={`${styles.schedule}`}>
        <p className={`${styles.scheduleText}`}>To-do Schedule <FontAwesomeIcon style={{fontSize: '.8rem', marginLeft: '3px', cursor: 'pointer'}} icon={faPlus} onClick={() => navigate('/calendar')} /></p>
        <div className={`${styles.activityContainer}`}>

        {loading ? (
            <p>Loading...</p>
          ) : (
            events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className={`${styles.card}`}>
                  <div className={`${styles.activityInfo}`}>
                    <p>{event.title}</p>
                    <p>{event.description}</p>
                    <div className={`${styles.taskInfo}`}>
                      <p>
                        <FontAwesomeIcon icon={faClock} /> {formatDate(event.start_date)} - {formatDate(event.end_date)}
                      </p>
                    </div>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id={`tooltip-test`}>Delete</Tooltip>}
                    >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className={`${styles.editActivity}`}
                          onClick={() => handleDeleteEvent(event.id)}
                        />
                    </OverlayTrigger>
                  </div>
                </div>
              ))
            ) : (
              <p>No To-do Activity</p>
            )
          )
        }
        <NotificationModal
          show={showNotification}
          handleClose={() => setShowNotification(false)}
        />
        </div>
      </div>
    </>
  );
}

function formatDate(dateString) {
  return format(new Date(dateString), "MMM dd");
}

function timeAgo(dateString) {
  // Parse the provided date string into a Date object
  const date = new Date(dateString);
  
  // Get the current time
  const now = new Date();
  
  // Calculate the difference in milliseconds
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  // Calculate time differences
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const months = Math.floor(diffInSeconds / 2592000);
  const years = Math.floor(diffInSeconds / 31536000);
  
  // Return human-readable time ago string
  if (years > 0) {
      return years === 1 ? '1 year ago' : `${years} years ago`;
  }
  if (months > 0) {
      return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  if (days > 0) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
  }
  if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }
  return diffInSeconds < 60 ? 'Just now' : 'Now';
}
