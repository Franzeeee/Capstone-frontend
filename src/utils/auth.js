// auth.js
const BASE_URL = import.meta.env.VITE_API_URL;

export async function checkLoggedIn() {


    try {
        const response = await fetch(`${BASE_URL}/user`, {
            method: 'GET',
            credentials: 'include', // Ensure cookies are sent with requests
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            }
        });

        if (response.ok) {
            const data = await response.json(); // Optionally retrieve the data
            return data; // Return user data or true if you just want a boolean
        } else {
            // User is not logged in or some other error occurred
            return false; // You can also log the status or message for debugging
        }
    } catch (error) {
        return false; // Return false in case of error
    }
}
