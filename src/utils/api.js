const BASE_URL = 'http://ec2-3-24-134-80.ap-southeast-2.compute.amazonaws.com/api';

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