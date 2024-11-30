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


  const isCertificatePage = location.pathname === '/certificate';

  useEffect(() => {
    if(true) {
      capturePage();
    }
  }, [print]);

  const capturePage = async () => {
    const element = document.querySelector(`.${styles.container}`); // Target the container class
    if (!element) {
      console.error("Element with the class 'container' not found!");
      return;
    }
    const width = element.scrollWidth;
    const height = element.scrollHeight;


    const canvas = await html2canvas(element, {
      // scale: window.devicePixelRatio,
      // width: width, // Set canvas width to the element's content width
      height: height,
      useCORS: true,
    });
  
    const image = canvas.toDataURL("image/png");
  
    // Trigger download
    const link = document.createElement("a");
    link.href = image;
    link.download = "certificate.png";
    link.click();
  
    // window.history.back(); // Return to the previous page
  };
  
    
  return (
    <div className={styles.container} >
      <div className={styles.studentName}>
        <p>Student Name</p>
      </div>
        <div className={styles.text}>
            <p>{formatDate(date)}</p>
            <p>{teacher}</p>
        </div>
            <img src={backgroundImage} alt="certificate" className={styles.image}/>
  
    </div>

  );
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

export default Certificate;
