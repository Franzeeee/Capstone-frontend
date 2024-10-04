import React, { useState } from 'react'
import styles from '../assets/css/components/announcement.module.css'
import { Dropdown } from 'primereact/dropdown';

export default function AnnouncementForm() {
  
  const [clicked, setClicked] = useState(false)

  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
      { name: 'Announcement'},
      { name: 'Option 2' },
      { name: 'Option 3'},
  ];

  const handleClick = () => {
    if(!clicked){
      setClicked(true)
    }
  }

  return (
      <div className={styles.container}>
        <form action="">
          <div className={`${styles.formGroup} ${clicked ? styles.active : ""}`}>
            <div className={styles.dropDowns}>
              <Dropdown value={selectedOption} onChange={(e) => setSelectedOption(e.value)} options={options} optionLabel="name" 
                  placeholder="Post Type" className={`w-full md:w-14rem ${styles.customDropdown}`} />
              <Dropdown value={selectedOption} onChange={(e) => setSelectedOption(e.value)} options={options} optionLabel="name" 
              placeholder="Coding" className={`w-full md:w-14rem ${styles.customDropdown}`} />
            </div>
            <textarea onClick={handleClick} id="title" name="title" required placeholder='Write announcement...'></textarea>
            <div className={`${styles.buttonControls}`}>
              <button type='button' onClick={() => setClicked(false)}>Cancel</button>
              <button type='submit'>Post</button>
            </div>
          </div>
        </form>
      </div>
  )
}
