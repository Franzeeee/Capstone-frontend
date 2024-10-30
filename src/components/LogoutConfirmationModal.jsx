import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../assets/css/components/logout-modal.module.css";
import { logout } from "../utils/logout";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { toast } from "react-toastify";


export default function LogoutConfirmationModal({ show, handleClose }) {
  const navigate = useNavigate(); // Move useNavigate here


  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      navigate("/login");
      localStorage.removeItem("userData");
    } else {
      // Handle logout failure if needed
      toast.error("Logout was unsuccessful");
    }
  };

  return (
    <ConfirmationModal 
      show={show} 
      handleClose={handleClose} 
      modalData={{title: "Confirm Logout", 
                  body: "Are you sure you want to logout?", 
                  action: () => handleLogout(),
                  iconColor: "red",}}
    />
  )
}
