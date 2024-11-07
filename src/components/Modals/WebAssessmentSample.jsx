import React from 'react'
import styles from '../../assets/css/components/Modals/web-assessment-sample.module.css'

export default function WebAssessmentSample({ webCode }) {
    return (
        <div className={`${styles.webContainer}`}>
            <iframe
                srcDoc={webCode}
                title="Web Assessment Sample"
                className={styles.iframe}
                sandbox="allow-scripts"
            />
        </div>
    )
}