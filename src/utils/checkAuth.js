// checkAuth.js
const BASE_URL = import.meta.env.VITE_API_URL; // Ensure you have the base URL set in your environment

export const checkAuth = async () => {
    try {
        const response = await fetch(`${BASE_URL}/user`, {
            method: 'GET',
            credentials: 'include', // Include cookies with the request
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.ok; // Return true if the response is ok (user is authenticated)
    } catch (error) {
        console.error('Error checking authentication status:', error);
        return false; // Return false in case of error
    }
};
