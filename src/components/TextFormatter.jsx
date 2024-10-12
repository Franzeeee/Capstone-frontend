import React from 'react';
import styles from '../assets/css/pages/class-lesson.module.css';

export default function TextFormatter({ lessonContent }) {
    // Function to parse the lesson content
    const parseContent = (content) => {
        const sections = content.split('```End');
        return sections.map((section, index) => {
            if (section.includes('```Para')) {
                const miniHeaderIndex = section.indexOf('```Bold');
                if (miniHeaderIndex !== -1) {
                    const paraText = section.substring(0, miniHeaderIndex).replace('```Para', '').trim();
                    const miniHeaderText = section.substring(miniHeaderIndex).replace('```Bold', '').trim();
                    return (
                        <div key={index} className={styles.para}>
                            <h4>{miniHeaderText}</h4>
                            <p>{paraText}</p>
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className={styles.para}>
                            <p>{section.replace('```Para', '').trim()}</p>
                        </div>
                    );
                }
            } else if (section.includes('```Code')) {
                return (
                    <div key={index} className={styles.codingDesign}>
                        <pre>{section.replace('```Code', '').trim()}</pre>
                    </div>
                );
            } else if (section.includes('```Table')) {
                const tableContent = section.replace('```Table', '').trim();
                const rows = tableContent.split('\n').map(row => row.split('|').map(cell => cell.trim()).filter(cell => cell));
                return (
                    <table key={index} className={styles.table}>
                        <thead>
                            <tr>
                                {rows[0].map((cell, cellIndex) => (
                                    <th key={cellIndex}>{cell}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            } else if (section.includes('```ListTitle')) {
                const listTitleIndex = section.indexOf('```List');
                const listTitle = section.substring(0, listTitleIndex).replace('```ListTitle', '').trim();
                const listItems = section.substring(listTitleIndex).replace('```List', '').trim().split('\n').map(item => item.trim().replace('-', '').trim());
                return (
                    <div key={index} className={styles.list}>
                        <strong>{listTitle}</strong>
                        <ul>
                            {listItems.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <>
            <div className={styles.lessonTitle}>
                <h1>{lessonContent.title}</h1>
            </div>
            <div className={styles.contentContainer}>
                {parseContent(lessonContent.content)}
            </div>
        </>
    );
}