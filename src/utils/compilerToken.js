const compilerToken = async () => {

    return fetch(`http://127.0.0.1:8000/api/fetchCompilerToken`, {
        method: 'GET',
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

export default compilerToken;