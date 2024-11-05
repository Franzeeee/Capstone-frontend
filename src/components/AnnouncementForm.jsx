import React, { useEffect, useState } from 'react';
import styles from '../assets/css/components/announcement.module.css';
import { Dropdown } from 'primereact/dropdown';
import customFetch from '../utils/fetchApi';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function AnnouncementForm() {

  const userData = localStorage.getItem('userData');
  const [user, setUser] = useState(JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8)));
  
  const [clicked, setClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);


  const [options, setOptions] = useState([
    // Add more options as needed
  ]);

  useEffect(() => {

    // Fetch at least 4 latest classes
    fetch(`${import.meta.env.VITE_API_URL}/classes?teacher_id=${user.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            data.forEach((item) => { 
                setOptions(prevOptions => [{ name: item.name, value: item.id }]);
            });
        })
        .catch(error => console.error('Error fetching classes:', error));
}, []);

  const handleClick = () => {
    if(!clicked) {
      setClicked(true);
    }
  };

  const close = () => {
    setClicked(false);
    setContent('');
    setSelectedOption(null);
  }

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setPosting(true);

    // Replace with the actual API endpoint
    customFetch('/announcement', {
      method: 'POST',
      body: JSON.stringify({
        content: content,
        course_class_id: selectedOption,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.status);
    }
    return response.json();
    })
    .then(
      toast.success('Announcement posted successfully'),
      setContent('')
    )
    .catch(error => {
      console.error('Error:', error.message);
    })
    .finally(() => {
      setPosting(false);
    });

  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.formGroup} ${clicked ? styles.active : ""}`}>
          <div className={styles.dropDowns}>
            <Dropdown 
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.value)}
              options={options}
              optionLabel="name"
              placeholder="Select Course Class"
              className={`w-full md:w-14rem ${styles.customDropdown}`}
              required
            />
          </div>
          <textarea 
            onChange={handleChange}
            onClick={handleClick}
            id="title"
            name="title"
            required
            placeholder='Write announcement...'
            value={content}
          />
          <div className={`${styles.buttonControls}`}>
            <button type='button' onClick={close}>Cancel</button>
            <button type='submit' disabled={posting || selectedOption === null}>{posting ? <FontAwesomeIcon icon={faSpinner} spin /> : "Post"}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
