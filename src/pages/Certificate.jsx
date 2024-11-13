import React from 'react';
import styles from '../assets/css/pages/certificate.module.css';
import backgroundImage from '../assets/img/CodelabCert.png'; // Import image
import Print from '../components/PrintModal'
const Certificate = () => {
    
  return (
    <div className={styles.container} >
        <div className={styles.text}>
            <p>DATE here ha code nala ibutang</p>
            <p>advider's name</p>
        </div>
            <img src={backgroundImage} alt="certificate" className={styles.image}/>
  
    </div>

  );
}

export default Certificate;
