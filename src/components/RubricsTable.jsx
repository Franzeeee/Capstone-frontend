import React from 'react'
import styles from '../assets/css/components/rubrics-table.module.css'
import { Table } from 'react-bootstrap'

export default function RubricsTable() {
  return (
    <div className={`${styles.container}`}>
        <Table bordered hover>
            <thead>
                <tr>
                    <th>Criteria</th>
                    <th>Weight</th>
                    <th>Score</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Correctness</td>
                    <td>60%</td>
                    <td>60 points</td>
                    <td>Passes standard and edge test cases provided by the platform</td>
                </tr>
                <tr>
                    <td>Efficiency</td>
                    <td>25%</td>
                    <td>25 points</td>
                    <td>Uses optimal algorithms and data structures for better time and space complexity</td>
                </tr>
                <tr>
                    <td>Code Quality</td>
                    <td>10%</td>
                    <td>10 points</td>
                    <td>Follows clean coding practices, proper naming conventions, and avoids redundancy</td>
                </tr>
                <tr>
                    <td>Edge Cases</td>
                    <td>5%</td>
                    <td>5 points</td>
                    <td>Handles boundary conditions and unexpected inputs effectively</td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}
