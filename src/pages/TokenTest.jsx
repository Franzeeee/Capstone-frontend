import React, { useEffect, useState } from 'react';

export default function AuthComponent() {
    const [token, setToken] = useState('');
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SECRET_KEY;

    const BASE_URL = 'https://api.jdoodle.com/v1';

    const getAuthToken = async (clientId, clientSecret) => {
        const data = {
            clientId: clientId,
            clientSecret: clientSecret
        };

        try {
            const response = await fetch(`${BASE_URL}/auth-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const token = await response.text(); // Assuming the token is returned as plain text
            setToken(token);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (clientId && clientSecret) {
            getAuthToken(clientId, clientSecret);
        }
    }, [clientId, clientSecret]); // Fetch token when clientId and clientSecret are available

    return (
        <div>
            {token ? `Token: ${token}` : 'Fetching token...'}
        </div>
    );
}
