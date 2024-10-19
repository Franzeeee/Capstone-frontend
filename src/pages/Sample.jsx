import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';

// Get the base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_URL;

const Sample = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // State to store authentication status
    const [error, setError] = useState(null); // State to store any errors
    const navigate = useNavigate(); // Get navigate function from react-router-dom

    // Effect to check user authentication status
    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const response = await fetch(`${BASE_URL}/user`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies with the request
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(!!data); // Set authenticated if data exists
                } else {
                    setIsAuthenticated(false); // Not authenticated
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setError('Failed to check authentication status.');
                setIsAuthenticated(false); // Return false in case of error
            }
        };

        checkUserAuth(); // Call the function to check user authentication
    }, []); // Run once on component mount

    // Effect to handle navigation based on authentication status
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/dashboard'); // Navigate to dashboard if authenticated
        } else if (isAuthenticated === false) {
            navigate('/login'); // Navigate to login if not authenticated
        }
    }, [isAuthenticated, navigate]); // Re-run on isAuthenticated change

    // Show loading while checking authentication status
    if (isAuthenticated === null) {
        return <LoadingPage />; // Display loading component while checking
    }

    return null; // No additional rendering required after navigation
};

export default Sample;
