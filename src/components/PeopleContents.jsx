import React, { useState } from 'react'
import styles from '../assets/css/components/people-content.module.css'
import profile from '../assets/img/user.png'

export default function PeopleContents() {

    const [people, setPeople] = useState({
        instructor: {
            name: "Teacher Jim"
        },
        classmates: [
            {
                name: "John Doe"
            },
            {
                name: "Jane Doe"
            },
            {
                name: "John Smith"
            },
            {
                name: "Jane Smith"
            },

        ]
    });

    return (
        <div className={styles.container}>
            <div className={styles.instructorContainer}>
                <p className={styles.instructorHeader}>Instructor</p>
                <div className={styles.itemCard}>
                    <img src={profile} alt="" />
                    <p>{people.instructor.name}</p>
                </div>
            </div>
            <div className={styles.instructorContainer}>
                <p className={styles.instructorHeader}>Classmates</p>
                {
                    people?.classmates.map((classmate, index) => (
                        <div key={index} className={styles.itemCard}>
                            <img src={profile} alt="" />
                            <p>{classmate.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
