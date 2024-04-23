const BASE_URL = 'http://localhost:8000/api';

export const customFetch = (url, options = {}) => {
    return fetch(`${BASE_URL}${url}`, {
        ...options,
        withCredentials: true,
        headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        },
        credentials: 'include',
    });
};