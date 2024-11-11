import React, { useState, useEffect } from 'react'
import customFetch from '../utils/fetchApi'
import CryptoJS from 'crypto-js';
import { getUserData } from '../utils/userInformation';


export default function RefetchUser() {

    const user = getUserData();

    useEffect(() => {
        customFetch('/user', {
            method: 'GET',
        })
        .then(data => {
            user.verified = data.verified;
            const newData = JSON.stringify(user);
            const hashedData = CryptoJS.AES.encrypt(newData, 'capstone');
            localStorage.setItem('userData', hashedData);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    })

  return (
    <div>
        Email Verified!
    </div>
  )
}
