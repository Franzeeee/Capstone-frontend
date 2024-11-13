// DoughnutChart.jsx
import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
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

const LineChart = () => {
    const data = {
        labels: ['Pass', 'Fail'],  // X-axis labels
        datasets: [
            {
                label: 'My First dataset',  // Name of the dataset
                data: [65, 59],  // Data points
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
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
                text: 'Students Grades',
            },
        },
    };

    return (
        <div className={styles.chartContainer}>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
