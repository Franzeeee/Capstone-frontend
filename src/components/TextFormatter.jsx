import React from 'react';
import styles from '../assets/css/pages/class-lesson.module.css';

export default function TextFormatter({ lessonContent }) {
    // Function to parse the lesson content
    const parseContent = (content) => {
        const sections = content.split('```End');
        return sections.map((section, index) => {
            if (section.includes('```Para')) {
                return (
                    <div key={index} className={styles.para}>
                        <p>{section.replace('```Para', '').trim()}</p>
                    </div>
                );
            } else if (section.includes('```Sub-topic')) {
                return (
                    <div key={index} className={styles.subTopic}>
                        <strong style={{ fontWeight: '600' }}>{section.replace('```Sub-topic', '').trim()}</strong>
                    </div>
                );
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
            } else if (section.includes('```Title') && section.includes('```List')) {
                // Extract the title and list items correctly
                const listTitle = section
                    .split('```Title')[1]
                    .split('```List')[0]
                    .trim(); // Extracts the title

                const listContent = section
                    .split('```List')[1]
                    .split('```End')[0]
                    .trim(); // Extracts the content between List and End

                // Capture multiline list items properly
                const listItems = [];
                let currentItem = ''; // Holds the current list item being built

                listContent.split('\n').forEach(line => {
                    const trimmedLine = line.trim();
                    
                    if (trimmedLine.startsWith('●')) {
                        // If the line starts with a bullet point, it's the start of a new list item
                        if (currentItem) {
                            listItems.push(currentItem.trim()); // Push the previous item to the list
                        }
                        currentItem = trimmedLine.replace(/^●\s*/, ''); // Remove bullet point from the current line
                    } else if (currentItem) {
                        // If the line doesn't start with a bullet point, it's a continuation of the previous item
                        currentItem += ' ' + trimmedLine; // Append to the current item
                    }
                });

                // Push the last item if exists
                if (currentItem) {
                    listItems.push(currentItem.trim());
                }

                
                return (
                    <div key={index} className={styles.list}>
                        <strong>{listTitle}</strong>
                        <ul className={`${styles.dataList}`}>
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
