const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.jdoodle.com/v1';

const getAuthToken = async (clientId, clientSecret) => {
    const data = {
        clientId: clientId,
        clientSecret: clientSecret
    };

    return fetch(`${BASE_URL}/auth-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Extract token from response text
    })
    .then(token => {
        localStorage.setItem('API_TOKEN', token); // Store token in localStorage
        return token; // Return token for further use if needed
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
};

export default getAuthToken;