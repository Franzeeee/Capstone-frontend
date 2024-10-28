import React from 'react'
import styles from '../assets/css/components/question-list.module.css'

export default function ({data, handleChangeAssessment}) {

    return (
        <>
            <ul className={styles.listContainer}>
                {data.map((question, index) => (
                    <li key={index} className={`${question.isActive ? styles.active : ""}`} onClick={() => handleChangeAssessment(question.id)}>{index + 1}. {question.title}</li>
                ))}
            </ul>
        </>
    )
}
