import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../assets/css/components/logout-modal.module.css";
import { logout } from "../utils/logout";
import { useNavigate } from "react-router-dom";

export default function LogoutConfirmationModal({ show, handleClose }) {
  const navigate = useNavigate(); // Move useNavigate here

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      navigate("/login");
      localStorage.removeItem("userData");
    } else {
      // Handle logout failure if needed
      console.error("Logout was unsuccessful");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className={`${styles.logoutContainer}`}>
      <Modal.Title className={`${styles.Title}`}>
        Logout Confirmation
      </Modal.Title>
      <Modal.Body>
        <p>Are you sure you want to logout?</p>
        <Button variant="secondary" onClick={handleClose} className={`${styles.Close}`}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogout} className={`${styles.Logout}`}>
          Logout
        </Button>
      </Modal.Body>
    </Modal>
  );
}
