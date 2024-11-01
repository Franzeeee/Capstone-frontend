import React, { useEffect, useState } from 'react'
import styles from '../assets/css/components/people-content.module.css'
import profile from '../assets/img/user.png'
import customFetch from '../utils/fetchApi'

export default function PeopleContents({classId, classInfo}) {

    const [people, setPeople] = useState({
        instructor: {
            name: classInfo.teacher.name
        },
        classmates: []
    });

    useEffect(() => {
        console.log(classInfo);
        customFetch(`/class/${classId}/students`)
            .then(data => {
                setPeople({
                    instructor: {
                        name: classInfo.teacher.name
                    },
                    classmates: data
                });
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, []);

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
                            <img src={classmate?.profile_picture || profile} alt="" />
                            <p>{classmate.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
