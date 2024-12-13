import CryptoJS from 'crypto-js';

const secretKey = 'capstone'; // Key for encryption and decryption

// Encrypt data
export function encryptData(data) {
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encodeURIComponent(encrypted); // URL-safe encoding
}

// Decrypt data
export function decryptData(encryptedData) {
    try {
    // Decode the URL-safe string
    const decodedData = decodeURIComponent(encryptedData);

    // Decrypt the data
    const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);

    // Convert decrypted data back to a string (UTF-8)
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    // Parse the decrypted string into an object and return it
    return JSON.parse(decryptedText);
    } catch (e) {
        console.error('Decryption error:', e);
        return null;
    }
}
