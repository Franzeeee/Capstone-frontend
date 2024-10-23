// logout.js
const BASE_URL = import.meta.env.VITE_API_URL;

export const logout = async () => {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            credentials: 'include', // Include cookies with the request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}), // Include any necessary body if required by your API
        });

        if (response.ok) {
            // Handle successful logout
            return true; // Logout successful
        } else {
            // Handle errors, log error message
            console.error('Logout failed:', response.statusText);
            return false; // Logout failed
        }
    } catch (error) {
        console.error('Error during logout:', error);
        return false; // Error occurred during logout
    }
};