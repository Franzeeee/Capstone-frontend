const BASE_URL = 'http://127.0.0.1:8000/api';

// Custom fetch function using Promises
const customFetch = (url, options = {}) => {
    return fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',  // Default content type
            ...options.headers,  // Merge any additional headers passed in options
        },
        credentials: 'include',  // Ensure credentials like cookies are included
        ...options,  // Spread the other options (e.g., method, body)
    })
    .then(response => {
        // Check if the response is not ok, reject it as an error
        if (!response.ok) {
            return response.json().then(errorData => {
                return Promise.reject(new Error(errorData.message || `HTTP Error: ${response.status}`));
            });
        }
        // Return the response as JSON if successful
        return response.json();
    })
    .catch(error => {
        console.error('Fetch error:', error.message);
        return Promise.reject(error);  // Re-throw the error to handle it later
    });
};


// Implementation of the custom fetch function

// GET Request:
// customFetch('/path/to/resource')
//     .then(data => {
//         console.log('Data:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });


// POST Request:
// customFetch('/path/to/resource', {
//     method: 'POST',
//     body: JSON.stringify({
//         key1: 'value1',
//         key2: 'value2'
//     }),
// })
//     .then(response => {
//         console.log('Response:', response);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });

export default customFetch;