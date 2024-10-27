import React, { useEffect, useState } from 'react'
import styles from '../assets/css/pages/login.module.css'
import { useNavigate } from 'react-router-dom'
import { AuthTemplate } from '../templates/AuthTemplate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import logoHorizontal from '../assets/img/logo-horizontal.png'
import { customFetch } from '../utils/api';
import { toast, ToastContainer } from 'react-toastify'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js'
import { checkLoggedIn } from '../utils/auth';

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
                    return response.json();
                })
            .then(data => {
                setLoader(false);

                if(data.message === 'Invalid Credintials!'){
                    toast.error(data.message)
                }else{
                    const stringData = JSON.stringify(data.message);
                    const hashedData = CryptoJS.AES.encrypt(stringData, 'capstone');
                    localStorage.setItem('userData', hashedData);
                    navigate('/')
                }
                
                })
            .catch(error => console.error(error))
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
                        <img src={logoHorizontal} alt="" className={`${styles.logo}`}/>
                        <p className={` ${styles.tagline} m-0`}>CodeLab: Empowering Students to Learn Python Programming</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" onChange={handleInputChange} name="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type={showPassword ? "text" : "password"}  name="password" onChange={handleInputChange} className="form-control" id="password" placeholder="Password"/>
                            <FontAwesomeIcon icon={!showPassword ? faEyeSlash : faEye} className={`${styles.showPassword}`} onClick={handleShowPassword}/>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loader}>{ loader ? <FontAwesomeIcon icon={faSpinner} spin/> : "Submit"}</button>
                        <p className='text-center mt-3'>Already have an account? <span onClick={moveToLogin}>Sign up</span></p>
                    </form>
                </div>
            </div>
        </AuthTemplate>
    );
};