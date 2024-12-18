import React, { useEffect, useState } from 'react'
import styles from '../assets/css/pages/login.module.css'
import { useNavigate } from 'react-router-dom'
import { AuthTemplate } from '../templates/AuthTemplate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import logoHorizontal from '../assets/img/logoCodelab.png'
import { customFetch } from '../utils/api';
import { toast, ToastContainer } from 'react-toastify'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js'
import { checkLoggedIn } from '../utils/auth';
import { Alert } from '@mui/material';

export const Login = () => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    // This is for changing the text for different screen size
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
    // Function to update viewportWidth when window is resized
    const handleResize = () => {
        setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    const [showPassword, setShowPassword ] = useState(false);
    
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const [loader, setLoader] = useState(false);

    const moveToLogin = () => {
        navigate('/register')
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value })
    }

    const [loginTimeout, setLoginTimeout] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.email || !formData.password || !formData){
            toast.error('Email and Password are required!')
            return;
        }
        setLoader(true)
        customFetch('/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            })
            .then(response => {
                    if(response.status === 429) {
                        setLoginTimeout(true);
                        return;
                    }
                    return response.json();
                })
            .then(data => {
                setLoader(false);
                if(data.message === 'Invalid Credentials!'){
                    setLoginTimeout(false);
                    toast.error(data.message)
                }else{
                    const stringData = JSON.stringify(data.message);
                    const hashedData = CryptoJS.AES.encrypt(stringData, 'capstone');
                    localStorage.setItem('userData', hashedData);
                    fetchProfilePicture()
                        .then(data => localStorage.setItem('profilePicture', data.path))
                        .catch(error => console.error('Error fetching profile picture:', error));
                    navigate('/') 
                }
                
                })
            .catch(error => 
            {}
            )
            .finally(() => {
                setLoader(false);
            })
    }

    return (
        <AuthTemplate>
            <div className={`col text-black d-flex ${styles.content}`}>
                <ToastContainer />
                <div className={`${styles['form-container']}`}>
                    <div className={`text ${styles.headerText}`}>
                        <img src={logoHorizontal} alt="" className={`${styles.logo}`} onClick={() => navigate('/')}/>
                        <p className={` ${styles.tagline} m-0 mt-3`}>CodeLab: Empowering Students to Learn Python Programming</p>
                    </div>
                    <form onSubmit={loader ? null : handleSubmit}>
                        {loginTimeout && <Alert severity="error">Too many failed attempts. Please try again in 5 minutes.</Alert>}
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" autoComplete='email' onChange={handleInputChange} name="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input autoComplete='current-password' type={showPassword ? "text" : "password"}  name="password" onChange={handleInputChange} className="form-control" id="password" placeholder="Password"/>
                            <FontAwesomeIcon icon={!showPassword ? faEyeSlash : faEye} className={`${styles.showPassword}`} onClick={handleShowPassword}/>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{backgroundColor: '#5D5DD4'}} disabled={loader || setLoginTimeout}>{ loader ? <FontAwesomeIcon icon={faSpinner} spin/> : "Submit"}</button>
                        <p className='text-center mt-3'>Don't have an account? <span onClick={moveToLogin}>Sign up</span></p>
                    </form>
                </div>
            </div>
        </AuthTemplate>
    );
};

async function fetchProfilePicture() {
    const apiURL = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${apiURL}/profile/picture/fetch`, {
            method: 'GET',
            credentials: 'include', // Include credentials in the request
        });
        
        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON from the response
        localStorage.setItem('profilePicture', data.path); // Store the profile picture in local storage
        return data; // Return the data received from the API
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}