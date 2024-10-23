import { customFetch } from './api'; // Adjust the import based on your file structure

const fetchToken = async () => {
    const url = '/fetchCompilerToken'; // Replace with your actual endpoint for fetching the token

    try {
        const response = await customFetch(url, {
            method: 'GET',
        });

        // Check if the response is okay
        if (!response.ok) {
            const errorText = await response.text(); // Get raw text for error handling
            console.error('Error fetching token:', errorText); // Log the error response
            throw new Error('Failed to fetch token');
        }

        const data = await response.json(); // Parse response as JSON
        localStorage.setItem('API_TOKEN', data.token); // Store the token in localStorage
        return data; // Return the token or desired data
    } catch (error) {
        console.error('Error getting auth token:', error);
        throw error; // Rethrow the error for further handling
    }
};

export default fetchToken;
