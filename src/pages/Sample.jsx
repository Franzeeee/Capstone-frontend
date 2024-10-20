import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';

const BASE_URL = import.meta.env.VITE_API_URL;

const Sample = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Track if authenticated
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Track if we're checking auth
    const [error, setError] = useState(null); // Track errors
    const navigate = useNavigate(); // React Router navigation hook

    // Check user authentication status
    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const response = await fetch(`${BASE_URL}/user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(!!data); // Set authenticated if data is returned
                } else {
                    setIsAuthenticated(false); // Not authenticated
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setError('Failed to check authentication status.');
                setIsAuthenticated(false);
            } finally {
                setIsCheckingAuth(false); // Done checking auth
            }
        };

        checkUserAuth(); // Call function to check authentication
    }, []);

    // Handle navigation based on authentication status
    useEffect(() => {
        if (!isCheckingAuth) {
            if (isAuthenticated === true) {
                navigate('/dashboard'); // Navigate to dashboard if authenticated
            } else if (isAuthenticated === false && !!localStorage.getItem('userData')) {
                navigate('/login'); // Navigate to login if not authenticated
            }
        }
    }, [isAuthenticated, isCheckingAuth, navigate]);

    // Show loading page while checking authentication
    if (isCheckingAuth) {
        return <LoadingPage />; // Display loading component
    }

    return null; // Nothing to display after navigation
};

export default Sample;
