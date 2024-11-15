import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import styles from '../../assets/css/components/Charts/student-doughnut-chart.module.css'

const TeacherLineChart = () => {
    const data = {
        labels: ['Lesson 1', 'Midterm', 'Final Assessment'], // Milestones for each class
        datasets: [
            {
                label: 'Python Class GWA',
                data: [85, 90, 92], // Sample GWA values for Python assessments
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.3,
            },
            {
                label: 'Web Development Class GWA',
                data: [80, 87, 88], // Sample GWA values for Web Dev assessments
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'GWA Progression for Python and Web Development Classes',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'GWA (%)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Assessment Milestone',
                },
            },
        },
    };


    return (
        <div className={`${styles.chartContainer} ${styles.lineChart}`}>
            <Line data={data} options={options}/>
        </div>
    );
};

export default TeacherLineChart;
