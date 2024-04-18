import React, { useState } from 'react'
import styles from '../assets/css/pages/login.module.css'
import { useNavigate } from 'react-router-dom'
import { AuthTemplate } from '../templates/AuthTemplate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

export const Login = () => {

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

    const navigate = useNavigate();

    const moveToLogin = () => {
      navigate('/register')
    }
  

    return (
        <AuthTemplate>
            <div className={`col text-black d-flex ${styles.content}`}>
                <div className={`${styles['form-container']}`}>
                    <div className="text">
                        <h4 className='fs-1 text-center'>{viewportWidth < 767 ? "Login" : "eCampus"}</h4>
                        <p className={` ${styles.tagline} m-0`}>eCampus: Where Knowledge Meets Inovation, Anytime, Anywhere</p>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Password"/>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className={`${styles.showPassword}`} onClick={handleShowPassword}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <p className='text-center mt-3'>Already have an account? <span onClick={moveToLogin}>Sign up</span></p>
                    </form>
                </div>
            </div>
        </AuthTemplate>
    );
};