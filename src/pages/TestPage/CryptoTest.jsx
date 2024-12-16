import React, { useState, useEffect } from 'react';
import { decryptData } from '../../utils/cryptoUtils';
import { useSearchParams, useNavigate } from 'react-router-dom';

function CryptoTest() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);
  const encryptedData = searchParams.get('info');

  useEffect(() => {
    // Check if encryptedData is present in the query params
    if (!encryptedData) {
      navigate('/error'); // Redirect if data is not present
    } else {
      const decryptedData = decryptData(encryptedData);
      setData(decryptedData); // Only update the state once decrypted data is available
    }
  }, [encryptedData, navigate]);

  return (
    <div>
      <h1>Crypto Test</h1>
      {/* <p>Decrypted data: {data}</p> Display the decrypted data */}
    </div>
  );
}

export default CryptoTest;
