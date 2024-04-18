import axios from 'axios';
import React, { useEffect } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const DashboardContent = () => {

    useEffect(() => {

        axios.post('http://localhost:8000/api/login', {
            email: 'a@a.com',
            password: 'a'
        })
        .then(response => {
            console.log('Response:', response.data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });


        const token = cookies.get('jwt');

        console.log(token)
    }, [])

  return (
    <div>DashboardContent</div>
  )
}
