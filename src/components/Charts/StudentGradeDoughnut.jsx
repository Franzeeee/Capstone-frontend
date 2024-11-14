// DoughnutChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
import styles from '../../assets/css/components/Charts/student-doughnut-chart.module.css'

const StudentGradeDoughnut = () => {
    const data = {
        labels: ['Fail', 'Pass'],  // X-axis labels
        datasets: [
            {
                label: 'Total Class',  // Name of the dataset
                data: [1, 2],  // Data points
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(0, 255, 0, 0.35)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(0, 255, 0, 1)',
                ],
                borderWidth: 1
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: '70%',
        plugins: {
            title: {
                display: true,
                text: 'Students Grades Distribution',
            },
        },
    };

    return (
        <div className={styles.chartContainer}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default StudentGradeDoughnut;
