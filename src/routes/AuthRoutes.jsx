import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkLoggedIn } from '../utils/auth';
import customFetch from '../utils/fetchApi'
import LoadingPage from '../pages/LoadingPage';

export const AuthRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            // Check if userData is in localStorage
            const userData = localStorage.getItem('userData');

            if (userData) {
                try {
                    const response = await customFetch('/authUser'); // Fetch user authentication status
                    
                    // Check if the response indicates that the user is authenticated
                    const loggedIn = response === true;
                    
                    if (loggedIn) {
                        setIsLoggedIn(true); // User is authenticated
                    } else {
                        setIsLoggedIn(false); // User is not authenticated
                    }
                    checkLoggedIn(loggedIn); // Call utility function to check login
                } catch (error) {
                    setIsLoggedIn(false); // On error, assume user is not logged in
                } finally {
                    setIsLoading(false); // Loading complete
                }
            } else {
                setIsLoggedIn(false); // No userData in localStorage means user is not logged in
                setIsLoading(false); // Loading complete
            }
        };

        checkAuth(); // Call the async function
    }, []);

    if (isLoading) {
        return <LoadingPage />; // Show a loading indicator while checking authentication
    }

    return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" />; // If logged in, show protected routes, otherwise redirect to login
};
