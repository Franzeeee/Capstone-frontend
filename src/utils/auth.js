// auth.js

// const BASE_URL = 'https://localhost:8000/api';
const BASE_URL = 'https://codelab-edu.com/api';

export async function checkLoggedIn() {
    try {
        const response = await fetch(`${BASE_URL}/user`, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                // Add any other headers if needed
            }
        });

        if (response.ok) {
            return true;
        } else {
            // User is not logged in
            return false;
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        return false; // Return false in case of error
    }
}
