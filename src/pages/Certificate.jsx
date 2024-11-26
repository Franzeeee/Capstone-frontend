import React, { useEffect, useState } from 'react';
import styles from '../assets/css/pages/certificate.module.css';
import backgroundImage from '../assets/img/CodelabCert.png'; // Import image
import { useLocation } from 'react-router-dom';
import html2canvas from "html2canvas";


const Certificate = () => {

  const location = useLocation();

  const print = location?.state?.captureMode || false;
  const [studentName, setStudentName] = useState(location?.state?.studentName || "Student Name");
  const [teacher, setTeacher] = useState(location?.state?.teacher || "Teacher Name");
  const [date, setDate] = useState(location?.state?.date || "Date Here");

  useEffect(() => {
    if (print) {
      capturePage();
    }
  }, [print]);

  const capturePage = async () => {
    const element = document.querySelector(`.${styles.container}`); // Target the container class
    if (!element) {
      console.error("Element with the class 'container' not found!");
      return;
    }
  
    const canvas = await html2canvas(element, {
      scale: window.devicePixelRatio, // Match device pixel ratio for better quality
      useCORS: true, // Handle external resources like images or fonts
      height: 550, // Set the height of the canvas
      width: 1163, // Set the width of the canvas
    });
  
    const image = canvas.toDataURL("image/png");
  
    // Trigger download
    const link = document.createElement("a");
    link.href = image;
    link.download = "container-screenshot.png";
    link.click();
  
    window.history.back(); // Return to the previous page
  };
  
    
  return (
    <div className={styles.container} >
      <div className={styles.studentName}>
        <p>Student Name</p>
      </div>
        <div className={styles.text}>
            <p>{date}</p>
            <p>{teacher}</p>
        </div>
            <img src={backgroundImage} alt="certificate" className={styles.image}/>
  
    </div>

  );
}

export default Certificate;
