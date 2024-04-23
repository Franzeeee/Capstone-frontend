import React, { createContext, useState, useEffect } from 'react';
import { Header } from '../components/Header';
import styles from '../assets/css/components/rightpanel.module.css'
import logo from '../assets/img/logo.png'
import user from '../assets/img/user.png'
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { checkLoggedIn } from '../utils/auth';
import { customFetch } from '../utils/api';

const ErrorContext = createContext();

export const MainTemplate = ({children}) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(()=> {
        const checkLoginStatus = async () => {
            const loggedIn = await checkLoggedIn();
            if (loggedIn) {
                
            } else {
                navigate('/login')
            }
            }
            checkLoginStatus();
        },[]);

    const handleLogout = () => {
        customFetch('/logout', {
            method: 'POST',
            body: {},
            })
            .then(response => {
                response.json()
            })
            .then(data => {
                navigate('/login');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return(
        <ErrorContext.Provider value={{errors, setErrors}}>
            <div className={`${styles.body} container-fluid p-0`}>
                <div className="row overflow-hidden m-0 vh-100">
                    <Header />
                    <div className="col border border-1 border-black p-0">
                        <div className="row m-0 p-0">
                        <div className={`${styles.head} col-12`}>
                            <div className={`${styles.logo}`}>
                                <img src={logo} alt="Website Logo" />
                            </div>
                            <div className={`${styles.user}`}>
                                <img src={user} 
                                    onClick={handleClick} 
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                />
                                <div className="info">
                                    <p>John Doe</p>
                                    <p>Student</p>
                                </div>
                            </div>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button'}}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <div className={`col-12 m-0 p-0 ${styles.content}`}>
                            {children}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorContext.Provider>
    )

}