import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkLoggedIn } from '../utils/auth'; // Utility function for logging check
import customFetch from '../utils/fetchApi';  // Custom fetch function
import LoadingPage from '../pages/LoadingPage';

export const ProtectedRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // Manage login state
    const [isLoading, setIsLoading] = useState(true);   // Manage loading state

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await customFetch('/authUser'); // Fetch user authentication status
                
                // Assuming the response is a boolean indicating logged-in status
                const loggedIn = response === true; // Check if the response is true or false
                setIsLoggedIn(loggedIn); // Set loggedIn state
                checkLoggedIn(loggedIn); // Call utility function to check login
            } catch (error) {
                setIsLoggedIn(false); // On error, assume user is not logged in
            } finally {
                setIsLoading(false);  // Loading complete
            }
        };

        checkAuth(); // Call the async function
    }, []);

    if (isLoading) {
        return <LoadingPage />; // Show a loading indicator while checking authentication
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />; // If logged in, show protected routes, otherwise redirect to login
};
