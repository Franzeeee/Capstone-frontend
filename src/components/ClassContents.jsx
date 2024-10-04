import React from 'react'
import styles from '../assets/css/components/course-content.module.css'
import book from '../assets/img/book.png'

const dummyData = [
    {
        id: 1,
        title: 'Lesson 1',
        description: 'Description for Lesson 1',
        image: book
    },
    {
        id: 2,
        title: 'Lesson 2',
        description: 'Description for Lesson 2',
        image: book
    },
    {
        id: 3,
        title: 'Lesson 3',
        description: 'Description for Lesson 3',
        image: book
    }
];

export default function ClassContents() {
    return (
        <div className={styles.contentContainer}>
            {dummyData.map((lesson) => (
                <div key={lesson.id} className={styles.card}>
                    <div className={styles.left}>
                        <img src={lesson.image} alt={lesson.title} />
                    </div>
                    <div className={styles.right}>
                        <p className={styles.lessonTitle}>{lesson.title}</p>
                        <p className={styles.lessonDescription}>{lesson.description}</p>
                        <div className={styles.status}>
                            <p>View More</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
