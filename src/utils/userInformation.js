// userInformation.js
import CryptoJS from 'crypto-js';

export const getUserData = () => {
    // Retrieve encrypted data from localStorage
    const userData = localStorage.getItem('userData');

    // Check if userData exists
    if (!userData) return null;

    try {
        // Decrypt the data using CryptoJS
        const decryptedData = CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8);
        
        // Parse and return JSON data
        return JSON.parse(decryptedData);
    } catch (error) {
        console.error('Error decrypting user data:', error);
        return null; // Return null if there's an error in decryption
    }
};
