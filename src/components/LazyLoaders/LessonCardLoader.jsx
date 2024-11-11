import React, {useEffect, useState} from 'react'
import styles from '../../assets/css/components/lesson-card-loader.module.css'
import book from '../../assets/img/book.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


export default function LessonCardLoader() {
    const items = Array.from({ length: 6 }, (_, index) => index);
    return (
        <>
        {items.map((item) => (
            <div key={item} className={`${styles.card}`}>
            <div className={`${styles.courseImage}`}>
                <img src={book} alt="Course" />
            </div>
            <div className={`${styles.courseText}`}>
                <p></p>
                <p></p>
            </div>
            <div className={`${styles.goTo}`}>
                <div
                className={`${styles.viewButton}`}
                >
                <p className='m-0'>
                    <FontAwesomeIcon icon={faArrowRight} />
                </p>
                </div>
            </div>
            </div>
        ))}
        </>
    )
}
 